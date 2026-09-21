import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  MessageSquare,
  Home,
  Info,
} from 'lucide-react';
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

export default function Header({
  destinations,
  activePage,
  onNavigate,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const getUrlForSlug = (slug: string) => {
    if (!slug) return '/';
    if (slug === 'servicios') return '/servicios/';
    if (slug === 'destinos') return '/destinos/';
    if (destinations.some((destination) => destination.slug === slug)) {
      return `/mudanzas-mendoza/${slug}.html`;
    }
    if (servicePages.some((service) => service.slug === slug)) {
      return `/servicios/${slug}.html`;
    }
    if (slug === 'nosotros') return '/nosotros.html';
    return '/';
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (slug: string) => {
    closeAllMenus();
    onNavigate(slug);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeAllMenus();
      }
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

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    mobilePanelRef.current
      ?.querySelector<HTMLElement>('a, button')
      ?.focus();
  }, [isMobileMenuOpen]);

  const scrollHomeSection = (id: string) => {
    if (activePage) {
      handleNavigation('');

      window.setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }, 100);

      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

    closeAllMenus();
  };

  return (
    <header
      ref={headerRef}
      className={`relative sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${isScrolled
        ? 'bg-[#0A0A0A]/95 py-3 shadow-lg backdrop-blur-md'
        : 'bg-[#0A0A0A] py-4'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ÚNICO LOGO DEL HEADER */}
          <a
            href="/"
            aria-label="Ir al inicio"
            onClick={(event) => {
              event.preventDefault();
              handleNavigation('');
            }}
            className="flex-shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <img
              src="/img/brand-dark.png"
              alt="Mudanzas Miranda"
              className="block h-[38px] w-auto object-contain sm:h-[45.6px]"
            />
          </a>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden items-center gap-3 lg:flex" aria-label="Navegación principal">
            {[
              { slug: '', label: 'Inicio', href: '/' },
              { slug: 'nosotros', label: 'Nosotros', href: '/nosotros.html' },
              { slug: 'servicios', label: 'Servicios', href: '/servicios/' },
              { slug: 'destinos', label: 'Destinos', href: '/destinos/' },
            ].map((item) => (
              <a
                key={item.slug || 'inicio'}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(item.slug);
                }}
                className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 ${
                  activePage === item.slug ? 'text-amber-500' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <div className="hidden items-center lg:flex">
            <a
              href="#form"
              onClick={(event) => {
                if (activePage) {
                  event.preventDefault();
                  scrollHomeSection('form');
                }
              }}
              className="flex min-h-11 items-center gap-1.5 rounded-xl bg-amber-600 px-4 text-sm font-semibold text-white shadow-lg shadow-amber-600/10 transition-all hover:scale-[1.02] hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
            >
              <MessageSquare className="h-4 w-4" />
              Cotizar Mudanza
            </a>
          </div>

          {/* HAMBURGUESA MOBILE */}
          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen((open) => !open)
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMobileMenuOpen
                ? 'Cerrar menú'
                : 'Abrir menú'
            }
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0B0B0B] px-4 pb-6 pt-4 shadow-2xl sm:px-6 lg:hidden"
          >
            <nav
              className="flex flex-col gap-1"
              aria-label="Navegación móvil"
            >
              <a href="/" onClick={(event) => { event.preventDefault(); handleNavigation(''); }}
                className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 ${activePage === '' ? 'bg-white/5 text-amber-500' : 'text-slate-300'}`}>
                Inicio
              </a>

              <a href="/nosotros.html" onClick={(event) => { event.preventDefault(); handleNavigation('nosotros'); }}
                className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 ${activePage === 'nosotros' ? 'bg-white/5 text-amber-500' : 'text-slate-300'}`}>
                Nosotros
              </a>

              <a href="/servicios/" onClick={(event) => { event.preventDefault(); handleNavigation('servicios'); }}
                className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 ${activePage === 'servicios' ? 'bg-white/5 text-amber-500' : 'text-slate-300'}`}>
                Servicios
              </a>

              <a href="/destinos/" onClick={(event) => { event.preventDefault(); handleNavigation('destinos'); }}
                className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 ${activePage === 'destinos' ? 'bg-white/5 text-amber-500' : 'text-slate-300'}`}>
                Destinos
              </a>
            </nav>

            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href="#form"
                onClick={(event) => {
                  if (activePage) {
                    event.preventDefault();
                    scrollHomeSection('form');
                  } else {
                    closeAllMenus();
                  }
                }}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 text-sm font-bold text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
              >
                <MessageSquare className="h-4 w-4" />
                Cotizar Mudanza
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}