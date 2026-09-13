import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

interface FooterProps {
  destinations: Destination[];
  onNavigate: (slug: string) => void;
}

const SITEMAP_DESTINATION_SLUGS = [
  'mudanzas-ciudad-mendoza',
  'mudanzas-godoy-cruz',
  'mudanzas-guaymallen',
  'mudanzas-las-heras',
  'mudanzas-maipu',
  'mudanzas-lujan-de-cuyo',
  'mudanzas-valle-de-uco',
  'mudanzas-zona-este',
];

export default function Footer({ destinations, onNavigate }: FooterProps) {
  const sitemapDestinations = SITEMAP_DESTINATION_SLUGS
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => Boolean(d));

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0D0D] text-slate-300 border-t border-white/10" aria-label="Información y navegación de Mudanzas Miranda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mudanzas Miranda</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Mudanzas Miranda es una empresa de mudanzas en Mendoza con más de 20 años de experiencia en mudanzas residenciales, comerciales y acarreos profesionales en Mendoza y el país.</p>
            <a href="/nosotros.html" onClick={(e) => { e.preventDefault(); handleLinkClick('nosotros'); }} className="text-amber-500 hover:text-amber-400 text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors pt-1">Conocé más sobre nosotros →</a>
          </div>
        </div>
        <nav aria-label="Contacto de Mudanzas Miranda" className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-3">
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-500 transition-colors leading-relaxed">Armada Argentina 584, Mendoza, Argentina</a>
              </div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" /><a href="tel:+5492615130910" className="text-slate-300 hover:text-amber-500 transition-colors font-medium">+54 9 261 513-0910</a></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" /><a href="mailto:info@mudanzasmiranda.com.ar" className="text-slate-300 hover:text-amber-500 transition-colors">info@mudanzasmiranda.com.ar</a></div>
            </address>
          </ul>
        </nav>
        <nav aria-label="Servicios de mudanzas" className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nuestros Servicios</h4>
          <ul className="space-y-3">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <a href={`/servicios/${s.slug}.html`} onClick={(e) => { e.preventDefault(); handleLinkClick(s.slug); }} className="group flex items-center gap-2 text-left text-slate-300 hover:text-amber-500 transition-all duration-200 hover:translate-x-1 cursor-pointer text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  {s.heroHeadline.replace(' Premium', '')}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Zonas de cobertura en Mendoza" className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lugares principales</h4>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm">
            {sitemapDestinations.map((d) => (
              <li key={d.slug}>
                <a href={`/mudanzas-mendoza/${d.slug}.html`} onClick={(e) => { e.preventDefault(); handleLinkClick(d.slug); }} className="group flex items-center gap-2 text-left text-slate-300 hover:text-amber-500 transition-all duration-200 hover:translate-x-0.5 cursor-pointer font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  <span>Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-[#0A0A0A]/80 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <p>© 2026 Mudanzas Miranda · Powered by <a href="https://wa.me/5492616706710">SmartWeb</a></p>
          </div>
          <div className="flex items-center gap-4" aria-label="Redes sociales">
            <a href="https://www.instagram.com/mudanzasmiranda/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all" aria-label="Instagram de Mudanzas Miranda"><Instagram className="w-5 h-5 text-amber-500" aria-hidden="true" /></a>
            <a href="https://www.facebook.com/mudanzasmiranda4" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all" aria-label="Facebook de Mudanzas Miranda"><Facebook className="w-5 h-5 text-amber-500" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
