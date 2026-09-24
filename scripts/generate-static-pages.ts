import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { destinations } from '../src/data/destinations';
import { servicePages } from '../src/data/seoPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.mudanzasmiranda.com.ar';
const SITE_NAME = 'Mudanzas Miranda';
const DEFAULT_IMAGE = `${SITE_URL}/img/mudanzas-miranda-1200.jpg`;
const RATING_VALUE = '4.9';
const REVIEW_COUNT = '597';

interface PageDefinition {
  file: string;
  url: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  detail?: string;
  kind: 'home' | 'about' | 'service' | 'local';
  serviceName?: string;
  destinationName?: string;
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const canonical = (slug: string) => `${SITE_URL}${slug ? `/${slug}` : ''}`;

const pages: PageDefinition[] = [
  {
    file: 'index.html',
    url: SITE_URL,
    title: 'Mudanzas en Mendoza - Profesionales y Seguras | Mudanzas Miranda',
    description: 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Rápido, seguro y sin estrés. ¡Cotizá tu mudanza online en minutos!',
    heading: 'Mudanzas en Mendoza',
    intro: 'Mudanzas Miranda es una empresa de mudanzas y traslados en Mendoza. Realizamos mudanzas residenciales, de oficinas, embalaje profesional, guardamuebles, mudanzas combinadas y logística integral.',
    detail: 'Atendemos Mendoza y las principales zonas del Gran Mendoza con presupuesto personalizado, coordinación previa y contacto directo.',
    kind: 'home',
  },
  {
    file: 'nosotros.html',
    url: canonical('nosotros.html'),
    title: 'Sobre Nosotros - Historia, Misión y Valores | Mudanzas Miranda',
    description: 'Conocé la historia, misión y valores de Mudanzas Miranda. Más de 20 años de trayectoria brindando tranquilidad y confianza en mudanzas en Mendoza.',
    heading: 'Sobre Mudanzas Miranda',
    intro: 'Mudanzas Miranda brinda servicios profesionales de mudanzas y traslados en Mendoza, con foco en el cuidado de las pertenencias, la coordinación y la atención personalizada.',
    detail: 'La empresa atiende mudanzas residenciales, oficinas y soluciones logísticas para clientes de Mendoza.',
    kind: 'about',
  },
  {
    file: 'destinos.html',
    url: canonical('destinos.html'),
    title: 'Zonas de Cobertura y Destinos | Mudanzas Miranda',
    description: 'Cubrimos toda la provincia de Mendoza con servicios de mudanzas y traslados. Conocé nuestras zonas de cobertura en el Gran Mendoza, Valle de Uco, Zona Este y Sur.',
    heading: 'Zonas de Cobertura y Destinos',
    intro: 'Llegamos a cada rincón de la provincia de Mendoza y conectamos la región con traslados interprovinciales a todo el país.',
    kind: 'about',
  },
  {
    file: 'servicios.html',
    url: canonical('servicios.html'),
    title: 'Servicios de Mudanzas y Traslados en Mendoza | Mudanzas Miranda',
    description: 'Mudanzas residenciales, traslados de oficinas, embalaje profesional, guardamuebles y logística integral en Mendoza. Conocé todas nuestras soluciones.',
    heading: 'Servicios de Mudanzas y Traslados en Mendoza',
    intro: 'Diseñamos cada servicio a la medida de tu necesidad. Desde mudanzas residenciales hasta logística corporativa, con más de 20 años de experiencia respaldando cada traslado.',
    kind: 'about',
  },
];

for (const service of servicePages) {
  pages.push({
    file: `servicios/${service.slug}.html`,
    url: canonical(`servicios/${service.slug}.html`),
    title: service.title,
    description: service.description,
    heading: service.heroHeadline,
    intro: service.leadText,
    detail: service.detailText,
    kind: 'service',
    serviceName: service.name,
  });
}

for (const destination of destinations) {
  pages.push({
    file: `mudanzas-mendoza/${destination.slug}.html`,
    url: canonical(`mudanzas-mendoza/${destination.slug}.html`),
    title: destination.title,
    description: destination.description,
    heading: destination.heroHeadline,
    intro: destination.leadText,
    detail: destination.detailText,
    kind: 'local',
    destinationName: destination.name,
  });
}

const organizationId = `${SITE_URL}/#organization`;

function schemaFor(page: PageDefinition) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Organization', 'LocalBusiness', 'MovingCompany'],
      '@id': organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/img/brand-dark.png`,
      image: DEFAULT_IMAGE,
      telephone: '+5492615130910',
      email: 'info@mudanzasmiranda.com.ar',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Armada Argentina 584',
        addressLocality: 'Mendoza',
        addressCountry: 'AR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      sameAs: ['https://www.instagram.com/mudanzasmiranda/', 'https://www.facebook.com/mudanzasmiranda4'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RATING_VALUE,
        reviewCount: REVIEW_COUNT,
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': organizationId },
      inLanguage: 'es-AR',
    },
    {
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      url: page.url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': organizationId },
      inLanguage: 'es-AR',
    },
  ];

  if (page.kind === 'service' && page.serviceName) {
    graph.push({
      '@type': 'Service',
      '@id': `${page.url}#service`,
      name: page.serviceName,
      description: page.description,
      url: page.url,
      provider: { '@id': organizationId },
      areaServed: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
    });
  }

  if (page.kind === 'local' && page.destinationName) {
    graph.push({
      '@type': 'Place',
      '@id': `${page.url}#place`,
      name: page.destinationName,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
    });
  }

  if (page.kind !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: page.heading, item: page.url },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function renderPage(page: PageDefinition) {
  const schema = JSON.stringify(schemaFor(page));
  const bodyDetail = page.detail ? `<p>${esc(page.detail)}</p>` : '';
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${page.url}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta property="og:locale" content="es_AR" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${DEFAULT_IMAGE}" />
    <link rel="icon" type="image/png" href="/img/favicon.png" />
    <script id="seo-structured-data" type="application/ld+json">${schema}</script>
  </head>
  <body>
    <div id="root">
      <main>
        <article style="display: none;">
          <header>
            <h1>${esc(page.heading)}</h1>
          </header>
          <p>${esc(page.intro)}</p>
          ${bodyDetail}
          <footer>
            <p><strong>Mudanzas Miranda</strong> · Armada Argentina 584, Mendoza · +54 9 261 513-0910 · info@mudanzasmiranda.com.ar</p>
          </footer>
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

await rm(path.join(ROOT, 'nosotros.html'), { force: true });
await rm(path.join(ROOT, 'destinos.html'), { force: true });
await rm(path.join(ROOT, 'servicios.html'), { force: true });
await rm(path.join(ROOT, 'servicios'), { recursive: true, force: true });
await rm(path.join(ROOT, 'mudanzas-mendoza'), { recursive: true, force: true });

for (const page of pages) {
  const target = path.join(ROOT, page.file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderPage(page), 'utf8');
}

console.log(`Generated ${pages.length} static SEO entry points.`);
console.log(pages.map((page) => page.file).join('\n'));
