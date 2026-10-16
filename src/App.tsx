import React, { lazy, Suspense } from 'react';
import { destinations } from './data/destinations';
import { servicePages } from './data/seoPages';
import { getPageSeo, useAppRouting, useHeroCarousel, useHomePageState } from './app';
import { HERO_CAROUSEL_SLIDES } from './config/site';
import SEO from './components/SEO';
import Header from './theme/components/Header';
import Footer from './theme/components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const DestinationPage = lazy(() => import('./pages/DestinationPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

const FOOTER_EXCLUDED_SERVICE_SLUGS = new Set([
  'mudanzas-combinadas',
  'logistica-integral',
]);

export default function App() {
  const {
    activeServiceTab, setActiveServiceTab,
    openFaq, setOpenFaq,
    destSearch, setDestSearch,
    filteredDestinations, regions,
  } = useHomePageState();
  const { heroIndex, setHeroIndex, previous: previousHero, next: nextHero } = useHeroCarousel(HERO_CAROUSEL_SLIDES.length);
  const { activePage, currentDestination, currentService, navigate: handleNavigation } = useAppRouting();

  const { title: pageTitle, description: pageDescription, canonicalUrl: pageCanonical, indexable: pageIndexable = true } = getPageSeo(
    activePage,
    currentDestination,
    currentService,
  );

  const handleHeaderCta = () => {
    const scrollToForm = () => {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (!activePage) {
      scrollToForm();
      return;
    }
    // Internal pages: go home first, then form (no #form on initial load)
    handleNavigation('');
    window.setTimeout(scrollToForm, 120);
  };

  return (
    <div className="min-h-screen bg-background text-ink-secondary flex flex-col font-sans selection:bg-brand selection:text-white w-full overflow-x-hidden">
      <SEO title={pageTitle} description={pageDescription} canonicalUrl={pageCanonical} indexable={pageIndexable} isLocalPage={!!currentDestination} destinationData={currentDestination} serviceData={currentService} />
      <Header
        logoSrc="/img/brand-dark.png"
        logoAlt="Mudanzas Miranda"
        homeHref="/"
        navItems={[
          { label: 'Servicios', href: '/servicios.html', active: activePage === 'servicios' || (!!activePage && !['nosotros', 'destinos'].includes(activePage) && !activePage.startsWith('mudanzas-')) },
          { label: 'Destinos', href: '/destinos.html', active: activePage === 'destinos' || activePage?.startsWith('mudanzas-') === true },
          { label: 'Nosotros', href: '/nosotros.html', active: activePage === 'nosotros' },
        ]}
        ctaLabel="Cotizar mudanza"
        ctaHref="/#form"
        onNavigate={handleNavigation}
        onCtaClick={handleHeaderCta}
      />
      <main className="grow min-h-[60vh] pt-17.5 sm:pt-19.5">
        {!activePage ? (
          <HomePage activeServiceTab={activeServiceTab} setActiveServiceTab={setActiveServiceTab} openFaq={openFaq} setOpenFaq={setOpenFaq} destSearch={destSearch} setDestSearch={setDestSearch} filteredDestinations={filteredDestinations} regions={regions} handleNavigation={handleNavigation} heroIndex={heroIndex} setHeroIndex={setHeroIndex} previousHero={previousHero} nextHero={nextHero} />
        ) : (
          <Suspense fallback={<div className="flex min-h-[30vh] items-start justify-center pt-10 text-ink-subtle" role="status" aria-live="polite">Cargando…</div>}>
            {activePage === 'nosotros' ? (
              <AboutPage handleNavigation={handleNavigation} />
            ) : activePage === 'destinos' ? (
              <DestinationsPage handleNavigation={handleNavigation} />
            ) : activePage === 'servicios' ? (
              <ServicesPage handleNavigation={handleNavigation} />
            ) : currentService ? (
              <ServicePage currentService={currentService} activePage={activePage} handleNavigation={handleNavigation} />
            ) : currentDestination ? (
              <DestinationPage currentDestination={currentDestination} activePage={activePage} handleNavigation={handleNavigation} />
            ) : null}
          </Suspense>
        )}
      </main>
      <Footer
        brandName="Mudanzas Miranda"
        description="Mudanzas Miranda es una empresa de mudanzas en Mendoza con más de 20 años de experiencia en mudanzas residenciales, comerciales y acarreos profesionales en Mendoza."
        contact={
          <address className="not-italic space-y-2 leading-relaxed">
            <a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer" className="block hover:text-brand">Armada Argentina 584, Mendoza, Argentina</a>
            <a href="tel:+5492615130910" className="block hover:text-brand">+54 9 261 513-0910</a>
            <a href="mailto:info@mudanzasmiranda.com.ar" className="block hover:text-brand">info@mudanzasmiranda.com.ar</a>
          </address>
        }
        columns={[
          {
            title: 'Nuestros Servicios',
            links: servicePages
              .filter((service) => !FOOTER_EXCLUDED_SERVICE_SLUGS.has(service.slug))
              .map((s) => ({
                label: s.heroHeadline.replace(' Premium', ''),
                href: s.slug,
              })),
          },
          {
            title: 'Lugares principales',
            links: destinations
              .filter((d) => ['mudanzas-ciudad-mendoza','mudanzas-godoy-cruz','mudanzas-guaymallen','mudanzas-las-heras','mudanzas-maipu','mudanzas-lujan-de-cuyo','mudanzas-valle-de-uco','mudanzas-zona-este'].includes(d.slug))
              .map((d) => ({ label: `Mudanzas ${d.name.replace(' de Mendoza', '').replace('Mendoza', '')}`, href: d.slug })),
          },
        ]}
        legal={<>© 2026 Mudanzas Miranda · Powered by <a href="https://wa.me/5492616706710">SmartWeb</a></>}
        socialLinks={[
          { label: 'Instagram', href: 'https://www.instagram.com/mudanzasmiranda/' },
          { label: 'Facebook', href: 'https://www.facebook.com/mudanzasmiranda4' },
        ]}
        onNavigate={(href) => {
          handleNavigation(href);
        }}
      />
      <FloatingWhatsApp />
    </div>
  );
}
