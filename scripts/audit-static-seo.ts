import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://www.mudanzasmiranda.com.ar';
const CANONICAL_ORIGIN = new URL(SITE_URL).origin;
const EXCLUDED_SERVICE_SLUGS = new Set(['mudanzas-combinadas', 'logistica-integral']);

const pages = [
  '/',
  '/nosotros.html',
  '/destinos.html',
  '/servicios.html',
  ...servicePages.map((service) => '/servicios/' + service.slug + '.html'),
  ...destinations.map((destination) => '/mudanzas-mendoza/' + destination.slug + '.html'),
];

const expectedSitemapPaths = new Set([
  '/',
  '/nosotros.html',
  '/destinos.html',
  '/servicios.html',
  ...servicePages
    .filter((service) => !EXCLUDED_SERVICE_SLUGS.has(service.slug))
    .map((service) => '/servicios/' + service.slug + '.html'),
  ...destinations.map((destination) => '/mudanzas-mendoza/' + destination.slug + '.html'),
]);

const fileFor = (urlPath: string) =>
  urlPath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, urlPath.slice(1));

const required = (html: string, pattern: RegExp, label: string, page: string) => {
  if (!pattern.test(html)) throw new Error(page + ': missing ' + label);
};

const escapeRegex = (value: string) => value.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');

const sitemapPaths = async (file: string) => {
  const xml = await readFile(file, 'utf8');
  const locs = Array.from(xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi), (match) => match[1].trim());
  if (locs.length === 0) throw new Error(file + ': sitemap contains no <loc> entries');

  const paths = locs.map((loc) => {
    let parsed: URL;
    try {
      parsed = new URL(loc);
    } catch {
      throw new Error(file + ': invalid sitemap URL: ' + loc);
    }
    if (
      parsed.origin !== CANONICAL_ORIGIN ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      throw new Error(file + ': non-canonical sitemap URL: ' + loc);
    }
    return parsed.pathname || '/';
  });

  if (new Set(paths).size !== paths.length) throw new Error(file + ': duplicate sitemap URLs');
  return new Set(paths);
};

const titles = new Set<string>();
const canonicals = new Set<string>();

for (const page of pages) {
  const html = await readFile(fileFor(page), 'utf8');
  const canonical = SITE_URL + (page === '/' ? '' : page);
  required(html, /<title>[^<]+<\/title>/i, 'title', page);
  required(html, /<meta[^>]+name="description"[^>]+content="[^"]+"/i, 'description', page);
  required(
    html,
    new RegExp('<link[^>]+rel="canonical"[^>]+href="' + escapeRegex(canonical) + '"', 'i'),
    'canonical',
    page,
  );
  required(html, /<meta[^>]+name="robots"[^>]+content="index,follow"/i, 'indexable robots', page);
  required(html, /<main[\s\S]*?<h1>[^<]+<\/h1>/i, 'semantic main/H1', page);
  required(html, /<script[^>]+id="seo-structured-data"[^>]+type="application\/ld\+json">/i, 'initial JSON-LD', page);

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  if (title && titles.has(title)) throw new Error(page + ': duplicate title: ' + title);
  if (title) titles.add(title);
  if (canonicals.has(canonical)) throw new Error(page + ': duplicate canonical URL: ' + canonical);
  canonicals.add(canonical);

  const schemaMatch = html.match(/<script[^>]+id="seo-structured-data"[^>]*>([\s\S]*?)<\/script>/i);
  if (!schemaMatch) throw new Error(page + ': JSON-LD script could not be read');
  const schema = JSON.parse(schemaMatch[1]) as { '@graph'?: Array<Record<string, unknown>> };
  const graph = schema['@graph'] ?? [];
  const localBusiness = graph.find(
    (item) => Array.isArray(item['@type']) && item['@type'].includes('LocalBusiness'),
  );
  if (!localBusiness) throw new Error(page + ': LocalBusiness graph node missing');
  if (schemaMatch[1].includes('aggregateRating')) {
    throw new Error(page + ': self-controlled AggregateRating must not be emitted');
  }
  if (!graph.some((item) => item['@type'] === 'WebPage')) {
    throw new Error(page + ': WebPage graph node missing');
  }
  if (page !== '/' && !graph.some((item) => item['@type'] === 'BreadcrumbList')) {
    throw new Error(page + ': BreadcrumbList graph node missing');
  }

  const fallback = html.match(/<article\b[^>]*\bclass="[^"]*\bseo-fallback\b[^"]*"[^>]*>/i);
  if (!fallback) throw new Error(page + ': visible SEO fallback article missing');
  if (/\bhidden\b/i.test(fallback[0]) || /\bstyle\s*=\s*["'][^"']*display\s*:\s*none/i.test(fallback[0])) {
    throw new Error(page + ': SEO fallback is hidden from initial HTML');
  }

  console.log('PASS ' + page);
}

const publicSitemap = await sitemapPaths(path.join(ROOT, 'public', 'sitemap.xml'));
const distSitemap = await sitemapPaths(path.join(DIST, 'sitemap.xml'));

for (const [label, actual] of [['public/sitemap.xml', publicSitemap], ['dist/sitemap.xml', distSitemap]] as const) {
  for (const expected of expectedSitemapPaths) {
    if (!actual.has(expected)) throw new Error(label + ': expected canonical URL missing: ' + expected);
  }
  for (const url of actual) {
    if (!expectedSitemapPaths.has(url)) throw new Error(label + ': unexpected or redirected URL included: ' + url);
  }
  if (actual.size !== expectedSitemapPaths.size) {
    throw new Error(label + ': expected ' + expectedSitemapPaths.size + ' URLs, found ' + actual.size);
  }
}

console.log(
  'Static SEO/GEO audit passed: ' + pages.length + '/' + pages.length +
  ' HTML entry points; sitemap verified (' + expectedSitemapPaths.size + ' canonical URLs).',
);
