import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { Destination } from '../types';

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
    <footer className="bg-[#0D0D0D] text-slate-400 border-t border-white/10">
      {/* Upper Footer - Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About / Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('')}>
            <img
              src="/img/brand-light.png"
              alt="Logo de Mudanzas Miranda"
              className="h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-serif font-bold text-xl text-white tracking-tight flex items-center gap-1">
              Mudanzas <span className="text-amber-500">Miranda</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Más de 20 años de experiencia brindando tranquilidad y confianza en mudanzas residenciales, comerciales y fletes en toda Mendoza y el país.
          </p>
          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <a
                href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Armada Argentina 584, Mendoza, AR
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <a href="tel:+5492615130910" className="hover:text-white transition-colors">
                +54 9 261 513-0910
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <a href="mailto:info@mudanzasmiranda.com.ar" className="hover:text-white transition-colors">
                info@mudanzasmiranda.com.ar
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Horarios de Atención</h4>
          <p className="text-sm text-slate-400">¿Listo para tu próxima mudanza? Consultanos dentro de nuestros horarios:</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-300">Lunes a Viernes</p>
                <p className="text-xs text-slate-400">08:00 - 20:00 (Continuado)</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-300">Sábados</p>
                <p className="text-xs text-slate-400">09:00 - 14:00</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-red-500/50 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-400">Domingos</p>
                <p className="text-xs text-slate-500">Cerrado (Atención de Emergencias)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Quick links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nuestros Servicios</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Mudanzas Residenciales
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Mudanzas de Oficinas
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Embalaje Profesional
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Servicio de Guardamuebles
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Mudanzas Combinadas
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Logística y Distribución
              </a>
            </li>
          </ul>
        </div>

        {/* Local SEO Directories */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Destinos Frecuentes</h4>
          <p className="text-xs text-slate-500">
            Hacé clic en tu localidad para ver servicios de mudanza especializados en tu zona:
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
            {sortedDestinations.map((d) => (
              <button
                key={d.slug}
                onClick={() => handleLinkClick(d.slug)}
                className="text-left text-slate-400 hover:text-amber-500 transition-colors truncate cursor-pointer"
              >
                • Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}
              </button>
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
