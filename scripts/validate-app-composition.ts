import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';
import { getPageSeo } from '../src/app/getPageSeo';

const routeCases = [
  { path: '/', slug: '' },
  { path: '/nosotros.html', slug: 'nosotros' },
  ...(destinations.slice(0, 2).map((destination) => ({
    path: `/mudanzas-mendoza/${destination.slug}.html`,
    slug: destination.slug,
  }))),
  ...(servicePages.slice(0, 2).map((service) => ({
    path: `/servicios/${service.slug}.html`,
    slug: service.slug,
  }))),
];

for (const route of routeCases) {
  const destination = destinations.find((item) => item.slug === route.slug);
  const service = servicePages.find((item) => item.slug === route.slug);
  const seo = getPageSeo(route.slug, destination, service);

  if (!seo.title || !seo.description || !seo.canonicalUrl) {
    throw new Error(`Invalid SEO contract for ${route.path}`);
  }
}

console.log(`App composition contracts validated: ${routeCases.length} route cases.`);
