import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.mudanzasmiranda.com.ar';
const EXCLUDED_SERVICE_SLUGS = new Set([
  'mudanzas-combinadas',
  'logistica-integral',
]);

const urls = [
  '/',
  '/nosotros.html',
  '/destinos.html',
  '/servicios.html',
  ...servicePages
    .filter((service) => !EXCLUDED_SERVICE_SLUGS.has(service.slug))
    .map((service) => `/servicios/${service.slug}.html`),
  ...destinations.map((destination) => `/mudanzas-mendoza/${destination.slug}.html`),
];

const xmlEscape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const body = urls
  .map((url) => {
    const loc = `${SITE_URL}${url === '/' ? '' : url}`;
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n  </url>`;
  })
  .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

await writeFile(path.join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8');

console.log(`Sitemap regenerado con ${urls.length} URLs; lastmod omitido para evitar fechas de build engañosas.`);
