import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageSquare } from 'lucide-react';

const services = [
  { name: 'Mudanzas Residenciales', path: '/servicios/mudanzas-residenciales' },
  { name: 'Mudanzas Corporativas', path: '/servicios/mudanzas-corporativas' },
  { name: 'Mudanzas Nacionales', path: '/servicios/mudanzas-nacionales' },
  { name: 'Mudanzas Locales', path: '/servicios/mudanzas-locales' },
  { name: 'Embalaje Profesional', path: '/servicios/embalaje-profesional' },
  { name: 'Guardamuebles', path: '/servicios/guardamuebles' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isMobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
      isActive ? 'text-amber-500 bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-[#0A0A0A] py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeAllMenus} aria-label="Ir a la página de inicio">
              <img
                className="h-10 w-auto"
                src="/img/logo-mudanzas-miranda-light.svg"
                alt="Logo de Mudanzas Miranda"
                width="200"
                height="40"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/nosotros" className={navLinkClass}>Nosotros</NavLink>
            
            <div className="relative" ref={servicesMenuRef}>
              <button
                onClick={() => setServicesMenuOpen(!isServicesMenuOpen)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1"
              >
                Servicios <ChevronDown className={`w-4 h-4 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-[#0D0D0D] border border-white/10 rounded-lg shadow-2xl p-2">
                  {services.map(service => (
                    <NavLink
                      key={service.path}
                      to={service.path}
                      onClick={closeAllMenus}
                      className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-amber-500 rounded-md"
                    >
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/cobertura" className={navLinkClass}>Cobertura</NavLink>
            <NavLink to="/destinos" className={navLinkClass}>Destinos</NavLink>
            <NavLink to="/preguntas-frecuentes" className={navLinkClass}>Preguntas</NavLink>
            <NavLink to="/contacto" className={navLinkClass}>Contacto</NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/cotizacion"
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-600/10"
            >
              <MessageSquare className="w-4 h-4" /> Cotizar Mudanza
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <nav className="flex flex-col gap-3 px-4 pt-4 pb-6">
            <NavLink to="/" onClick={closeAllMenus} className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/nosotros" onClick={closeAllMenus} className={navLinkClass}>Nosotros</NavLink>
            
            {/* Mobile Services Submenu */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!isMobileServicesOpen)}
                className={`${navLinkClass({ isActive: false })} w-full flex justify-between items-center`}
              >
                Servicios <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServicesOpen && (
                <div className="mt-2 pl-4 border-l-2 border-amber-500/30 flex flex-col gap-2">
                  <NavLink to="/servicios" onClick={closeAllMenus} className={`${navLinkClass({ isActive: false })} !px-2`}>Todos los Servicios</NavLink>
                  {services.map(service => (
                    <NavLink key={service.path} to={service.path} onClick={closeAllMenus} className={`${navLinkClass({ isActive: false })} !px-2`}>
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/cobertura" onClick={closeAllMenus} className={navLinkClass}>Cobertura</NavLink>
            <NavLink to="/destinos" onClick={closeAllMenus} className={navLinkClass}>Destinos</NavLink>
            <NavLink to="/preguntas-frecuentes" onClick={closeAllMenus} className={navLinkClass}>Preguntas</NavLink>
            <NavLink to="/contacto" onClick={closeAllMenus} className={navLinkClass}>Contacto</NavLink>
            <Link
              to="/cotizacion"
              onClick={closeAllMenus}
              className="mt-2 text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl"
            >
              Cotizar Mudanza
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
