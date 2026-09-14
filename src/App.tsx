import React from 'react';
import { destinations } from './data/destinations';
import { getPageSeo, useAppRouting, useHeroCarousel, useHomePageState } from './app';
import { HERO_CAROUSEL_SLIDES } from './config/site';
import SEO from './components/SEO';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import DestinationPage from './pages/DestinationPage';

export default function App() {
  const {
    activeServiceTab, setActiveServiceTab,
    openFaq, setOpenFaq,
    activeTestimonial, setActiveTestimonial,
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
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white w-full overflow-x-hidden">
      <SEO title={pageTitle} description={pageDescription} canonicalUrl={pageCanonical} isLocalPage={!!currentDestination} destinationData={currentDestination} serviceData={currentService} />
      <main className="flex-grow min-h-[60vh]">
        {!activePage ? (
          <HomePage activeServiceTab={activeServiceTab} setActiveServiceTab={setActiveServiceTab} openFaq={openFaq} setOpenFaq={setOpenFaq} activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} destSearch={destSearch} setDestSearch={setDestSearch} filteredDestinations={filteredDestinations} regions={regions} handleNavigation={handleNavigation} heroIndex={heroIndex} setHeroIndex={setHeroIndex} previousHero={previousHero} nextHero={nextHero} />
        ) : activePage === 'nosotros' ? (
          <AboutPage handleNavigation={handleNavigation} />
        ) : currentService ? (
          <ServicePage currentService={currentService} activePage={activePage} handleNavigation={handleNavigation} />
        ) : currentDestination ? (
          <DestinationPage currentDestination={currentDestination} activePage={activePage} handleNavigation={handleNavigation} />
        ) : null}
      </main>
      <Footer destinations={destinations} onNavigate={handleNavigation} />
      <FloatingWhatsApp />
    </div>
  );
}
