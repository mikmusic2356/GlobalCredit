import fs from 'fs';
import path from 'path';
import { generateSitemapXml, generateRobotsTxt, generateSitemapUrls } from '../src/utils/sitemapGenerator';

const BASE_URL = process.env.VITE_SITE_URL || 'https://cardinsight.online';

console.log(`[Sitemap Generator] Generating sitemap for base URL: ${BASE_URL}...`);

const urls = generateSitemapUrls(BASE_URL);
console.log(`[Sitemap Generator] Discovered ${urls.length} indexed URLs across platform:`);
console.log(` - Static Root & Hub Pages: ${urls.filter(u => !u.loc.includes('/article/') && !u.loc.includes('/news/') && !u.loc.includes('/cards/')).length}`);
console.log(` - Articles & Guides (Batches 1-5 + Evergreen): ${urls.filter(u => u.loc.includes('/article/') || u.loc.includes('/guides/')).length}`);
console.log(` - News & Market Trends: ${urls.filter(u => u.loc.includes('/news/')).length}`);
console.log(` - Credit Card Pages: ${urls.filter(u => u.loc.includes('/cards/')).length}`);

const sitemapXml = generateSitemapXml(BASE_URL);
const robotsTxt = generateRobotsTxt(BASE_URL);

// 1. Write to public/ directory (served by Vite and build copy)
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
// SPA fallback for Netlify and other static hosts
fs.writeFileSync(path.join(publicDir, '_redirects'), '/*    /index.html   200\n', 'utf-8');
console.log(`[Sitemap Generator] ✅ Written sitemap.xml, robots.txt & _redirects to public/`);

// 2. Also write directly to dist/ if dist exists
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n', 'utf-8');
  console.log(`[Sitemap Generator] ✅ Written sitemap.xml, robots.txt & _redirects to dist/`);
}

// 3. Root hosting configurations for Netlify & Vercel
const netlifyToml = `[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
fs.writeFileSync(path.join(process.cwd(), 'netlify.toml'), netlifyToml, 'utf-8');

const vercelJson = JSON.stringify({
  "rewrites": [
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/robots.txt", "destination": "/robots.txt" },
    { "source": "/ads.txt", "destination": "/ads.txt" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}, null, 2);
fs.writeFileSync(path.join(process.cwd(), 'vercel.json'), vercelJson, 'utf-8');

console.log('[Sitemap Generator] ✅ Netlify & Vercel SPA routing rules configured!');
console.log('[Sitemap Generator] Done!');
