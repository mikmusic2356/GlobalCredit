import { getTursoClient } from '../client';
import { COUNTRIES_DATA } from '../../data/countries';
import { CATEGORIES_DATA } from '../../data/categories';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { INITIAL_CMS_ARTICLES } from '../../data/articles/articleStore';
import { INITIAL_MEDIA_LIBRARY } from '../../data/media/mediaStore';
import { FINANCIAL_GUIDES_DATA } from '../../data/guides';
import { NEWS_AND_TRENDS_DATA } from '../../data/news';

export async function seedDatabase() {
  const client = getTursoClient();
  console.log('[Seed] Starting database migration & seeding into Turso...');

  // 1. Seed Countries
  console.log('[Seed] Seeding Countries...');
  for (const [code, c] of Object.entries(COUNTRIES_DATA)) {
    await client.execute({
      sql: `INSERT INTO countries (
        id, code, name, slug, currency_code, currency_symbol, locale, language, regulator_name, regulator_abbr, regulator_website, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      ON CONFLICT(code) DO UPDATE SET
        name=excluded.name,
        currency_code=excluded.currency_code,
        currency_symbol=excluded.currency_symbol,
        regulator_name=excluded.regulator_name,
        regulator_abbr=excluded.regulator_abbr,
        regulator_website=excluded.regulator_website`,
      args: [
        `country-${code.toLowerCase()}`,
        code.toUpperCase(),
        c.name,
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        c.currency.code,
        c.currency.symbol,
        code === 'us' ? 'en-US' : code === 'uk' ? 'en-GB' : code === 'ca' ? 'en-CA' : code === 'au' ? 'en-AU' : 'en-NZ',
        'en',
        c.regulator.name,
        c.regulator.abbreviation,
        c.regulator.website,
      ],
    });
  }

  // 2. Seed Sources
  console.log('[Seed] Seeding Sources...');
  const sources = [
    {
      id: 'src-cfpb',
      source_type: 'REGULATOR',
      organization: 'Consumer Financial Protection Bureau (CFPB)',
      title: 'Truth in Lending (Regulation Z) & CARD Act Enforcement Data',
      url: 'https://www.consumerfinance.gov',
    },
    {
      id: 'src-fca',
      source_type: 'REGULATOR',
      organization: 'Financial Conduct Authority (FCA)',
      title: 'Consumer Credit Sourcebook (CONC) & Representative APR Rules',
      url: 'https://www.fca.org.uk',
    },
    {
      id: 'src-fcac',
      source_type: 'REGULATOR',
      organization: 'Financial Consumer Agency of Canada (FCAC)',
      title: 'Credit Card Regulations and Disclosure Standards',
      url: 'https://www.canada.ca/en/financial-consumer-agency.html',
    },
    {
      id: 'src-asic',
      source_type: 'REGULATOR',
      organization: 'Australian Securities and Investments Commission (ASIC)',
      title: 'National Consumer Credit Protection Act 2009 & MoneySmart Guides',
      url: 'https://asic.gov.au',
    },
    {
      id: 'src-comcom',
      source_type: 'REGULATOR',
      organization: 'New Zealand Commerce Commission',
      title: 'Credit Contracts and Consumer Finance Act (CCCFA) Guidelines',
      url: 'https://comcom.govt.nz',
    },
    {
      id: 'src-staff',
      source_type: 'OTHER',
      organization: 'CardInsight Editorial Team',
      title: 'Primary Document Verification & Issuer Product Factsheet Archive',
      url: 'https://cardinsight.online/methodology',
    }
  ];

  for (const s of sources) {
    await client.execute({
      sql: `INSERT INTO sources (id, source_type, organization, title, url, verified_at)
            VALUES (?, ?, ?, ?, ?, DATETIME('now'))
            ON CONFLICT(id) DO UPDATE SET organization=excluded.organization, title=excluded.title, url=excluded.url`,
      args: [s.id, s.source_type, s.organization, s.title, s.url],
    });
  }

  // 3. Seed Issuers
  console.log('[Seed] Seeding Issuers...');
  const issuersMap = new Map<string, string>();

  for (const card of CREDIT_CARDS_DATA) {
    const issuerName = card.issuer.trim();
    const countryCode = card.country.toUpperCase();
    const countryId = `country-${card.country.toLowerCase()}`;
    const slug = issuerName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const issuerId = `issuer-${slug}-${card.country.toLowerCase()}`;

    if (!issuersMap.has(issuerId)) {
      issuersMap.set(issuerId, issuerName);
      await client.execute({
        sql: `INSERT INTO issuers (id, country_id, name, slug, active)
              VALUES (?, ?, ?, ?, 1)
              ON CONFLICT(country_id, slug) DO UPDATE SET name=excluded.name`,
        args: [issuerId, countryId, issuerName, slug],
      });
    }
  }

  // 4. Seed Categories
  console.log('[Seed] Seeding Categories...');
  for (const cat of CATEGORIES_DATA) {
    const catId = `cat-${cat.id}`;
    await client.execute({
      sql: `INSERT INTO categories (id, name, slug, description, type, active)
            VALUES (?, ?, ?, ?, 'cards', 1)
            ON CONFLICT(country_id, slug) DO UPDATE SET name=excluded.name, description=excluded.description`,
      args: [catId, cat.name, cat.id, cat.shortDesc],
    });
  }

  // 5. Seed Credit Cards
  console.log('[Seed] Seeding Credit Cards & Benefits...');
  for (const card of CREDIT_CARDS_DATA) {
    const countryId = `country-${card.country.toLowerCase()}`;
    const issuerSlug = card.issuer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const issuerId = `issuer-${issuerSlug}-${card.country.toLowerCase()}`;

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
        card.lastVerifiedDate || '2026-08-15',
      ],
    });

    // Seed perks / benefits
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

  // 6. Seed Articles, Guides, and News
  console.log('[Seed] Seeding Articles & Guides...');
  for (const art of INITIAL_CMS_ARTICLES) {
    const countryId = art.country && art.country !== 'global' ? `country-${art.country.toLowerCase()}` : null;
    const isNews = art.type === 'news' || art.type === 'trend';

    await client.execute({
      sql: `INSERT INTO articles (
        id, country_id, title, slug, subtitle, excerpt, content, content_type,
        status, author_name, published_at, updated_at, verification_status, reading_time_minutes
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(country_id, slug) DO UPDATE SET
        title=excluded.title,
        content=excluded.content,
        excerpt=excluded.excerpt,
        status=excluded.status,
        updated_at=excluded.updated_at`,
      args: [
        art.id,
        countryId,
        art.title,
        art.slug,
        art.subtitle || null,
        art.seo?.metaDescription || art.subtitle || art.title,
        art.blocks ? JSON.stringify(art.blocks) : '[]',
        isNews ? 'NEWS' : 'GUIDE',
        (art.status || 'PUBLISHED').toUpperCase(),
        art.author?.name || 'CardInsight Editorial Staff',
        art.publishedDate || '2026-08-01',
        art.lastUpdatedDate || '2026-08-15',
        'VERIFIED',
        art.readingTimeMinutes || 5,
      ],
    });
  }

  // 7. Seed Media Library
  console.log('[Seed] Seeding Media Library...');
  for (const m of INITIAL_MEDIA_LIBRARY) {
    await client.execute({
      sql: `INSERT INTO media (
        id, filename, url, alt_text, caption, credit, source_url, width, height, file_size
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET url=excluded.url, alt_text=excluded.alt_text, caption=excluded.caption`,
      args: [
        m.id,
        m.filename,
        m.url,
        m.alt,
        m.caption || null,
        m.source || null,
        null,
        m.dimensions?.width || 1200,
        m.dimensions?.height || 800,
        m.fileSize || '250 KB',
      ],
    });
  }

  // 8. Seed Site Settings
  console.log('[Seed] Seeding Site Settings...');
  const settings = [
    { key: 'site_name', value: 'CardInsight Online — International Credit Card Information Platform', type: 'string' },
    { key: 'site_description', value: 'Independent, verified credit card directory and financial education covering US, UK, Canada, Australia, and New Zealand.', type: 'string' },
    { key: 'contact_email', value: 'editorial@cardinsight.online', type: 'string' },
    { key: 'default_country', value: 'US', type: 'string' },
    { key: 'adsense_enabled', value: 'true', type: 'boolean' },
    { key: 'cookie_consent_required', value: 'true', type: 'boolean' },
  ];

  for (const s of settings) {
    await client.execute({
      sql: `INSERT INTO site_settings (id, key, value, type) VALUES (?, ?, ?, ?)
            ON CONFLICT(key) DO UPDATE SET value=excluded.value`,
      args: [`setting-${s.key}`, s.key, s.value, s.type],
    });
  }

  console.log('[Seed] Migration and Seeding into Turso database finished successfully!');
}

// CLI direct run
if (process.argv[1] && process.argv[1].includes('seedData')) {
  seedDatabase()
    .then(() => {
      console.log('[Seed CLI] Completed without errors.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed CLI] Failed with error:', err);
      process.exit(1);
    });
}
