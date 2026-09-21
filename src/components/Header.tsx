import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageSquare, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from '../types';
import { servicePages } from '../data/seoPages';

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navigateTo = (slug: string) => {
    onNavigate(slug);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollHomeSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (activePage) {
      navigateTo('');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-md' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigateTo('')}
            className="flex shrink-0 items-center gap-3 rounded-xl text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
            aria-label="Ir al inicio de Mudanzas Miranda"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md sm:h-11 sm:w-11">
              <Truck className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Mudanzas Miranda
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                Mudanzas profesionales en Mendoza
              </span>
            </span>
            <span className="block text-base font-extrabold tracking-tight text-slate-900 sm:hidden">
              Mudanzas Miranda
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            <button onClick={() => scrollHomeSection('servicios')} className="nav-link-desktop">
              Servicios
            </button>
            <button
              onClick={() => navigateTo('destinos')}
              className={`nav-link-desktop ${activePage === 'destinos' ? 'text-emerald-600 bg-emerald-50' : ''}`}
            >
              Destinos
            </button>
            <button
              onClick={() => navigateTo('nosotros')}
              className={`nav-link-desktop ${activePage === 'nosotros' ? 'text-emerald-600 bg-emerald-50' : ''}`}
            >
              Nosotros
            </button>
          </nav>

          <div className="hidden items-center lg:flex">
            <a
              href="#form"
              onClick={(event) => {
                if (activePage) {
                  event.preventDefault();
                  scrollHomeSection('form');
                }
              }}
              className="header-cta-button"
            >
              <MessageSquare className="h-4 w-4" />
              Cotizar mudanza
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-4 shadow-xl sm:px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              <button onClick={() => navigateTo('')} className="nav-link-mobile text-left">
                Inicio
              </button>
              <button onClick={() => scrollHomeSection('servicios')} className="nav-link-mobile text-left">
                Servicios
              </button>
              <button onClick={() => navigateTo('destinos')} className="nav-link-mobile text-left">
                Destinos
              </button>
              <button onClick={() => navigateTo('nosotros')} className="nav-link-mobile text-left">
                Nosotros
              </button>
            </nav>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <a
                href="#form"
                onClick={(event) => {
                  if (activePage) {
                    event.preventDefault();
                    scrollHomeSection('form');
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="header-cta-button flex w-full justify-center"
              >
                <MessageSquare className="h-4 w-4" />
                Cotizar mudanza
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
