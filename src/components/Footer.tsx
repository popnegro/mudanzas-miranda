import { MapPin, Phone, Mail } from 'lucide-react';
import type { SVGProps } from 'react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9.1c0-.9.3-1.5 1.6-1.5H16.8V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V14h2.6v8h3.4z" />
    </svg>
  );
}

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
    <footer className="bg-surface text-ink-tertiary border-t border-line" aria-label="Información de Mudanzas Miranda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <section aria-labelledby="footer-brand-title" className="space-y-6">
          <h2 id="footer-brand-title" className="text-sm font-bold text-ink uppercase tracking-wider">Mudanzas Miranda</h2>
          <p className="text-sm text-ink-secondary leading-relaxed">Mudanzas Miranda es una empresa de mudanzas en Mendoza con más de 20 años de experiencia en mudanzas residenciales, comerciales y acarreos profesionales en Mendoza y el país.</p>
          <a href="/nosotros.html" onClick={(e) => { e.preventDefault(); handleLinkClick('nosotros'); }} className="text-brand hover:text-brand-dark text-sm font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors pt-1">Conocé más sobre nosotros <span aria-hidden="true">→</span></a>
        </section>

        <section aria-labelledby="footer-contact-title" className="space-y-4">
          <h2 id="footer-contact-title" className="text-sm font-bold text-ink uppercase tracking-wider">Contacto</h2>
          <address className="not-italic space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand flex-shrink-0 mt-1" aria-hidden="true" />
              <a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-brand transition-colors leading-relaxed">Armada Argentina 584, Mendoza, Argentina</a>
            </div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand flex-shrink-0" aria-hidden="true" /><a href="tel:+5492615130910" className="text-ink-tertiary hover:text-brand transition-colors font-medium">+54 9 261 513-0910</a></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand flex-shrink-0" aria-hidden="true" /><a href="mailto:info@mudanzasmiranda.com.ar" className="text-ink-tertiary hover:text-brand transition-colors">info@mudanzasmiranda.com.ar</a></div>
          </address>
        </section>

        <nav aria-labelledby="footer-services-title" className="space-y-4">
          <h2 id="footer-services-title" className="text-sm font-bold text-ink uppercase tracking-wider">Nuestros Servicios</h2>
          <ul className="space-y-3">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <a href={`/servicios/${s.slug}.html`} onClick={(e) => { e.preventDefault(); handleLinkClick(s.slug); }} className="group flex items-center gap-2 text-left text-ink-tertiary hover:text-brand transition-all duration-200 hover:translate-x-1 cursor-pointer text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  {s.heroHeadline.replace(' Premium', '')}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-coverage-title" className="space-y-4">
          <h2 id="footer-coverage-title" className="text-sm font-bold text-ink uppercase tracking-wider">Lugares principales</h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm">
            {sitemapDestinations.map((d) => (
              <li key={d.slug}>
                <a href={`/mudanzas-mendoza/${d.slug}.html`} onClick={(e) => { e.preventDefault(); handleLinkClick(d.slug); }} className="group flex items-center gap-2 text-left text-ink-tertiary hover:text-brand transition-all duration-200 hover:translate-x-0.5 cursor-pointer font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  <span>Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="bg-background-soft border-t border-line py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <p className="text-center sm:text-left">© 2026 Mudanzas Miranda · Powered by <a href="https://wa.me/5492616706710">SmartWeb</a></p>
          <nav aria-label="Redes sociales" className="flex items-center gap-4">
            <a href="https://www.instagram.com/mudanzasmiranda/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-ink hover:bg-background transition-all" aria-label="Instagram de Mudanzas Miranda"><InstagramIcon className="w-5 h-5 text-brand" /></a>
            <a href="https://www.facebook.com/mudanzasmiranda4" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-ink hover:bg-background transition-all" aria-label="Facebook de Mudanzas Miranda"><FacebookIcon className="w-5 h-5 text-brand" /></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
