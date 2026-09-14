import React, { useState } from 'react';
import { destinations } from './data/destinations';
import { getPageSeo, useAppRouting, useHeroCarousel } from './app';
import SEO from './components/SEO';
import Footer from './components/Footer';
import WhatsAppIcon from './components/WhatsAppIcon';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import DestinationPage from './pages/DestinationPage';

const HERO_CAROUSEL_SLIDES = [
  { id: 'flota', src: '/img/mudanzas-miranda-camiones.webp', alt: 'Camiones profesionales de Mudanzas Miranda estacionados listos para brindar servicio en Mendoza.' },
  { id: 'residencial', src: '/img/mudanzas-miranda-embalaje.webp', alt: 'Operarios realizando embalaje cuidadoso de muebles para una mudanza en un departamento de Mendoza.' },
  { id: 'equipo', src: '/img/mudanzas-miranda-residencial.webp', alt: 'Equipo de estibadores de Mudanzas Miranda sonrientes al realizar una mudanza profesional en Mendoza.' },
];

export default function App() {
  const [activeServiceTab, setActiveServiceTab] = useState('residencial');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [destSearch, setDestSearch] = useState('');

  const { heroIndex, setHeroIndex, previous: previousHero, next: nextHero } = useHeroCarousel(HERO_CAROUSEL_SLIDES.length);
  const { activePage, currentDestination, currentService, navigate: handleNavigation } = useAppRouting();

  const filteredDestinations = destinations.filter((d) =>
    !destSearch ||
    d.name.toLowerCase().includes(destSearch.toLowerCase()) ||
    d.region.toLowerCase().includes(destSearch.toLowerCase()),
  );

  const regions = {
    'Gran Mendoza': filteredDestinations.filter((d) => d.region === 'Gran Mendoza'),
    'Zona Este y Valle de Uco': filteredDestinations.filter((d) => d.region === 'Zona Este y Valle de Uco'),
    'Sur de Mendoza': filteredDestinations.filter((d) => d.region === 'Sur de Mendoza'),
  };

  const { title: pageTitle, description: pageDescription, canonicalUrl: pageCanonical } = getPageSeo(
    activePage,
    currentDestination,
    currentService,
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white w-full overflow-x-hidden">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={pageCanonical}
        isLocalPage={!!currentDestination}
        destinationData={currentDestination}
        serviceData={currentService}
      />

      <main className="flex-grow min-h-[60vh]">
        {!activePage ? (
          <HomePage
            activeServiceTab={activeServiceTab}
            setActiveServiceTab={setActiveServiceTab}
            openFaq={openFaq}
            setOpenFaq={setOpenFaq}
            activeTestimonial={activeTestimonial}
            setActiveTestimonial={setActiveTestimonial}
            destSearch={destSearch}
            setDestSearch={setDestSearch}
            filteredDestinations={filteredDestinations}
            regions={regions}
            handleNavigation={handleNavigation}
            heroIndex={heroIndex}
            setHeroIndex={setHeroIndex}
            previousHero={previousHero}
            nextHero={nextHero}
          />
        ) : activePage === 'nosotros' ? (
          <AboutPage handleNavigation={handleNavigation} />
        ) : currentService ? (
          <ServicePage
            currentService={currentService}
            activePage={activePage}
            handleNavigation={handleNavigation}
          />
        ) : currentDestination ? (
          <DestinationPage
            currentDestination={currentDestination}
            handleNavigation={handleNavigation}
          />
        ) : null}
      </main>

      <Footer destinations={destinations} onNavigate={handleNavigation} />

      <a
        href="https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda!%20Quisiera%20consultar%20por%20un%20servicio%20de%20mudanza%20para%20Mendoza."
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed z-40 flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-2xl ring-4 ring-green-500/10 transition-all hover:scale-110 hover:bg-[#20ba56] active:scale-95 sm:p-4"
        style={{
          right: 'max(1rem, env(safe-area-inset-right))',
          bottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
        aria-label="Contactar a Mudanzas Miranda por WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-7 sm:w-7" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-xs group-hover:ml-2 sm:inline-block">
          ¿En qué te ayudamos?
        </span>
      </a>
    </div>
  );
}
