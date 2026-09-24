import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from '../types';

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

/** True when activePage is a known service detail slug (not listing/home/about). */
function isServiceDetailSlug(activePage: string): boolean {
  if (!activePage || activePage === 'servicios' || activePage === 'destinos' || activePage === 'nosotros') {
    return false;
  }
  if (activePage.startsWith('mudanzas-')) return false;
  return true;
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
  };

  const scrollHomeSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (activePage) {
      onNavigate('');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (slug: string) => activePage === slug;
  const servicesActive = isActive('servicios') || isServiceDetailSlug(activePage);
  const destinosActive = isActive('destinos') || activePage.startsWith('mudanzas-');

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b border-line/80 bg-surface/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-md shadow-ink/5' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigateTo('');
            }}
            className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            aria-label="Ir al inicio de Mudanzas Miranda"
          >
            <img
              src="/img/brand-dark.png"
              alt="Mudanzas Miranda"
              className="block h-[38px] w-auto object-contain sm:h-[45.6px]"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            <button
              type="button"
              onClick={() => navigateTo('servicios')}
              className={`nav-link-desktop ${servicesActive ? 'nav-link-desktop--active' : ''}`}
            >
              Servicios
            </button>
            <button
              type="button"
              onClick={() => navigateTo('destinos')}
              className={`nav-link-desktop ${destinosActive ? 'nav-link-desktop--active' : ''}`}
            >
              Destinos
            </button>
            <button
              type="button"
              onClick={() => navigateTo('nosotros')}
              className={`nav-link-desktop ${isActive('nosotros') ? 'nav-link-desktop--active' : ''}`}
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
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Cotizar mudanza
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ink-secondary transition-colors hover:bg-background-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 lg:hidden"
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
            className="absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface px-4 pb-6 pt-4 shadow-xl sm:px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              <button type="button" onClick={() => navigateTo('')} className="nav-link-mobile text-left">
                Inicio
              </button>
              <button type="button" onClick={() => navigateTo('servicios')} className="nav-link-mobile text-left">
                Servicios
              </button>
              <button type="button" onClick={() => navigateTo('destinos')} className="nav-link-mobile text-left">
                Destinos
              </button>
              <button type="button" onClick={() => navigateTo('nosotros')} className="nav-link-mobile text-left">
                Nosotros
              </button>
            </nav>

            <div className="mt-4 border-t border-line pt-4">
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
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Cotizar mudanza
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
