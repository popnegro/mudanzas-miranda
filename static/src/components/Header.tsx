import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MessageSquare, Compass, ShieldAlert, Navigation } from 'lucide-react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({ destinations, activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // Detect scroll to style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Group destinations by region for the mega-menu
  const granMendoza = destinations.filter((d) => d.region === 'Gran Mendoza');
  const esteValleUco = destinations.filter((d) => d.region === 'Zona Este y Valle de Uco');
  const surMendoza = destinations.filter((d) => d.region === 'Sur de Mendoza');

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

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
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleLinkClick('')}>
            <div className="flex items-center">
              <img
                src="https://www.mudanzasmiranda.com.ar/img/brand-light.png"
                alt="Mudanzas Miranda"
                className="h-8 sm:h-9 w-auto object-contain block"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const sibling = target.nextElementSibling as HTMLElement;
                  if (sibling) {
                    sibling.classList.remove('hidden');
                    sibling.classList.add('flex');
                  }
                }}
              />
              <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight hidden items-center gap-1">
                Mudanzas <span className="text-amber-500">Miranda</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => {
                  setIsServicesMenuOpen(true);
                  setIsMegaMenuOpen(false);
                }}
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  servicePages.some((s) => s.slug === activePage)
                    ? 'text-amber-500 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Servicios
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesMenuOpen && (
                <div
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                  className="absolute left-0 mt-2 w-64 bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <ul className="space-y-1">
                    {servicePages.map((s) => (
                      <li key={s.slug}>
                        <button
                          onClick={() => handleLinkClick(s.slug)}
                          className={`text-xs block w-full text-left p-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-all cursor-pointer ${
                            activePage === s.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400'
                          }`}
                        >
                          {s.heroHeadline.replace(' Premium', '')}
                        </button>
                      </li>
                    ))}
                    <li className="border-t border-white/5 pt-1.5 mt-1.5">
                      <a
                        href="#servicios"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick('');
                          setTimeout(() => {
                            document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="text-xs font-semibold text-amber-500 hover:text-amber-400 block p-2 rounded-lg hover:bg-amber-500/10 transition-all text-center"
                      >
                        Ver todos los servicios
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mega Menu Dropdown (Destinations) */}
            <div className="relative">
              <button
                onMouseEnter={() => {
                  setIsMegaMenuOpen(true);
                  setIsServicesMenuOpen(false);
                }}
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  destinations.some((d) => d.slug === activePage)
                    ? 'text-amber-500 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Destinos
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Panel */}
              {isMegaMenuOpen && (
                <div
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {/* Gran Mendoza */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
                      Gran Mendoza
                    </h4>
                    <ul className="space-y-1.5">
                      {granMendoza.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-white transition-colors cursor-pointer ${
                              activePage === d.slug ? 'text-amber-500 font-medium' : 'text-slate-400'
                            }`}
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Zona Este y Valle de Uco */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
                      Valle de Uco y Este
                    </h4>
                    <ul className="space-y-1.5">
                      {esteValleUco.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-white transition-colors cursor-pointer ${
                              activePage === d.slug ? 'text-amber-500 font-medium' : 'text-slate-400'
                            }`}
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sur de Mendoza */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
                      Sur de Mendoza
                    </h4>
                    <ul className="space-y-1.5">
                      {surMendoza.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-white transition-colors cursor-pointer ${
                              activePage === d.slug ? 'text-amber-500 font-medium' : 'text-slate-400'
                            }`}
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('nosotros')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activePage === 'nosotros' ? 'text-amber-500 bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Nosotros
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#form"
              onClick={(e) => {
                if (activePage !== '') {
                  e.preventDefault();
                  handleLinkClick('');
                  setTimeout(() => {
                    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-600/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Cotizar Mudanza
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0A0A0A] z-40 flex flex-col p-6 animate-in slide-in-from-right duration-200 overflow-y-auto border-t border-white/10">
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLinkClick('nosotros');
              }}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold ${
                activePage === 'nosotros' ? 'text-amber-500 bg-white/5' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              Nosotros
            </button>
            <div className="border-t border-white/10 my-1 pt-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-4 block mb-2">
                Nuestros Servicios
              </span>
              <div className="flex flex-col gap-1 px-2">
                {servicePages.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => handleLinkClick(s.slug)}
                    className={`text-left text-sm py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      activePage === s.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.heroHeadline.replace(' Premium', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 my-1 pt-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-4 block mb-2">
                Nuestros Destinos
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 px-2">
                {destinations.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => handleLinkClick(d.slug)}
                    className={`text-left text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                      activePage === d.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
            <a
              href="https://wa.link/zn3zij"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/10 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
