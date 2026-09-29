import React from 'react';
import { destinations } from './data/destinations';
import { getPageSeo, useAppRouting, useHeroCarousel, useHomePageState } from './app';
import { HERO_CAROUSEL_SLIDES } from './config/site';
import SEO from './components/SEO';
import Header from './theme/components/Header';
import Footer from './theme/components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import DestinationPage from './pages/DestinationPage';
import DestinationsPage from './pages/DestinationsPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  const {
    activeServiceTab, setActiveServiceTab,
    openFaq, setOpenFaq,
    destSearch, setDestSearch,
    filteredDestinations, regions,
  } = useHomePageState();
  const { heroIndex, setHeroIndex, previous: previousHero, next: nextHero } = useHeroCarousel(HERO_CAROUSEL_SLIDES.length);
  const { activePage, currentDestination, currentService, navigate: handleNavigation } = useAppRouting();

  const { title: pageTitle, description: pageDescription, canonicalUrl: pageCanonical } = getPageSeo(
    activePage,
    currentDestination,
    currentService,
  );

  return (
    <div className="min-h-screen bg-background text-ink-secondary flex flex-col font-sans selection:bg-brand selection:text-white w-full overflow-x-hidden">
      <SEO title={pageTitle} description={pageDescription} canonicalUrl={pageCanonical} isLocalPage={!!currentDestination} destinationData={currentDestination} serviceData={currentService} />
      <Header
        logoSrc="/img/brand-dark.png"
        logoAlt="Mudanzas Miranda"
        homeHref="/"
        navItems={[
          { label: 'Servicios', href: 'servicios', active: activePage === 'servicios' || (!!activePage && !['nosotros', 'destinos'].includes(activePage) && !activePage.startsWith('mudanzas-')) },
          { label: 'Destinos', href: 'destinos', active: activePage === 'destinos' || activePage?.startsWith('mudanzas-') === true },
          { label: 'Nosotros', href: 'nosotros', active: activePage === 'nosotros' },
        ]}
        ctaLabel="Cotizar mudanza"
        ctaHref="#form"
        onNavigate={handleNavigation}
      />
      <main className="flex-grow min-h-[60vh] pt-[70px] sm:pt-[78px]">
        {!activePage ? (
          <HomePage activeServiceTab={activeServiceTab} setActiveServiceTab={setActiveServiceTab} openFaq={openFaq} setOpenFaq={setOpenFaq} destSearch={destSearch} setDestSearch={setDestSearch} filteredDestinations={filteredDestinations} regions={regions} handleNavigation={handleNavigation} heroIndex={heroIndex} setHeroIndex={setHeroIndex} previousHero={previousHero} nextHero={nextHero} />
        ) : activePage === 'nosotros' ? (
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
      </main>
      <Footer
        brandName="Mudanzas Miranda"
        description="Mudanzas Miranda es una empresa de mudanzas en Mendoza con más de 20 años de experiencia en mudanzas residenciales, comerciales y acarreos profesionales en Mendoza y el país."
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
            links: servicePages.map((s) => ({
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
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <FloatingWhatsApp />
    </div>
  );
}
