import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, MessageSquare, Compass, Navigation, Home, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

const SITEMAP_DESTINATION_SLUGS = [
  'mudanzas-ciudad-mendoza',
  'mudanzas-godoy-cruz',
  'mudanzas-guaymallen',
  'mudanzas-las-heras',
  'mudanzas-maipu',
  'mudanzas-lujan-de-cuyo',
  'mudanzas-zona-este',
  'mudanzas-valle-de-uco',
];

export default function Header({ destinations, activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => setHeaderHeight(header.getBoundingClientRect().height);
    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const sitemapDestinations = SITEMAP_DESTINATION_SLUGS
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => Boolean(d));

  const getUrlForSlug = (slug: string) => {
    if (!slug) return '/';
    if (destinations.some((d) => d.slug === slug)) return `/mudanzas-mendoza/${slug}.html`;
    if (servicePages.some((s) => s.slug === slug)) return `/servicios/${slug}.html`;
    if (slug === 'nosotros') return '/nosotros.html';
    if (slug === 'test') return '/test.html';
    return '/';
  };

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
        : 'bg-[#0A0A0A] py-4 border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); handleLinkClick(''); }} className="flex-shrink-0 cursor-pointer block">
            <img src="/img/brand-dark.png" alt="Mudanzas Miranda" className="h-[38px] sm:h-[45.6px] w-auto object-contain block transition-transform duration-200 hover:scale-[1.02]" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative">
              <button
                onMouseEnter={() => { setIsServicesMenuOpen(true); setIsMegaMenuOpen(false); }}
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${servicePages.some((s) => s.slug === activePage) ? 'text-amber-500 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Servicios
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesMenuOpen && (
                <div onMouseLeave={() => setIsServicesMenuOpen(false)} className="absolute left-0 mt-2 w-64 bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <ul className="space-y-1">
                    {servicePages.map((s) => (
                      <li key={s.slug}>
                        <a href={getUrlForSlug(s.slug)} onClick={(e) => { e.preventDefault(); handleLinkClick(s.slug); }} className={`text-xs block w-full text-left p-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-all cursor-pointer ${activePage === s.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400'}`}>
                          {s.heroHeadline.replace(' Premium', '')}
                        </a>
                      </li>
                    ))}
                    <li className="border-t border-white/5 pt-1.5 mt-1.5">
                      <a href="#servicios" onClick={(e) => { e.preventDefault(); handleLinkClick(''); setTimeout(() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-xs font-semibold text-amber-500 hover:text-amber-400 block p-2 rounded-lg hover:bg-amber-500/10 transition-all text-center">
                        Ver todos los servicios
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onMouseEnter={() => { setIsMegaMenuOpen(true); setIsServicesMenuOpen(false); }}
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${sitemapDestinations.some((d) => d.slug === activePage) ? 'text-amber-500 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Destinos
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMegaMenuOpen && (
                <div onMouseLeave={() => setIsMegaMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-2">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">Destinos en Mendoza</p>
                    <p className="text-xs text-slate-500 mt-1">Zonas prioritarias de atención y contenido local.</p>
                  </div>
                  {sitemapDestinations.map((d) => (
                    <a key={d.slug} href={getUrlForSlug(d.slug)} onClick={(e) => { e.preventDefault(); handleLinkClick(d.slug); }} className={`text-sm flex items-center gap-2 py-1.5 hover:text-white transition-colors cursor-pointer ${activePage === d.slug ? 'text-amber-500 font-medium' : 'text-slate-400'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 flex-shrink-0" />
                      {d.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/nosotros.html" onClick={(e) => { e.preventDefault(); handleLinkClick('nosotros'); }} className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activePage === 'nosotros' ? 'text-amber-500 bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
              Nosotros
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#form" onClick={(e) => { if (activePage !== '') { e.preventDefault(); handleLinkClick(''); setTimeout(() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-600/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              Cotizar Mudanza
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden fixed inset-x-0 bottom-0 bg-black z-30" style={{ top: `${headerHeight}px` }} />

            <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="lg:hidden fixed right-0 bottom-0 w-full max-w-sm bg-[#0B0B0B]/95 backdrop-blur-xl z-40 flex flex-col p-6 overflow-y-auto border-l border-white/10 shadow-2xl" style={{ top: `${headerHeight}px` }}>
              <nav className="flex flex-col gap-1.5 flex-1">
                <a href="/" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLinkClick(''); }} className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${activePage === '' ? 'text-amber-500 bg-white/5 font-bold border-l-2 border-amber-500 pl-3.5' : 'text-slate-300 hover:bg-white/5'}`}>
                  <Home className="w-4 h-4 text-amber-500/80" />
                  <span>Inicio</span>
                </a>

                <a href="/nosotros.html" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLinkClick('nosotros'); }} className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${activePage === 'nosotros' ? 'text-amber-500 bg-white/5 font-bold border-l-2 border-amber-500 pl-3.5' : 'text-slate-300 hover:bg-white/5'}`}>
                  <Info className="w-4 h-4 text-amber-500/80" />
                  <span>Nosotros</span>
                </a>

                <div className="border-t border-white/5 pt-2 mt-1">
                  <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
                    <span className="flex items-center gap-2.5"><Compass className="w-4 h-4 text-amber-500/80" /><span>Nuestros Servicios</span></span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="flex flex-col gap-1 px-4 py-1.5 bg-white/[0.02] rounded-xl mt-1 border border-white/5">
                          {servicePages.map((s) => (
                            <a key={s.slug} href={getUrlForSlug(s.slug)} onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLinkClick(s.slug); }} className={`text-left text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between group ${activePage === s.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                              <span>{s.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/5 pt-2 mb-2">
                  <button onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)} className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
                    <span className="flex items-center gap-2.5"><Navigation className="w-4 h-4 text-amber-500/80" /><span>Nuestros Destinos</span></span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileDestinationsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileDestinationsOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 px-4 py-2 bg-white/[0.02] rounded-xl mt-1 border border-white/5">
                          {sitemapDestinations.map((d) => (
                            <a key={d.slug} href={getUrlForSlug(d.slug)} onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLinkClick(d.slug); }} className={`text-left text-xs py-2 px-2 rounded-lg transition-colors cursor-pointer block truncate ${activePage === d.slug ? 'text-amber-500 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                              {d.name.replace('Mudanzas en ', '').replace(' de Mendoza', '').replace('Mendoza', '')}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              <div className="mt-auto space-y-2.5 pt-4 border-t border-white/5">
                <a href="#form" onClick={(e) => { setIsMobileMenuOpen(false); if (activePage !== '') { e.preventDefault(); handleLinkClick(''); setTimeout(() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-600/10 cursor-pointer text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Cotizar mi Mudanza
                </a>
                <a href="https://wa.link/zn3zij" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/10 cursor-pointer text-sm">
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Chatear por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
