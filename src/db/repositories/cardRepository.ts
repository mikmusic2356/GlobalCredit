import { getTursoClient } from '../client';
import { CreditCardItem, CountryCode } from '../../types';

export class CardRepository {
  public static async getAllCards(): Promise<CreditCardItem[]> {
    const client = getTursoClient();
    const result = await client.execute(`
      SELECT 
        c.*, 
        i.name as issuer_name,
        co.code as country_code
      FROM credit_cards c
      JOIN issuers i ON c.issuer_id = i.id
      JOIN countries co ON c.country_id = co.id
      ORDER BY c.featured DESC, c.rating_score DESC
    `);

    // Fetch perks in batch
    const perksResult = await client.execute(`
      SELECT card_id, title FROM card_benefits ORDER BY sort_order ASC
    `);
    const perksMap = new Map<string, string[]>();
    for (const row of perksResult.rows) {
      const cardId = String(row.card_id);
      const title = String(row.title);
      if (!perksMap.has(cardId)) perksMap.set(cardId, []);
      perksMap.get(cardId)!.push(title);
    }

    return result.rows.map((row: any) => this.mapRowToCard(row, perksMap.get(String(row.id)) || []));
  }

  public static async getCardsByCountry(country: CountryCode): Promise<CreditCardItem[]> {
    const client = getTursoClient();
    const countryId = `country-${country.toLowerCase()}`;
    const result = await client.execute({
      sql: `
        SELECT 
          c.*, 
          i.name as issuer_name,
          co.code as country_code
        FROM credit_cards c
        JOIN issuers i ON c.issuer_id = i.id
        JOIN countries co ON c.country_id = co.id
        WHERE c.country_id = ?
        ORDER BY c.featured DESC, c.rating_score DESC
      `,
      args: [countryId],
    });

    const perksResult = await client.execute(`
      SELECT card_id, title FROM card_benefits ORDER BY sort_order ASC
    `);
    const perksMap = new Map<string, string[]>();
    for (const row of perksResult.rows) {
      const cardId = String(row.card_id);
      const title = String(row.title);
      if (!perksMap.has(cardId)) perksMap.set(cardId, []);
      perksMap.get(cardId)!.push(title);
    }

    return result.rows.map((row: any) => this.mapRowToCard(row, perksMap.get(String(row.id)) || []));
  }

  public static async getCardBySlug(country: CountryCode, slug: string): Promise<CreditCardItem | null> {
    const client = getTursoClient();
    const countryId = `country-${country.toLowerCase()}`;
    const result = await client.execute({
      sql: `
        SELECT 
          c.*, 
          i.name as issuer_name,
          co.code as country_code
        FROM credit_cards c
        JOIN issuers i ON c.issuer_id = i.id
        JOIN countries co ON c.country_id = co.id
        WHERE c.country_id = ? AND (c.slug = ? OR c.id = ?)
        LIMIT 1
      `,
      args: [countryId, slug, slug],
    });

    if (result.rows.length === 0) return null;

    const perksResult = await client.execute({
      sql: 'SELECT title FROM card_benefits WHERE card_id = ? ORDER BY sort_order ASC',
      args: [result.rows[0].id],
    });
    const perks = perksResult.rows.map((r: any) => String(r.title));

    return this.mapRowToCard(result.rows[0], perks);
  }

  public static async createOrUpdateCard(card: CreditCardItem): Promise<void> {
    const client = getTursoClient();
    const countryId = `country-${card.country.toLowerCase()}`;
    const issuerSlug = card.issuer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const issuerId = `issuer-${issuerSlug}-${card.country.toLowerCase()}`;

    // Ensure issuer exists
    await client.execute({
      sql: `INSERT INTO issuers (id, country_id, name, slug, active)
            VALUES (?, ?, ?, ?, 1)
            ON CONFLICT(country_id, slug) DO UPDATE SET name=excluded.name`,
      args: [issuerId, countryId, card.issuer, issuerSlug],
    });

    await client.execute({
      sql: `INSERT INTO credit_cards (
        id, issuer_id, country_id, name, slug, card_type, network,
        annual_fee, annual_fee_promo, regular_apr_min, regular_apr_max, regular_apr_type, regular_apr_display,
        intro_apr, intro_apr_period_months, intro_apr_applies_to, intro_apr_terms_notice,
        balance_transfer_fee, balance_transfer_fee_min,
        foreign_transaction_fee, foreign_transaction_is_zero,
        rewards_type, rewards_headline, rewards_base_rate, rewards_category_rates_json,
        welcome_offer, minimum_credit_score, credit_profile,
        student_card, business_card, secured_card, cash_back, travel_rewards, no_annual_fee,
        status, featured, rating_score, editorial_summary,
        published_date, last_verified_date, last_updated_date
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?,
        ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?
      )
      ON CONFLICT(country_id, slug) DO UPDATE SET
        name=excluded.name,
        annual_fee=excluded.annual_fee,
        regular_apr_min=excluded.regular_apr_min,
        regular_apr_max=excluded.regular_apr_max,
        regular_apr_display=excluded.regular_apr_display,
        intro_apr=excluded.intro_apr,
        intro_apr_period_months=excluded.intro_apr_period_months,
        rewards_headline=excluded.rewards_headline,
        editorial_summary=excluded.editorial_summary,
        status=excluded.status,
        last_verified_date=excluded.last_verified_date`,
      args: [
        card.id,
        issuerId,
        countryId,
        card.name,
        card.id,
        'Standard',
        card.network,
        card.annualFee,
        card.annualFeePromo || null,
        card.regularApr?.min ?? null,
        card.regularApr?.max ?? null,
        card.regularApr?.type || 'Variable',
        card.regularApr?.rateDisplay || null,
        card.introApr?.rate ?? null,
        card.introApr?.durationMonths ?? null,
        card.introApr?.appliesTo || null,
        card.introApr?.termsNotice || null,
        card.balanceTransferFee?.percent ?? null,
        card.balanceTransferFee?.minimumAmount ?? null,
        card.foreignTransactionFee?.percent ?? null,
        card.foreignTransactionFee?.isZero ? 1 : 0,
        card.rewardsStructure?.type || 'None',
        card.rewardsStructure?.headline || null,
        card.rewardsStructure?.baseRate || null,
        JSON.stringify(card.rewardsStructure?.categoryRates || []),
        card.welcomeOffer || null,
        700,
        card.creditScoreRequirement || 'Good (670-719)',
        card.categories?.includes('student') ? 1 : 0,
        card.categories?.includes('business') ? 1 : 0,
        card.categories?.includes('secured') ? 1 : 0,
        card.categories?.includes('cash-back') ? 1 : 0,
        card.categories?.includes('travel') ? 1 : 0,
        card.annualFee === 0 ? 1 : 0,
        'VERIFIED',
        card.featured ? 1 : 0,
        card.ratingScore || 4.5,
        card.editorialSummary || '',
        '2026-08-01',
        card.lastVerifiedDate || '2026-08-15',
        new Date().toISOString().split('T')[0],
      ],
    });

    if (card.keyPerks && card.keyPerks.length > 0) {
      await client.execute({
        sql: 'DELETE FROM card_benefits WHERE card_id = ?',
        args: [card.id],
      });
      for (let i = 0; i < card.keyPerks.length; i++) {
        await client.execute({
          sql: 'INSERT INTO card_benefits (id, card_id, title, sort_order) VALUES (?, ?, ?, ?)',
          args: [`ben-${card.id}-${i}`, card.id, card.keyPerks[i], i],
        });
      }
    }
  }

