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

export default function SEO({
  title,
  description,
  canonicalUrl,
  isLocalPage = false,
  destinationData,
  serviceData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical URL Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. Update OpenGraph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 5. Update JSON-LD Schemas
    const schemaId = 'seo-structured-data';
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schemaScript) {
      schemaScript.remove();
    }

    schemaScript = document.createElement('script');
    schemaScript.id = schemaId;
    schemaScript.type = 'application/ld+json';

    // Core Moving Company Schema
    const movingCompanySchema = {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      '@id': 'https://www.mudanzasmiranda.com.ar/#company',
      'name': 'Mudanzas Miranda',
      'url': 'https://www.mudanzasmiranda.com.ar',
      'logo': 'https://www.mudanzasmiranda.com.ar/img/brand-light.png',
      'image': 'https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg',
      'description': 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas con más de 20 años de experiencia.',
      'telephone': '+5492615130910',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Armada Argentina 584',
        'addressLocality': 'Mendoza',
        'addressRegion': 'Mendoza',
        'postalCode': '5500',
        'addressCountry': 'AR',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': -32.890183,
        'longitude': -68.84405,
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Saturday'],
          'opens': '09:00',
          'closes': '14:00',
        },
      ],
      'sameAs': [
        'https://www.facebook.com/mudanzasmiranda4',
        'https://www.instagram.com/mudanzasmiranda/',
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '186',
        'bestRating': '5',
        'worstRating': '1',
      },
    };

    let schemaData: any[] = [movingCompanySchema];

    // Create BreadcrumbList Schema
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Inicio',
          'item': 'https://www.mudanzasmiranda.com.ar',
        },
      ],
    };

    if (isLocalPage && destinationData) {
      // Localized Service Schema
      const localServiceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Servicio de Mudanza Residencial y Comercial',
        'provider': {
          '@type': 'MovingCompany',
          'name': 'Mudanzas Miranda',
          'telephone': '+5492615130910',
          'priceRange': '$$',
          'image': 'https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg',
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': destinationData.name,
          'containedInPlace': {
            '@type': 'AdministrativeArea',
            'name': 'Mendoza',
          },
        },
        'name': `Mudanzas en ${destinationData.name}`,
        'description': destinationData.description,
      };

      // Add Local Business specialization schema
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'MovingCompany',
        '@id': `https://www.mudanzasmiranda.com.ar/mudanzas-mendoza/${destinationData.slug}.html#localbusiness`,
        'name': `Mudanzas Miranda ${destinationData.name}`,
        'telephone': '+5492615130910',
        'priceRange': '$$',
        'image': 'https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg',
        'description': `Servicio de mudanzas y fletes especializados en la zona de ${destinationData.name}, Mendoza.`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': destinationData.name,
          'addressRegion': 'Mendoza',
          'addressCountry': 'AR',
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': destinationData.name,
        },
      };

      // Push items to breadcrumb
      breadcrumbListSchema.itemListElement.push(
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Destinos',
          'item': 'https://www.mudanzasmiranda.com.ar/#rutas',
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': destinationData.name,
          'item': `https://www.mudanzasmiranda.com.ar/mudanzas-mendoza/${destinationData.slug}.html`,
        }
      );

      schemaData.push(localServiceSchema, localBusinessSchema, breadcrumbListSchema);
    } else if (serviceData) {
      // Specialized Service Schema
      const specializedServiceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': serviceData.title,
        'provider': {
          '@type': 'MovingCompany',
          'name': 'Mudanzas Miranda',
          'telephone': '+5492615130910',
          'priceRange': '$$',
          'image': 'https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg',
        },
        'name': serviceData.heroHeadline,
        'description': serviceData.description,
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'ARS',
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': '0',
            'priceCurrency': 'ARS',
            'valueAddedTaxIncluded': true,
          },
        },
      };

      // Push items to breadcrumb
      breadcrumbListSchema.itemListElement.push(
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Servicios',
          'item': 'https://www.mudanzasmiranda.com.ar/#servicios',
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': serviceData.title,
          'item': `https://www.mudanzasmiranda.com.ar/servicios/${serviceData.slug}.html`,
        }
      );

      schemaData.push(specializedServiceSchema, breadcrumbListSchema);
    } else {
      // FAQ Page Schema for Main Page
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '¿Con cuánta antelación debo reservar mi mudanza?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Recomendamos reservar con al menos una o dos semanas de antelación para asegurar disponibilidad en el día y horario que mejor te convenga.',
            },
          },
          {
            '@type': 'Question',
            'name': '¿Qué incluye el servicio básico de mudanza?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'El servicio básico incluye el camión adaptado al volumen de tu carga, chofer profesional habilitado, personal calificado para la carga y descarga de las pertenencias en origen y destino, y el uso de mantas protectoras profesionales.',
            },
          },
          {
            '@type': 'Question',
            'name': '¿Las mudanzas cuentan con seguro de carga?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Sí. Todas nuestras mudanzas están respaldadas por un seguro de carga de tránsito completo para resguardar el valor de tus bienes ante cualquier imprevisto en la ruta.',
            },
          },
        ],
      };
      schemaData.push(faqSchema);
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      schemaScript?.remove();
    };
  }, [title, description, canonicalUrl, isLocalPage, destinationData, serviceData]);

  return null;
}

