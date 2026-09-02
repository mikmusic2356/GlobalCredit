import { INITIAL_CMS_ARTICLES } from '../data/articles/articleStore';
import { NEWS_AND_TRENDS_DATA } from '../data/news';
import { CREDIT_CARDS_DATA } from '../data/cards';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemapUrls(baseUrl: string = 'https://cardinsight.online'): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // 1. Core High-Priority Static Routes
  const staticRoutes: { path: string; changefreq: SitemapUrl['changefreq']; priority: number }[] = [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/cards', changefreq: 'daily', priority: 0.9 },
    { path: '/guides', changefreq: 'daily', priority: 0.9 },
    { path: '/news', changefreq: 'daily', priority: 0.9 },
    { path: '/calculators', changefreq: 'weekly', priority: 0.85 },
    { path: '/credit-scores', changefreq: 'weekly', priority: 0.85 },
    { path: '/compare', changefreq: 'weekly', priority: 0.8 },
    { path: '/countries', changefreq: 'monthly', priority: 0.75 },
    { path: '/resources', changefreq: 'monthly', priority: 0.75 },
    { path: '/about', changefreq: 'monthly', priority: 0.6 },
    { path: '/terms', changefreq: 'monthly', priority: 0.5 },
    { path: '/privacy-policy', changefreq: 'monthly', priority: 0.5 },
    { path: '/cookie-policy', changefreq: 'monthly', priority: 0.5 },
  ];

  for (const route of staticRoutes) {
    urls.push({
      loc: `${baseUrl}${route.path}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // 1.1 Specific Calculator Modules
  const calculatorSlugs = ['payoff', 'balance-transfer', 'rewards', 'intro-plan', 'utilization', 'foreign-fee'];
  for (const calc of calculatorSlugs) {
    urls.push({
      loc: `${baseUrl}/calculators/${calc}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 1.2 Specific Credit Score Hubs & Tools
  const creditScoreSubRoutes = ['us', 'uk', 'ca', 'au', 'nz', 'factors', 'simulator'];
  for (const sub of creditScoreSubRoutes) {
    urls.push({
      loc: `${baseUrl}/credit-scores/${sub}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 1.3 Resources Sections
  const resourceSubRoutes = ['glossary', 'regulators', 'counseling'];
  for (const sub of resourceSubRoutes) {
    urls.push({
      loc: `${baseUrl}/resources/${sub}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  // 2. Country Specific Hubs
  const countries = ['us', 'ca', 'uk', 'au', 'nz'];
  for (const c of countries) {
    urls.push({
      loc: `${baseUrl}/countries/${c}`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.85,
    });
    urls.push({
      loc: `${baseUrl}/cards/${c}`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.85,
    });
    urls.push({
      loc: `${baseUrl}/compare/${c}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 3. All CMS Articles (Batches 1, 2, 3, 4, 5 + Evergreen)
  const seenArticleSlugs = new Set<string>();
  for (const art of INITIAL_CMS_ARTICLES) {
    if (!art.slug || seenArticleSlugs.has(art.slug)) continue;
    seenArticleSlugs.add(art.slug);

    const lastmod = art.lastUpdatedDate || art.publishedDate || today;
    
    // Canonical Article Route
    urls.push({
      loc: `${baseUrl}/article/${art.slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Country localized route
    if (art.country && art.country !== 'global') {
      urls.push({
        loc: `${baseUrl}/${art.country.toLowerCase()}/guides/${art.slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.75,
      });
    }
  }

  // 4. News & Trends Articles
  for (const news of NEWS_AND_TRENDS_DATA) {
    if (!news.slug) continue;
    const lastmod = news.lastUpdatedDate || news.publishedDate || today;
    
    urls.push({
      loc: `${baseUrl}/news/${news.slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.75,
    });
  }

  // 5. Card Product Detail Pages (/cards/:country/:id)
  for (const card of CREDIT_CARDS_DATA) {
    if (!card.id) continue;
    urls.push({
      loc: `${baseUrl}/cards/${card.country}/${card.id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.75,
    });
  }

  return urls;
}

export function generateSitemapXml(baseUrl: string = 'https://cardinsight.online'): string {
  const urls = generateSitemapUrls(baseUrl);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const u of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority.toFixed(2)}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}

export function generateRobotsTxt(baseUrl: string = 'https://cardinsight.online'): string {
  return `# CardInsight Online (cardinsight.online) robots.txt
User-agent: *
Allow: /

# Admin and Internal Management
Disallow: /admin
Disallow: /api/

# Sitemap Location
Sitemap: ${baseUrl}/sitemap.xml
`;
}
