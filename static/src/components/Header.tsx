import { useEffect, useRef, useState } from 'react';
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
  const [openDesktopMenu, setOpenDesktopMenu] = useState<'services' | 'destinations' | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<'services' | 'destinations' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const sitemapDestinations = SITEMAP_DESTINATION_SLUGS
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter((destination): destination is Destination => Boolean(destination));

  const getUrlForSlug = (slug: string) => {
    if (!slug) return '/';
    if (destinations.some((destination) => destination.slug === slug)) return `/mudanzas-mendoza/${slug}.html`;
    if (servicePages.some((service) => service.slug === slug)) return `/servicios/${slug}.html`;
    if (slug === 'nosotros') return '/nosotros.html';
    if (slug === 'test') return '/test.html';
    return '/';
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDesktopMenu(null);
    setOpenMobileMenu(null);
  };

  const handleNavigation = (slug: string) => {
    closeAllMenus();
    onNavigate(slug);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAllMenus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeAllMenus();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    mobilePanelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
  }, [isMobileMenuOpen]);

  const scrollHomeSection = (id: string) => {
    if (activePage) {
      handleNavigation('');
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeAllMenus();
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/95 py-3 shadow-lg backdrop-blur-md' : 'bg-[#0A0A0A] py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" onClick={(event) => { event.preventDefault(); handleNavigation(''); }} className="flex-shrink-0">
            <img src="/img/brand-dark.png" alt="Mudanzas Miranda" className="block h-[38px] w-auto object-contain sm:h-[45.6px]" />
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === 'services'}
                onClick={() => setOpenDesktopMenu(openDesktopMenu === 'services' ? null : 'services')}
                className={`flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-semibold transition-colors ${servicePages.some((service) => service.slug === activePage) ? 'bg-white/5 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                Servicios
                <ChevronDown className={`h-4 w-4 transition-transform ${openDesktopMenu === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {openDesktopMenu === 'services' && (
                <div role="menu" className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-white/10 bg-[#0D0D0D] p-3 shadow-2xl">
                  {servicePages.map((service) => (
                    <a
                      key={service.slug}
                      role="menuitem"
                      href={getUrlForSlug(service.slug)}
                      onClick={(event) => { event.preventDefault(); handleNavigation(service.slug); }}
                      className={`block rounded-xl px-3 py-3 text-sm leading-snug transition-colors ${activePage === service.slug ? 'bg-white/5 font-semibold text-amber-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      {service.heroHeadline.replace(' Premium', '')}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={() => scrollHomeSection('servicios')}
                    className="mt-2 w-full rounded-xl border-t border-white/10 px-3 pt-3 text-sm font-semibold text-amber-500 hover:bg-amber-500/10"
                  >
                    Ver todos los servicios
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === 'destinations'}
                onClick={() => setOpenDesktopMenu(openDesktopMenu === 'destinations' ? null : 'destinations')}
                className={`flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-semibold transition-colors ${sitemapDestinations.some((destination) => destination.slug === activePage) ? 'bg-white/5 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                Destinos
                <ChevronDown className={`h-4 w-4 transition-transform ${openDesktopMenu === 'destinations' ? 'rotate-180' : ''}`} />
              </button>

              {openDesktopMenu === 'destinations' && (
                <div role="menu" className="absolute left-1/2 top-full mt-2 grid w-[560px] -translate-x-1/2 grid-cols-2 gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-[#0D0D0D] p-6 shadow-2xl">
                  <div className="col-span-2 mb-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Destinos en Mendoza</p>
                    <p className="mt-1 text-xs text-slate-500">Zonas prioritarias de atención y contenido local.</p>
                  </div>
                  {sitemapDestinations.map((destination) => (
                    <a
                      key={destination.slug}
                      role="menuitem"
                      href={getUrlForSlug(destination.slug)}
                      onClick={(event) => { event.preventDefault(); handleNavigation(destination.slug); }}
                      className={`flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-sm leading-snug transition-colors ${activePage === destination.slug ? 'font-semibold text-amber-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500/50" />
                      {destination.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/nosotros.html" onClick={(event) => { event.preventDefault(); handleNavigation('nosotros'); }} className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition-colors ${activePage === 'nosotros' ? 'bg-white/10 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
              Nosotros
            </a>
          </nav>

          <div className="hidden lg:flex items-center">
            <a href="#form" onClick={(event) => { if (activePage) { event.preventDefault(); scrollHomeSection('form'); } }} className="flex min-h-11 items-center gap-1.5 rounded-xl bg-amber-600 px-4 text-sm font-semibold text-white shadow-lg shadow-amber-600/10 transition-all hover:bg-amber-700 hover:scale-[1.02]">
              <MessageSquare className="h-4 w-4" />
              Cotizar Mudanza
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={closeAllMenus}
              className="fixed inset-0 top-0 z-30 bg-black lg:hidden"
            />
            <motion.div
              id="mobile-navigation"
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 z-40 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#0B0B0B] p-6 pt-24 shadow-2xl lg:hidden"
            >
              <nav className="flex flex-1 flex-col gap-1" aria-label="Navegación móvil">
                <a href="/" onClick={(event) => { event.preventDefault(); handleNavigation(''); }} className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold ${activePage === '' ? 'bg-white/5 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                  <Home className="h-4 w-4" /> Inicio
                </a>
                <a href="/nosotros.html" onClick={(event) => { event.preventDefault(); handleNavigation('nosotros'); }} className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold ${activePage === 'nosotros' ? 'bg-white/5 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                  <Info className="h-4 w-4" /> Nosotros
                </a>

                <div className="mt-2 border-t border-white/10 pt-2">
                  <button type="button" aria-expanded={openMobileMenu === 'services'} onClick={() => setOpenMobileMenu(openMobileMenu === 'services' ? null : 'services')} className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
                    <span className="flex items-center gap-3"><Compass className="h-4 w-4" /> Servicios</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMobileMenu === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileMenu === 'services' && (
                    <div className="ml-4 border-l border-white/10 pl-2">
                      {servicePages.map((service) => (
                        <a key={service.slug} href={getUrlForSlug(service.slug)} onClick={(event) => { event.preventDefault(); handleNavigation(service.slug); }} className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm ${activePage === service.slug ? 'bg-white/5 text-amber-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                          {service.name}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      ))}
                      <button type="button" onClick={() => scrollHomeSection('servicios')} className="min-h-11 w-full rounded-lg px-3 text-left text-sm font-semibold text-amber-500 hover:bg-amber-500/10">Ver todos los servicios</button>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-2">
                  <button type="button" aria-expanded={openMobileMenu === 'destinations'} onClick={() => setOpenMobileMenu(openMobileMenu === 'destinations' ? null : 'destinations')} className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
                    <span className="flex items-center gap-3"><Navigation className="h-4 w-4" /> Destinos</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMobileMenu === 'destinations' ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileMenu === 'destinations' && (
                    <div className="ml-4 grid grid-cols-2 gap-x-2 gap-y-1.5 border-l border-white/10 pl-2">
                      {sitemapDestinations.map((destination) => (
                        <a key={destination.slug} href={getUrlForSlug(destination.slug)} onClick={(event) => { event.preventDefault(); handleNavigation(destination.slug); }} className={`flex min-h-11 items-center rounded-lg px-3 text-xs ${activePage === destination.slug ? 'bg-white/5 text-amber-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                          {destination.name.replace('Mudanzas en ', '').replace(' de Mendoza', '').replace('Mendoza', '')}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <a href="#form" onClick={(event) => { if (activePage) { event.preventDefault(); scrollHomeSection('form'); } else { closeAllMenus(); } }} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 text-sm font-bold text-white hover:bg-amber-700">
                  <MessageSquare className="h-4 w-4" /> Cotizar mi Mudanza
                </a>
                <a href="https://wa.link/zn3zij" target="_blank" rel="noopener noreferrer" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white hover:bg-[#20ba56]">
                  <MessageSquare className="h-4 w-4" /> Chatear por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
