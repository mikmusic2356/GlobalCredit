import { getTursoClient } from '../client';
import { BATCH_2_ARTICLES } from '../../data/articles/batch2Articles';

export async function seedBatch2Articles() {
  console.log(`[Seed Batch 2] Ingesting ${BATCH_2_ARTICLES.length} US articles into Turso DB...`);
  const client = getTursoClient();

  for (const art of BATCH_2_ARTICLES) {
    const countryId = art.country && art.country !== 'global' ? `country-${art.country.toLowerCase()}` : null;
    const isNews = art.type === 'news' || art.type === 'trend';

    await client.execute({
      sql: `INSERT INTO articles (
        id, country_id, title, slug, subtitle, excerpt, content, content_type,
        status, author_name, author_role, published_at, updated_at, verification_status, reading_time_minutes,
        featured_image_url, featured_image_alt, meta_title, meta_description
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        slug = excluded.slug,
        subtitle = excluded.subtitle,
        excerpt = excluded.excerpt,
        content = excluded.content,
        content_type = excluded.content_type,
        status = excluded.status,
        author_name = excluded.author_name,
        author_role = excluded.author_role,
        published_at = excluded.published_at,
        updated_at = excluded.updated_at,
        verification_status = excluded.verification_status,
        reading_time_minutes = excluded.reading_time_minutes,
        featured_image_url = excluded.featured_image_url,
        featured_image_alt = excluded.featured_image_alt,
        meta_title = excluded.meta_title,
        meta_description = excluded.meta_description`,
      args: [
        art.id,
        countryId,
        art.title,
        art.slug,
        art.subtitle || null,
        art.subtitle || null,
        JSON.stringify(art.blocks || []),
        isNews ? 'NEWS' : 'GUIDE',
        art.status.toUpperCase(),
        art.author.name,
        art.author.role || null,
        art.publishedDate || '2026-08-01',
        art.lastUpdatedDate || '2026-09-01',
        art.verificationStatus || 'VERIFIED',
        art.readingTimeMinutes || 5,
        art.featuredImage?.url || null,
        art.featuredImage?.alt || null,
        art.seo?.title || art.title,
        art.seo?.metaDescription || art.subtitle || null,
      ],
    });
  }

  console.log(`[Seed Batch 2] Successfully synced ${BATCH_2_ARTICLES.length} articles to Turso database!`);
}

if (process.argv[1] && process.argv[1].includes('seedBatch2')) {
  seedBatch2Articles()
    .then(() => {
      console.log('[Seed Batch 2 CLI] Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed Batch 2 CLI] Failed with error:', err);
      process.exit(1);
    });
}
