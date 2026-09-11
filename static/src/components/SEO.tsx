import { useEffect } from 'react';
import { Destination, ServicePage } from '../types';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  isLocalPage?: boolean;
  destinationData?: Destination;
  serviceData?: ServicePage;
}

const SITE_URL = 'https://www.mudanzasmiranda.com.ar';
const SITE_NAME = 'Mudanzas Miranda';
const DEFAULT_IMAGE = `${SITE_URL}/img/mudanzas-miranda-1200.jpg`;

export default function SEO({
  title,
  description,
  canonicalUrl,
  isLocalPage = false,
  destinationData,
  serviceData,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

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
    setMeta('meta[name="robots"]', 'name', canonicalUrl === SITE_URL ? 'index,follow' : 'noindex,follow');

    setLink('canonical', canonicalUrl);

    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:type': 'website',
      'og:site_name': SITE_NAME,
      'og:image': DEFAULT_IMAGE,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': 'es_AR',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': DEFAULT_IMAGE,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const schemaId = 'seo-structured-data';
    document.getElementById(schemaId)?.remove();

    const schemaData: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/img/brand-light.png`,
        image: DEFAULT_IMAGE,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'es-AR',
      },
    ];

    // Local/service pages currently remain out of the index until their
    // business facts (coverage, services, contact data and claims) are verified.
    if (canonicalUrl !== SITE_URL && (isLocalPage || destinationData || serviceData)) {
      const breadcrumbItems: Record<string, unknown>[] = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_URL,
        },
      ];

      if (isLocalPage && destinationData) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: destinationData.name,
          item: canonicalUrl,
        });
      } else if (serviceData) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: serviceData.title,
          item: canonicalUrl,
        });
      }

      schemaData.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      });
    }

    // FAQPage, LocalBusiness/MovingCompany, AggregateRating, telephone,
    // address, geo, openingHours and sameAs are intentionally omitted until
    // the corresponding facts are verified by the owner.
    const schemaScript = document.createElement('script');
    schemaScript.id = schemaId;
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaData,
    });
    document.head.appendChild(schemaScript);

    return () => {
      schemaScript.remove();
    };
  }, [title, description, canonicalUrl, isLocalPage, destinationData, serviceData]);

  return null;
}
