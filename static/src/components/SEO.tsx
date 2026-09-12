import { useEffect } from 'react';
import { Destination, ServicePage } from '../types';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  isLocalPage?: boolean;
  indexable?: boolean;
  destinationData?: Destination;
  serviceData?: ServicePage;
}

const SITE_URL = 'https://www.mudanzasmiranda.com.ar';
const SITE_NAME = 'Mudanzas Miranda';
const DEFAULT_IMAGE = `${SITE_URL}/img/mudanzas-miranda-1200.jpg`;
const RATING_VALUE = '4.9';
const REVIEW_COUNT = '496';

export default function SEO({ title, description, canonicalUrl, isLocalPage = false, indexable = true, destinationData, serviceData }: SEOProps) {
  useEffect(() => {
    document.title = title;
    const isStaging = window.location.hostname.endsWith('.vercel.app');
    const effectiveIndexable = indexable && !isStaging;
    const setMeta = (selector: string, attribute: string, content: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, selector.match(/\[([^=]+)=/)?.[1] ?? attribute);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    const setLink = (rel: string, href: string) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    setMeta('meta[name="description"]', 'name', description);
    setMeta('meta[name="robots"]', 'name', effectiveIndexable ? 'index,follow' : 'noindex,follow');
    setLink('canonical', canonicalUrl);

    const ogTags: Record<string, string> = {
      'og:title': title, 'og:description': description, 'og:url': canonicalUrl,
      'og:type': 'website', 'og:site_name': SITE_NAME, 'og:image': DEFAULT_IMAGE,
      'og:image:width': '1200', 'og:image:height': '630', 'og:locale': 'es_AR',
    };
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });

    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image', 'twitter:title': title,
      'twitter:description': description, 'twitter:image': DEFAULT_IMAGE,
    };
    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', name); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });

    const schemaId = 'seo-structured-data';
    document.getElementById(schemaId)?.remove();
    const organizationId = `${SITE_URL}/#organization`;
    const schemaData: Record<string, unknown>[] = [
      {
        '@type': ['Organization', 'LocalBusiness', 'MovingCompany'], '@id': organizationId,
        name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/img/brand-light.png`, image: DEFAULT_IMAGE,
        telephone: '+5492615130910', email: 'info@mudanzasmiranda.com.ar',
        address: { '@type': 'PostalAddress', streetAddress: 'Armada Argentina 584', addressLocality: 'Mendoza', addressCountry: 'AR' },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
        ],
        sameAs: ['https://www.instagram.com/mudanzasmiranda/', 'https://www.facebook.com/mudanzasmiranda4'],
        aggregateRating: {
          '@type': 'AggregateRating', ratingValue: RATING_VALUE, reviewCount: REVIEW_COUNT,
          bestRating: '5', worstRating: '1',
        },
        areaServed: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
      },
      {
        '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME,
        publisher: { '@id': organizationId }, inLanguage: 'es-AR',
      },
      {
        '@type': 'WebPage', '@id': `${canonicalUrl}#webpage`, url: canonicalUrl,
        name: title, description, isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': organizationId }, inLanguage: 'es-AR',
      },
    ];

    if (canonicalUrl !== SITE_URL && (isLocalPage || destinationData || serviceData)) {
      const breadcrumbItems: Record<string, unknown>[] = [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL }];
      if (isLocalPage && destinationData) {
        breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: destinationData.name, item: canonicalUrl });
      } else if (serviceData) {
        breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: serviceData.title, item: canonicalUrl });
        schemaData.push({
          '@type': 'Service', '@id': `${canonicalUrl}#service`, name: serviceData.name,
          description: serviceData.description, url: canonicalUrl, provider: { '@id': organizationId },
          areaServed: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
        });
      }
      schemaData.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbItems });
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = schemaId; schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaData });
    document.head.appendChild(schemaScript);
    return () => schemaScript.remove();
  }, [title, description, canonicalUrl, indexable, isLocalPage, destinationData, serviceData]);
  return null;
}
