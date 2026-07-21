import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

interface FooterProps {
  destinations: Destination[];
  onNavigate: (slug: string) => void;
}

export default function Footer({ destinations, onNavigate }: FooterProps) {
  // Sort destinations alphabetically
  const sortedDestinations = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0D0D] text-slate-300 border-t border-white/10">
      {/* Upper Footer - Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        {/* About / Contact / Hours */}
        <div className="space-y-6">
          <div className="space-y-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('');
              }}
              className="flex items-center cursor-pointer block"
            >
              <img
                src="https://www.mudanzasmiranda.com.ar/img/brand-light.png"
                alt="Mudanzas Miranda"
                className="h-10 w-auto object-contain block transition-transform duration-200 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Más de 20 años brindando tranquilidad en mudanzas residenciales, comerciales y acarreos profesionales en Mendoza y el país.
            </p>
            <a
              href="/nosotros.html"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('nosotros');
              }}
              className="text-amber-500 hover:text-amber-400 text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors pt-1"
            >
              Conocé más Sobre Nosotros →
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
              <a
                href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-amber-500 transition-colors leading-relaxed"
              >
                Armada Argentina 584, Mendoza, AR
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <a href="tel:+5492615130910" className="text-slate-300 hover:text-amber-500 transition-colors font-medium">
                +54 9 261 513-0910
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <a href="mailto:info@mudanzasmiranda.com.ar" className="text-slate-300 hover:text-amber-500 transition-colors">
                info@mudanzasmiranda.com.ar
              </a>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Horarios de Atención</h5>
            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <p className="font-semibold">Lun a Vie</p>
                <p className="text-xs text-slate-400">08:00 - 20:00</p>
              </div>
              <div>
                <p className="font-semibold">Sábados</p>
                <p className="text-xs text-slate-400">09:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Services Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nuestros Servicios</h4>
          <ul className="space-y-3">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <a
                  href={`/servicios/${s.slug}.html`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(s.slug);
                  }}
                  className="group flex items-center gap-2 text-left text-slate-300 hover:text-amber-500 transition-all duration-200 hover:translate-x-1 cursor-pointer text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" />
                  {s.heroHeadline.replace(' Premium', '')}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Local SEO Directories */}
        <div className="space-y-4 md:col-span-2 lg:col-span-2">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Destinos Frecuentes</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Traslados y transportes especializados por departamento:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            {sortedDestinations.map((d) => (
              <a
                key={d.slug}
                href={`/mudanzas-mendoza/${d.slug}.html`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(d.slug);
                }}
                className="group flex items-center gap-1.5 text-left text-slate-300 hover:text-amber-500 transition-all duration-200 hover:translate-x-0.5 cursor-pointer font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-all duration-200 flex-shrink-0" />
                <span className="truncate">Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}</span>
              </a>
            ))}
          </div>
        </div>
      </div>


      {/* Lower Footer - Copyright & Social */}
      <div className="bg-[#0A0A0A]/80 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <p>© 2026 Mudanzas Miranda. Armada Argentina 584, Mendoza, AR.</p>
            <p className="mt-0.5 text-[10px] text-slate-600">
              Desarrollado en React & Tailwind con optimización extrema para Lighthouse y SEO local.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/mudanzasmiranda/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
              aria-label="Instagram de Mudanzas Miranda"
            >
              <Instagram className="w-5 h-5 text-amber-500" />
            </a>
            <a
              href="https://www.facebook.com/mudanzasmiranda4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
              aria-label="Facebook de Mudanzas Miranda"
            >
              <Facebook className="w-5 h-5 text-amber-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
