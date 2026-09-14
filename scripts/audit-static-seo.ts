import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const SITE_URL = 'https://www.mudanzasmiranda.com.ar';

const pages = [
  '/',
  '/nosotros.html',
  ...servicePages.map((service) => `/servicios/${service.slug}.html`),
  ...destinations.map((destination) => `/mudanzas-mendoza/${destination.slug}.html`),
];

const fileFor = (urlPath: string) => urlPath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, urlPath.slice(1));
const required = (html: string, pattern: RegExp, label: string, page: string) => {
  if (!pattern.test(html)) throw new Error(`${page}: missing ${label}`);
};

for (const page of pages) {
  const html = await readFile(fileFor(page), 'utf8');
  const canonical = `${SITE_URL}${page === '/' ? '' : page}`;
  required(html, /<title>[^<]+<\/title>/i, 'title', page);
  required(html, /<meta[^>]+name="description"[^>]+content="[^"]+"/i, 'description', page);
  required(html, new RegExp(`<link[^>]+rel="canonical"[^>]+href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i'), 'canonical', page);
  required(html, /<meta[^>]+name="robots"[^>]+content="index,follow"/i, 'indexable robots', page);
  required(html, /<main[\s\S]*?<h1>[^<]+<\/h1>/i, 'semantic main/H1', page);
  required(html, /<script[^>]+id="seo-structured-data"[^>]+type="application\/ld\+json">/i, 'initial JSON-LD', page);

  const schemaMatch = html.match(/<script[^>]+id="seo-structured-data"[^>]*>([\s\S]*?)<\/script>/i);
  if (!schemaMatch) throw new Error(`${page}: JSON-LD script could not be read`);
  const schema = JSON.parse(schemaMatch[1]) as { '@graph'?: Array<Record<string, unknown>> };
  const graph = schema['@graph'] ?? [];
  const localBusiness = graph.find((item) => Array.isArray(item['@type']) && item['@type'].includes('LocalBusiness'));
  if (!localBusiness) throw new Error(`${page}: LocalBusiness graph node missing`);
  if (!graph.some((item) => item['@type'] === 'WebPage')) throw new Error(`${page}: WebPage graph node missing`);
  if (page !== '/' && !graph.some((item) => item['@type'] === 'BreadcrumbList')) {
    throw new Error(`${page}: BreadcrumbList graph node missing`);
  }

  console.log(`PASS ${page}`);
}

console.log(`Static SEO/GEO audit passed: ${pages.length}/${pages.length} canonical URLs.`);