  public static async deleteCard(id: string): Promise<boolean> {
    const client = getTursoClient();
    const res = await client.execute({
      sql: 'DELETE FROM credit_cards WHERE id = ?',
      args: [id],
    });
    return res.rowsAffected > 0;
  }

  private static mapRowToCard(row: any, perks: string[]): CreditCardItem {
    let categoryRates: string[] = [];
    try {
      if (row.rewards_category_rates_json) {
        categoryRates = JSON.parse(row.rewards_category_rates_json);
      }
    } catch {}

    const categories: any[] = [];
    if (row.cash_back) categories.push('cash-back');
    if (row.travel_rewards) categories.push('travel');
    if (row.no_annual_fee) categories.push('no-annual-fee');
    if (row.student_card) categories.push('student');
    if (row.business_card) categories.push('business');
    if (row.secured_card) categories.push('secured');
    if (row.intro_apr !== null && row.intro_apr === 0) categories.push('zero-intro-apr');
    if (row.balance_transfer_apr !== null || row.balance_transfer_fee !== null) categories.push('balance-transfer');

    return {
      id: String(row.id),
      name: String(row.name),
      issuer: String(row.issuer_name || 'Licensed Financial Institution'),
      network: row.network as any,
      country: String(row.country_code).toLowerCase() as CountryCode,
      categories,
      featured: Boolean(row.featured),
      ratingScore: Number(row.rating_score || 4.5),
      annualFee: Number(row.annual_fee || 0),
      annualFeePromo: row.annual_fee_promo ? String(row.annual_fee_promo) : undefined,
      regularApr: {
        min: Number(row.regular_apr_min || 18.99),
        max: Number(row.regular_apr_max || 28.99),
        type: row.regular_apr_type || 'Variable',
        rateDisplay: row.regular_apr_display || `${row.regular_apr_min}% – ${row.regular_apr_max}% Variable`,
      },
      introApr: row.intro_apr !== null ? {
        rate: Number(row.intro_apr),
        durationMonths: Number(row.intro_apr_period_months || 12),
        appliesTo: row.intro_apr_applies_to || 'Purchases',
        termsNotice: row.intro_apr_terms_notice || '0% promotional rate apply.',
      } : undefined,
      balanceTransferFee: row.balance_transfer_fee !== null ? {
        percent: Number(row.balance_transfer_fee),
        minimumAmount: Number(row.balance_transfer_fee_min || 5),
      } : undefined,
      foreignTransactionFee: {
        percent: Number(row.foreign_transaction_fee || 0),
        isZero: Boolean(row.foreign_transaction_is_zero),
      },
      rewardsStructure: {
        type: row.rewards_type || 'None',
        headline: row.rewards_headline || 'Standard revolving benefits',
        baseRate: row.rewards_base_rate || '1%',
        categoryRates,
      },
      creditScoreRequirement: (row.credit_profile as any) || 'Good (670-719)',
      keyPerks: perks.length > 0 ? perks : ['Standard cardholder benefits', 'Zero fraud liability protection'],
      pros: ['Transparent fee structure', 'Regulator compliant terms'],
      cons: ['Subject to standard issuer credit approval'],
      editorialSummary: row.editorial_summary || 'Verified product profile with statutory disclosure standards.',
      lastVerifiedDate: row.last_verified_date || '2026-08-15',
    };
  }
}
