import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { destinations } from '../data/destinations';

const breadcrumbNameMap: { [key: string]: string } = {
  'nosotros': 'Nosotros',
  'mudanzas-residenciales': 'Mudanzas Residenciales',
  'mudanzas-corporativas': 'Mudanzas Corporativas',
  'mudanzas-nacionales': 'Mudanzas Nacionales',
  'mudanzas-locales': 'Mudanzas Locales',
  'embalaje-profesional': 'Embalaje Profesional',
  'guardamuebles': 'Guardamuebles',
  'casos-de-exito': 'Casos de Éxito',
  'galeria': 'Galería',
  'servicios': 'Servicios',
  'cobertura': 'Cobertura',
  'preguntas-frecuentes': 'Preguntas Frecuentes',
  'contacto': 'Contacto',
  'cotizacion': 'Cotización',
  'politica-de-privacidad': 'Política de Privacidad',
  'terminos-y-condiciones': 'Términos y Condiciones',
  'destinos': 'Destinos',
};

const getDynamicBreadcrumbName = (pathSegment: string, fullPath: string): string => {
  if (fullPath.startsWith('/destinos/')) {
    const destination = destinations.find(d => d.slug === pathSegment);
    return destination ? destination.name : pathSegment.replace(/-/g, ' ');
  }
  return breadcrumbNameMap[pathSegment] || pathSegment.replace(/-/g, ' ');
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0 || location.pathname === '/') {
    return null; // Don't show breadcrumbs on the homepage
  }

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const name = getDynamicBreadcrumbName(value, to);
    return {
      path: to,
      name: name,
      isLast: index === pathnames.length - 1,
    };
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://www.mudanzasmiranda.com/' },
      ...breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 2,
        'name': item.name,
        'item': `https://www.mudanzasmiranda.com${item.path}`,
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav aria-label="breadcrumb" className="bg-gray-900/50 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3 text-sm">
        <ol className="list-none p-0 inline-flex items-center text-slate-300">
          <li className="flex items-center"><Link to="/" className="hover:text-amber-500 transition-colors">Inicio</Link></li>
          {breadcrumbItems.map((item) =>
            item.isLast ? (<li key={item.path} className="flex items-center text-slate-400"><span className="mx-2 text-slate-500">/</span>{item.name}</li>) : (<li key={item.path} className="flex items-center"><span className="mx-2 text-slate-500">/</span><Link to={item.path} className="hover:text-amber-500 transition-colors">{item.name}</Link></li>)
          )}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;