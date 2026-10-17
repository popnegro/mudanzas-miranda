import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';

type ContentPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  leadText: string;
  detailText: string;
  kind: 'destination' | 'service';
};

const pages: ContentPage[] = [
  ...destinations.map((page) => ({ ...page, kind: 'destination' as const })),
  ...servicePages.map((page) => ({ ...page, kind: 'service' as const })),
];

const normalize = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('es-AR').replace(/\s+/g, ' ').trim();

const fail = (message: string) => {
  throw new Error('[GEO CONTENT] ' + message);
};

const assertUnique = (field: 'title' | 'description') => {
  const seen = new Map<string, string>();
  for (const page of pages) {
    const value = normalize(page[field]);
    const previous = seen.get(value);
    if (previous) fail('duplicate ' + field + ' on ' + previous + ' and ' + page.slug);
    seen.set(value, page.slug);
  }
};

assertUnique('title');
assertUnique('description');

for (const page of pages) {
  for (const field of ['title', 'description', 'heroHeadline', 'heroSubheadline', 'leadText', 'detailText'] as const) {
    if (!page[field]?.trim()) fail(page.slug + ': missing ' + field);
  }

  if (page.kind === 'destination') {
    if (!normalize(page.title).includes(normalize(page.name))) {
      fail(page.slug + ': title does not include destination name "' + page.name + '"');
    }
    if (!normalize(page.description).includes(normalize(page.name))) {
      fail(page.slug + ': description does not include destination name "' + page.name + '"');
    }
    if (!normalize(page.heroHeadline).includes(normalize(page.name))) {
      fail(page.slug + ': hero headline does not include destination name "' + page.name + '"');
    }
  }
}

const claimPatterns = [
  /\bgarantiz\w*/giu,
  /\b(?:líder|maxim[oa]s?|total(?:es)?|complet[oa]s?|propia|propios|propio)\b/giu,
  /\b(?:CNRT|habilitad\w*|neumáticos|seguimiento satelital|salidas semanales)\b/giu,
  /\b(?:más de 20 años|en perfectas condiciones|la mejor|los mejores|sin demoras)\b/giu,
  /\bseguro(?:s)? de carga\b/giu,
];

const reviews = new Map<string, Set<string>>();
for (const page of pages) {
  const fields = [
    ['title', page.title],
    ['description', page.description],
    ['heroSubheadline', page.heroSubheadline],
    ['leadText', page.leadText],
    ['detailText', page.detailText],
  ] as const;

  for (const [field, content] of fields) {
    for (const pattern of claimPatterns) {
      pattern.lastIndex = 0;
      for (const match of content.matchAll(pattern)) {
        const term = normalize(match[0]);
        const key = page.slug + ' · ' + field + ' · "' + term + '"';
        if (!reviews.has(key)) reviews.set(key, new Set());
        reviews.get(key)!.add(match[0]);
      }
    }
  }
}

console.log('[GEO CONTENT] PASS: ' + pages.length + ' service/destination records checked.');
console.log('[GEO CONTENT] PASS: titles and meta descriptions are unique; destination title, description and H1 identify their locality.');
console.log('[GEO CONTENT] MANUAL FACT CHECK: review these marketing/operational claims against current business evidence before declaring GEO PASS.');
if (reviews.size === 0) {
  console.log('[GEO CONTENT] No claim patterns flagged.');
} else {
  for (const key of reviews.keys()) console.log('[GEO CLAIM REVIEW] ' + key);
}
