import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const serviceLinks = [
  { name: 'Mudanzas Residenciales', path: '/servicios/mudanzas-residenciales' },
  { name: 'Mudanzas Corporativas', path: '/servicios/mudanzas-corporativas' },
  { name: 'Mudanzas Nacionales', path: '/servicios/mudanzas-nacionales' },
  { name: 'Mudanzas Locales', path: '/servicios/mudanzas-locales' },
  { name: 'Embalaje Profesional', path: '/servicios/embalaje-profesional' },
  { name: 'Guardamuebles', path: '/servicios/guardamuebles' },
];

const mainLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Cobertura', path: '/cobertura' },
    { name: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { name: 'Contacto', path: '/contacto' },
];

const legalLinks = [
    { name: 'Política de Privacidad', path: '/politica-de-privacidad' },
    { name: 'Términos y Condiciones', path: '/terminos-y-condiciones' },
];

const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/mudanzasmiranda/', icon: Instagram },
    { name: 'Facebook', href: 'https://www.facebook.com/mudanzasmiranda4', icon: Facebook },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0D0D] text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Columna principal: Logo, descripción y contacto */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" aria-label="Ir a la página de inicio">
            <img 
              src="/img/logo-mudanzas-miranda-light.svg" 
              alt="Logo de Mudanzas Miranda" 
              className="h-10 w-auto" 
              width="200" 
              height="40" 
              loading="lazy" 
            />
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Más de 20 años de experiencia brindando tranquilidad y confianza en mudanzas.
          </p>
          <div className="space-y-4 pt-2 text-sm">
             <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Armada Argentina 584, Mendoza, AR
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-amber-500" />
              <a href="tel:+5492615130910" className="hover:text-white transition-colors">+54 9 261 513-0910</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-amber-500" />
              <a href="mailto:info@mudanzasmiranda.com.ar" className="hover:text-white transition-colors">info@mudanzasmiranda.com.ar</a>
            </div>
          </div>
        </div>

        {/* Columna de Navegación */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {mainLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Columna de Servicios */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nuestros Servicios</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map(service => (
              <li key={service.path}>
                <Link to={service.path} className="hover:text-white transition-colors">{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna Legal y Redes Sociales */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map(link => (
                <li key={link.path}><Link to={link.path} className="hover:text-white transition-colors">{link.name}</Link></li>
            ))}
          </ul>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-6">Seguinos</h4>
          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-slate-400 hover:text-amber-500 transition-colors">
                    <social.icon className="w-6 h-6" />
                </a>
            ))}
          </div>
        </div>

      </div>

      {/* Sub-footer */}
      <div className="bg-[#0A0A0A]/80 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mudanzas Miranda. Armada Argentina 584, Mendoza, AR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
