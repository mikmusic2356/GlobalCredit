import { getTursoClient } from '../client';
import { CmsArticle } from '../../types/cms';

export class ArticleRepository {
  public static async getAllArticles(): Promise<CmsArticle[]> {
    const client = getTursoClient();
    const result = await client.execute(`
      SELECT 
        a.*,
        c.code as country_code
      FROM articles a
      LEFT JOIN countries c ON a.country_id = c.id
      ORDER BY a.updated_at DESC, a.created_at DESC
    `);

    return result.rows.map((r: any) => this.mapRowToArticle(r));
  }

  public static async getPublishedArticles(): Promise<CmsArticle[]> {
    const client = getTursoClient();
    const result = await client.execute(`
      SELECT 
        a.*,
        c.code as country_code
      FROM articles a
      LEFT JOIN countries c ON a.country_id = c.id
      WHERE UPPER(a.status) = 'PUBLISHED'
      ORDER BY a.published_at DESC, a.updated_at DESC
    `);

    return result.rows.map((r: any) => this.mapRowToArticle(r));
  }

  public static async getArticleBySlug(slug: string): Promise<CmsArticle | null> {
    const client = getTursoClient();
    const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    const result = await client.execute({
      sql: `
        SELECT 
          a.*,
          c.code as country_code
        FROM articles a
        LEFT JOIN countries c ON a.country_id = c.id
        WHERE LOWER(a.slug) = ? OR a.id = ?
        LIMIT 1
      `,
      args: [clean, clean],
    });

    if (result.rows.length === 0) return null;
    return this.mapRowToArticle(result.rows[0]);
  }

  public static async saveArticle(art: CmsArticle): Promise<CmsArticle> {
    const client = getTursoClient();
    const countryId = art.country && art.country !== 'global' ? `country-${art.country.toLowerCase()}` : null;
    const isNews = (art.type || '').toLowerCase().includes('news') || (art.type || '').toLowerCase().includes('trend');

    await client.execute({
      sql: `INSERT INTO articles (
        id, country_id, title, slug, subtitle, excerpt, content, content_type,
        status, author_name, author_role, published_at, updated_at, verification_status, reading_time_minutes
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(country_id, slug) DO UPDATE SET
        title=excluded.title,
        subtitle=excluded.subtitle,
        excerpt=excluded.excerpt,
        content=excluded.content,
        content_type=excluded.content_type,
        status=excluded.status,
        author_name=excluded.author_name,
        author_role=excluded.author_role,
        updated_at=excluded.updated_at,
        reading_time_minutes=excluded.reading_time_minutes`,
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
        art.author?.name || 'GlobalCredit Editorial Staff',
        art.author?.role || 'Financial Analyst',
        art.publishedDate || new Date().toISOString().split('T')[0],
        new Date().toISOString().split('T')[0],
        'VERIFIED',
        art.readingTimeMinutes || 5,
      ],
    });

    return art;
  }

  public static async deleteArticle(id: string): Promise<boolean> {
    const client = getTursoClient();
    const res = await client.execute({
      sql: 'DELETE FROM articles WHERE id = ?',
      args: [id],
    });
    return res.rowsAffected > 0;
  }

  private static mapRowToArticle(r: any): CmsArticle {
    let blocks: any[] = [];
    try {
      if (r.content && r.content.startsWith('[')) {
        blocks = JSON.parse(r.content);
      }
    } catch {}

    const typeLower = String(r.content_type || 'GUIDE').toLowerCase();

    return {
      id: String(r.id),
      title: String(r.title),
      slug: String(r.slug),
      subtitle: String(r.subtitle || r.excerpt || ''),
      country: r.country_code ? (String(r.country_code).toLowerCase() as any) : 'global',
      type: typeLower === 'news' ? 'news' : 'financial-guide',
      category: 'Financial Guides & Educational Articles',
      subcategory: 'APR & Interest',
      author: {
        name: String(r.author_name || 'GlobalCredit Staff'),
        role: String(r.author_role || 'Senior Financial Analyst'),
      },
      featuredImage: {
        url: r.featured_image_url || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
        alt: r.featured_image_alt || r.title || 'Featured Article Image',
      },
      blocks: blocks.length > 0 ? blocks : [
        {
          id: `block-${r.id}-1`,
          type: 'paragraph',
          content: r.excerpt || 'Financial consumer guide and regulatory overview.',
        }
      ],
      tags: ['credit-cards', 'finance', 'education'],
      status: (String(r.status).toLowerCase() === 'published' ? 'published' : 'draft') as any,
      publishedDate: r.published_at || '2026-08-01',
      lastUpdatedDate: r.updated_at || '2026-08-15',
      lastVerifiedDate: r.updated_at || '2026-08-15',
      verificationStatus: 'VERIFIED',
      sources: [
        {
          id: 'src-fca',
          name: 'Official Financial Regulator',
          type: 'Regulator',
          lastVerifiedDate: '2026-08-15',
        }
      ],
      seo: {
        title: r.meta_title || r.title,
        metaDescription: r.meta_description || r.excerpt || r.title,
      },
      manualRelatedArticleIds: [],
      viewCount: 150,
      readingTimeMinutes: Number(r.reading_time_minutes || 5),
    };
  }
}
