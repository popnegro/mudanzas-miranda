import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Truck,
  ShieldCheck,
  Star,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Home,
  Building,
  Users,
  Package,
  Warehouse,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Navigation,
  History,
  Target,
  Heart,
} from 'lucide-react';

// Data imports
import { destinations } from './data/destinations';
import { services, faqs, testimonials } from './data/staticData';
import { servicePages } from './data/seoPages';


// Component imports
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';
import RefactorDashboard from './components/RefactorDashboard';
import PhotoCarousel from './components/PhotoCarousel';

// Helper to map Lucide icon names to React components
const IconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Building,
  Users,
  Package,
  Warehouse,
  Truck,
};

export default function App() {
  const [activePage, setActivePage] = useState<string>(''); // empty string means main page, otherwise slug
  const [activeServiceTab, setActiveServiceTab] = useState<string>('residencial');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Sync state with URL pathname on mount & popstate (supporting SEO paths)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const htmlMatch = path.match(/\/mudanzas-mendoza\/(mudanzas-[a-z-]+)\.html/);
      const serviceMatch = path.match(/\/servicios\/([a-z-]+)\.html/);
      const simpleMatch = path.match(/^\/([a-z-]+)(\.html)?$/);

      const slugCandidate = htmlMatch
        ? htmlMatch[1]
        : serviceMatch
        ? serviceMatch[1]
        : simpleMatch
        ? simpleMatch[1]
        : '';

      const matchedDestination = destinations.find((d) => d.slug === slugCandidate);
      const matchedService = servicePages.find((s) => s.slug === slugCandidate);

      if (matchedDestination) {
        setActivePage(matchedDestination.slug);
      } else if (matchedService) {
        setActivePage(matchedService.slug);
      } else if (slugCandidate === 'nosotros') {
        setActivePage('nosotros');
      } else if (slugCandidate === 'test') {
        setActivePage('test');
      } else {
        setActivePage('');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Handle SPA routing navigation
  const handleNavigation = (slug: string) => {
    setActivePage(slug);
    let newPath = '/';
    if (slug) {
      if (destinations.some((d) => d.slug === slug)) {
        newPath = `/mudanzas-mendoza/${slug}.html`;
      } else if (servicePages.some((s) => s.slug === slug)) {
        newPath = `/servicios/${slug}.html`;
      } else if (slug === 'nosotros') {
        newPath = '/nosotros.html';
      } else if (slug === 'test') {
        newPath = '/test.html';
      }
    }
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group destinations by region for display
  const regions = {
    'Gran Mendoza': destinations.filter((d) => d.region === 'Gran Mendoza'),
    'Zona Este y Valle de Uco': destinations.filter((d) => d.region === 'Zona Este y Valle de Uco'),
    'Sur de Mendoza': destinations.filter((d) => d.region === 'Sur de Mendoza'),
  };

  // SEO details for active view
  const currentDestination = destinations.find((d) => d.slug === activePage);
  const currentService = servicePages.find((s) => s.slug === activePage);

  let pageTitle = 'Mudanzas en Mendoza - Profesionales y Seguras | Mudanzas Miranda';
  let pageDescription = 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Rápido, seguro y sin estrés. ¡Cotizá tu mudanza online en minutos!';
  let pageCanonical = 'https://www.mudanzasmiranda.com.ar';

  if (activePage === 'nosotros') {
    pageTitle = 'Sobre Nosotros - Historia, Misión y Valores | Mudanzas Miranda';
    pageDescription = 'Conocé la historia, misión y valores de Mudanzas Miranda. Más de 20 años de trayectoria brindando tranquilidad y confianza en mudanzas en Mendoza.';
    pageCanonical = 'https://www.mudanzasmiranda.com.ar/nosotros.html';
  } else if (activePage === 'test') {
    pageTitle = 'Ejercicio de Refactorización y Auditoría SEO | Mudanzas Miranda';
    pageDescription = 'Prueba interactiva del ejercicio de refactorización y auditoría SEO para Mudanzas Miranda Mendoza.';
    pageCanonical = 'https://www.mudanzasmiranda.com.ar/test.html';
  } else if (currentDestination) {
    pageTitle = currentDestination.title;
    pageDescription = currentDestination.description;
    pageCanonical = `https://www.mudanzasmiranda.com.ar/mudanzas-mendoza/${currentDestination.slug}.html`;
  } else if (currentService) {
    pageTitle = currentService.title;
    pageDescription = currentService.description;
    pageCanonical = `https://www.mudanzasmiranda.com.ar/servicios/${currentService.slug}.html`;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. Dynamic SEO & Meta Injector */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={pageCanonical}
        isLocalPage={!!currentDestination}
        destinationData={currentDestination}
        serviceData={currentService}
      />

      {/* 2. Premium Navigation Header */}
      <Header destinations={destinations} activePage={activePage} onNavigate={handleNavigation} />

      {/* Main Content Area with Route Switching */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!activePage ? (
            /* ==================== HOMEPAGE VIEW ==================== */
            <motion.div
              key="homepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
                {/* Subtle background overlay patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-12 items-center">
                    {/* Left Column: Heading, Subtext, Badges, CTAs */}
                    <div className="col-span-12 lg:col-span-6 space-y-6 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
                        <Truck className="w-4 h-4 animate-bounce" />
                        Mudanzas Miranda Mendoza
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                        Mudanzas en Mendoza
                      </h1>
                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Con <strong>Mudanzas Miranda</strong>, dejamos atrás el caos de las mudanzas.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a
                          href="#form"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-600/10 hover:shadow-amber-600/20 active:scale-[0.99] transition-all cursor-pointer text-base"
                        >
                          Cotizar mi Mudanza
                          <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                          href="https://wa.link/zn3zij"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
                        >
                          <Phone className="w-5 h-5 text-amber-500" />
                          Consultar por WhatsApp
                        </a>
                      </div>

                    </div>

                    {/* Right Column: Preloaded hero visual with aspect ratio and floating Google Rating popover */}
                    <div className="col-span-12 lg:col-span-6 relative flex justify-center">
                      <div className="relative w-full max-w-lg">
                        {/* Floating Stars Popover/Badge */}
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.6, delay: 0.2 }
                          }}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="absolute -top-6 left-4 sm:-left-6 bg-[#161616]/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-3.5 shadow-2xl shadow-black/80 z-20 flex items-center gap-3 cursor-pointer"
                        >
                          <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-white">4.9 / 5.0</span>
                              <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">186 opiniones de clientes en Google</p>
                          </div>
                        </motion.div>

                        {/* Image Frame */}
                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shadow-amber-500/5 hover:scale-[1.01] transition-transform duration-300">
                          <img
                            src="https://www.mudanzasmiranda.com.ar/img/camiones-mudanzas-miranda.webp"
                            alt="Camiones profesionales de Mudanzas Miranda estacionados listos para brindar servicio en Mendoza."
                            className="w-full h-full object-cover"
                            width="1200"
                            height="900"
                            fetchPriority="high"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trust & Key Features Section */}
              <section id="nosotros" className="py-20 bg-[#0D0D0D] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      Tu mudanza en manos de expertos
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Por eso, combinamos más de 20 años de experiencia, camiones equipados propios y un equipo profesional sumamente cuidadoso.
                    </p>
                  </div>

                  <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8">
                    {/* Benefit 1 */}
                    <div className="col-span-12 md:col-span-4 p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                          <Award className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Más de 20 Años de Trayectoria</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Décadas de servicio ininterrumpido en Mendoza nos convierten en el referente indiscutido de traslados y mudanzas de máxima confianza y calidad.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNavigation('nosotros')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 text-amber-500 hover:text-black rounded-xl transition-all duration-200 cursor-pointer self-start"
                      >
                        Conocé nuestra historia
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Benefit 2 */}
                    <div className="col-span-12 md:col-span-4 p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                          <Truck className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Flota de Camiones Propia</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Contamos con furgones habilitados y acondicionados con mantas especiales, sogas tensoras de cricket, y rampas para resguardar tus muebles en viaje.
                        </p>
                      </div>
                      <button
                        onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 text-amber-500 hover:text-black rounded-xl transition-all duration-200 cursor-pointer self-start"
                      >
                        Explorar servicios
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Benefit 3 */}
                    <div className="col-span-12 md:col-span-4 p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                          <ShieldCheck className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Seguro de Tránsito Completo</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Todas nuestras operaciones cuentan con póliza de seguro de carga vial, protegiendo tu patrimonio familiar desde que se carga hasta su colocación final.
                        </p>
                      </div>
                      <button
                        onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 text-amber-500 hover:text-black rounded-xl transition-all duration-200 cursor-pointer self-start"
                      >
                        Pedir cotización segura
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Services Section - Tabs */}
              <section id="servicios" className="py-20 bg-[#0A0A0A] text-white border-y border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      Soluciones a la medida de tu necesidad
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Seleccioná uno de nuestros servicios especializados para conocer en detalle cómo trabajamos cada modalidad.
                    </p>
                  </div>

                  {/* Service Tabs */}
                  <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8 items-start">
                    {/* Tab Buttons List */}
                    <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
                      {services.map((svc) => {
                        const IconComponent = IconMap[svc.icon] || Truck;
                        return (
                          <button
                            key={svc.id}
                            onClick={() => setActiveServiceTab(svc.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                              activeServiceTab === svc.id
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/10'
                                : 'bg-[#111111] hover:bg-[#151515] text-slate-300 hover:text-white border border-white/10'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                            <span>{svc.shortTitle}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Tab Panel Content */}
                    <div className="col-span-12 lg:col-span-8 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8">
                      <AnimatePresence mode="wait">
                        {services
                          .filter((svc) => svc.id === activeServiceTab)
                          .map((svc) => (
                            <motion.div
                              key={svc.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8 items-center"
                            >
                              <div className="col-span-12 md:col-span-6 space-y-4">
                                <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                                  {svc.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                  {svc.description}
                                </p>
                                <div className="pt-4">
                                  <a
                                    href="#form"
                                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-amber-600/5 hover:shadow-amber-600/10 active:scale-[0.98] transition-all cursor-pointer text-sm"
                                  >
                                    {svc.ctaText}
                                    <ArrowRight className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>

                              <div className="col-span-12 md:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                                <picture>
                                  <source srcSet={svc.image} type="image/webp" />
                                  <img
                                    src="/img/mudanzas-miranda-800.jpg"
                                    alt={svc.alt}
                                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                                    loading="lazy"
                                    width="800"
                                    height="600"
                                  />
                                </picture>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </section>

              {/* Destinations Section - Local SEO hub */}
              <section id="rutas" className="py-20 bg-[#0D0D0D] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      Cubrimos todo Mendoza con servicios locales
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Brindamos transportes y traslados puerta a puerta dentro de tu barrio, departamento o mudanzas nacionales de larga distancia.
                    </p>
                  </div>

                  {/* Regions Grid */}
                  <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8">
                    {Object.entries(regions).map(([regionName, list]) => (
                      <div
                        key={regionName}
                        className="col-span-12 md:col-span-4 bg-[#111111] border border-white/10 rounded-2xl p-6 hover:shadow-2xl hover:shadow-black/40 transition-all"
                      >
                        <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider border-b border-white/5 pb-3 mb-4">
                          {regionName}
                        </h3>
                        <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                          {list.map((dest) => (
                            <button
                              key={dest.slug}
                              onClick={() => handleNavigation(dest.slug)}
                              className="text-left text-sm py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-amber-500 hover:bg-white/5 font-medium transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <span>{dest.name}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Real Photo Gallery Showcase */}
              <PhotoCarousel />

              {/* Testimonials Review Section */}
              <section className="py-20 bg-[#0A0A0A]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                      Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-slate-400 text-sm">
                      La satisfacción de quienes ya confiaron en Mudanzas Miranda.
                    </p>
                  </div>

                  {/* Interactive Testimonial Slider */}
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                    <div className="absolute top-6 right-8 text-amber-500/10 text-7xl font-serif select-none pointer-events-none">
                      “
                    </div>

                    <div className="min-h-[180px] flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex text-amber-500">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                          "{testimonials[activeTestimonial].content}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                        <div>
                          <p className="font-bold text-white">{testimonials[activeTestimonial].author}</p>
                          <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role}</p>
                        </div>
                        <div className="text-xs text-slate-400">{testimonials[activeTestimonial].date}</div>
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() =>
                          setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
                        }
                        className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-slate-300 transition-colors cursor-pointer"
                        aria-label="Previous Testimonial"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
                        }
                        className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-slate-300 transition-colors cursor-pointer"
                        aria-label="Next Testimonial"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs Section */}
              <section id="faq" className="py-20 bg-[#0D0D0D]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                      Preguntas Frecuentes
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Resolvemos tus dudas más comunes para que planifiques tu mudanza con total tranquilidad.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-white/10 rounded-2xl overflow-hidden transition-all duration-200 bg-[#111111]"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                          className="w-full text-left py-5 px-6 flex items-center justify-between font-bold text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
                          aria-expanded={openFaq === faq.id}
                        >
                          <span className="text-base sm:text-lg">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                              openFaq === faq.id ? 'rotate-180 text-amber-500' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {openFaq === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-[#111111] border-t border-white/5"
                            >
                              <div className="p-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Quote Form Section */}
              <section id="form" className="py-20 bg-[#0A0A0A] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      Cotizá tu mudanza en 3 simples pasos
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Completá el formulario inteligente para recibir tu presupuesto adaptado sin compromisos.
                    </p>
                  </div>

                  <QuoteForm />
                </div>
              </section>
            </motion.div>
          ) : activePage === 'nosotros' ? (
            /* ==================== NOSOTROS (ABOUT US) VIEW ==================== */
            <motion.div
              key="nosotrospage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0A0A0A]"
            >
              {/* Breadcrumbs */}
              <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <button
                    onClick={() => handleNavigation('')}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Inicio
                  </button>
                  <span>/</span>
                  <span className="text-amber-500 font-medium font-semibold">Nosotros</span>
                </div>
              </div>

              {/* Nosotros Hero Section */}
              <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    Trayectoria y Compromiso Institucional
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">
                    Nuestra Identidad y Compromiso con Mendoza
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    Conocé la historia, la misión y los valores de <strong>Mudanzas Miranda</strong>. Más de 20 años de experiencia transformando los traslados en experiencias tranquilas, profesionales y seguras.
                  </p>
                </div>
              </section>

              {/* Institutional Sections: Historia, Misión, Valores */}
              <section className="py-20 bg-[#0D0D0D]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                  
                  {/* Grid for Historia & Misión */}
                  <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8 md:gap-12">
                    {/* HISTORIA */}
                    <div className="col-span-12 md:col-span-6 bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-amber-500/30 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500">
                        <History className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-white">Nuestra Historia</h2>
                      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                        <p>
                          Mudanzas Miranda nació hace más de dos décadas en la provincia de Mendoza como un emprendimiento familiar enfocado en brindar un servicio de transporte personalizado, cuidadoso y cercano.
                        </p>
                        <p>
                          Con esfuerzo y constancia, incorporamos camiones modernos equipados con sistemas de fijación avanzados y capacitamos a un equipo técnico especializado en el embalaje de objetos de alto valor y montajes complejos. Hoy, nos enorgullece ser la empresa referente elegida por miles de familias y oficinas mendocinas.
                        </p>
                      </div>
                    </div>

                    {/* MISIÓN */}
                    <div className="col-span-12 md:col-span-6 bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-amber-500/30 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500">
                        <Target className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-white">Nuestra Misión</h2>
                      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                        <p>
                          Nuestra misión fundamental es redefinir la experiencia de mudarse, eliminando el estrés y la incertidumbre que comúnmente acompañan a los traslados y transportes residenciales o corporativos.
                        </p>
                        <p>
                          Trabajamos incansablemente para proveer soluciones logísticas eficientes, transparentes y de altísima calidad, respaldadas por un equipo humano comprometido con el cuidado absoluto de cada objeto y la puntualidad inquebrantable en cada entrega.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* VALORES */}
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-8 hover:border-amber-500/30 transition-all duration-300">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-white">Nuestros Valores</h2>
                      <p className="text-slate-400 text-sm">
                        Los pilares éticos y operativos que guían cada uno de nuestros servicios diarios.
                      </p>
                    </div>

                    <div className="grid grid-cols-12 gap-4 sm:gap-6">
                      <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <h4 className="font-bold text-amber-500 text-base">Confianza y Respeto</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Tratamos tu hogar y tus pertenencias con la máxima delicadeza, reconociendo el valor sentimental de cada pieza.
                        </p>
                      </div>
                      <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <h4 className="font-bold text-amber-500 text-base">Seguridad Total</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Implementamos protocolos rigurosos de embalaje y transporte junto con coberturas viales completas de tránsito.
                        </p>
                      </div>
                      <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <h4 className="font-bold text-amber-500 text-base">Puntualidad Absoluta</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Planificamos detalladamente los horarios de carga y descarga para cumplir estrictamente con los tiempos pactados.
                        </p>
                      </div>
                      <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <h4 className="font-bold text-amber-500 text-base">Transparencia</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Ofrecemos presupuestos cerrados, honestos y claros desde el primer momento, sin sorpresas ni cargos ocultos.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Institutional Quote Form */}
              <section id="form" className="py-20 bg-[#0A0A0A] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                      ¿Listo para planificar tu mudanza?
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Completá el formulario inteligente para recibir tu presupuesto adaptado sin compromisos.
                    </p>
                  </div>

                  <QuoteForm />
                </div>
              </section>
            </motion.div>
          ) : activePage === 'test' ? (
            /* ==================== REFACTOR TEST VIEW ==================== */
            <motion.div
              key="testpage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RefactorDashboard onNavigate={handleNavigation} />
            </motion.div>
          ) : currentService ? (
            /* ==================== SPECIALIZED SERVICE VIEW ==================== */
            <motion.div
              key="servicepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0A0A0A]"
            >
              {/* Breadcrumbs */}
              <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <button
                    onClick={() => handleNavigation('')}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Inicio
                  </button>
                  <span>/</span>
                  <span className="text-amber-500 font-semibold">Servicios</span>
                  <span>/</span>
                  <span className="text-white truncate font-medium">{currentService.name}</span>
                </div>
              </div>

              {/* Service Hero */}
              <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Servicio Premium Miranda
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">
                    {currentService.heroHeadline}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    {currentService.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="#form"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-600/10 cursor-pointer"
                    >
                      Reservar / Cotizar Online
                    </a>
                    <a
                      href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20un%20servicio%20de%20${encodeURIComponent(
                        currentService.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-amber-500" />
                      Llamar un Asesor
                    </a>
                  </div>
                </div>
              </section>

              {/* Fleet Image Showcase Section - Isolated Stacking Context Break */}
              <section className="relative isolate py-8 sm:py-12 overflow-hidden bg-[#0A0A0A] border-b border-white/5">
                {/* Visual Ambient Glows */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[#0A0A0A] opacity-50 -z-20" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[1.8] sm:aspect-[2.4] lg:aspect-[3]">
                    <img
                      src="/img/camiones-mudanzas-miranda.webp"
                      alt="Flota de camiones modernos y equipados de Mudanzas Miranda"
                      className="w-full h-full object-cover object-center select-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay for extreme text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-10" />
                    
                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                      <div className="space-y-1 max-w-xl text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                          Nuestra Flota de Camiones
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                          Equipados para Traslados de Alta Exigencia
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Unidades habilitadas por la CNRT, acondicionadas con sistemas de amarre, mantas protectoras y seguimiento satelital constante.
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-start sm:self-auto">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          Unidades Listas en Ruta
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Service Details bento style */}
              <section className="py-16 bg-[#0D0D0D] border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                      ¿Qué incluye nuestro {currentService.name}?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      En Mudanzas Miranda diseñamos soluciones adaptadas a cada necesidad. Cada traslado incluye la máxima seguridad vial, atención personalizada, choferes habilitados y un seguro de tránsito completo para resguardar el valor de tus pertenencias.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {currentService.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 bg-[#161616] p-4 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-200 font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">Beneficios Exclusivos del Servicio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3">
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Seguridad Garantizada</h4>
                        <p className="text-xs text-slate-400">Pertenencias protegidas por mantas de lana suave industriales y fajas elásticas.</p>
                      </div>

                      <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3">
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit">
                          <Truck className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Flota Autorizada</h4>
                        <p className="text-xs text-slate-400">Unidades habilitadas por la CNRT, con seguimiento satelital de seguridad en ruta.</p>
                      </div>

                      <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3">
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Puntualidad Absoluta</h4>
                        <p className="text-xs text-slate-400">Llegamos puntualmente en la fecha coordinada para evitar demoras innecesarias.</p>
                      </div>
                    </div>
                  </div>

                  {/* Services internal cross-linking */}
                  <div className="border-t border-white/10 pt-8 space-y-3">
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Nuestros otros servicios</h4>
                    <div className="flex flex-wrap gap-2">
                      {servicePages
                        .filter((s) => s.slug !== activePage)
                        .map((s) => (
                          <button
                            key={s.slug}
                            onClick={() => handleNavigation(s.slug)}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-500 text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 transition-colors cursor-pointer"
                          >
                            {s.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Service Form Quote */}
              <section id="form" className="py-16 bg-[#0A0A0A] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                      Cotizá tu servicio de {currentService.name}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Completá el formulario inteligente. Tu selección de servicio ya se encuentra pre-marcada.
                    </p>
                  </div>

                  <QuoteForm initialService={currentService.slug} />
                </div>
              </section>
            </motion.div>
          ) : (
            /* ==================== LOCAL SEO DESTINATION VIEW ==================== */
            <motion.div
              key="localseopage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0A0A0A]"
            >
              {/* Breadcrumbs Navigation */}
              <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <button
                    onClick={() => handleNavigation('')}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Inicio
                  </button>
                  <span>/</span>
                  <span className="text-amber-500 font-semibold">Destinos</span>
                  <span>/</span>
                  <span className="text-white truncate font-medium">{currentDestination?.name}</span>
                </div>
              </div>

              {/* Local Hero Section */}
              <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    Cobertura en {currentDestination?.region}
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                    {currentDestination?.heroHeadline}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    {currentDestination?.heroSubheadline}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="#form"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-600/10 cursor-pointer"
                    >
                      Solicitar Presupuesto Especializado
                    </a>
                    <a
                      href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20una%20mudanza%20para%20${encodeURIComponent(
                        currentDestination?.name || ''
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-amber-500" />
                      Llamar Directo
                    </a>
                  </div>
                </div>
              </section>

              {/* Fleet Image Showcase Section - Isolated Stacking Context Break */}
              <section className="relative isolate py-8 sm:py-12 overflow-hidden bg-[#0A0A0A] border-b border-white/5">
                {/* Visual Ambient Glows */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[#0A0A0A] opacity-50 -z-20" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[1.8] sm:aspect-[2.4] lg:aspect-[3]">
                    <img
                      src="/img/camiones-mudanzas-miranda.webp"
                      alt="Flota de camiones modernos y equipados de Mudanzas Miranda"
                      className="w-full h-full object-cover object-center select-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay for extreme text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-10" />
                    
                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                      <div className="space-y-1 max-w-xl text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                          Nuestra Flota de Camiones
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                          Equipados para Traslados de Alta Exigencia
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Unidades habilitadas por la CNRT, acondicionadas con sistemas de amarre, mantas protectoras y seguimiento satelital constante.
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-start sm:self-auto">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          Unidades Listas en Ruta
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Local Editorial Content & Cross links */}
              <section className="py-16 bg-[#0D0D0D] border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  {/* Local Info block */}
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-white leading-snug">
                      Servicio de Mudanzas y Traslados de Confianza en {currentDestination?.name}
                    </h2>
                    <p className="text-base text-slate-300 leading-relaxed font-medium">
                      {currentDestination?.leadText}
                    </p>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      {currentDestination?.detailText}
                    </p>
                  </div>

                  {/* Localized Advantages list */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Por qué elegirnos para tu traslado en {currentDestination?.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-white">Operarios Locales</p>
                          <p className="text-xs text-slate-400">Choferes que conocen a la perfección cada calle, avenida y acceso rápido.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-white">Trámites y Permisos</p>
                          <p className="text-xs text-slate-400">Gestionamos autorizaciones de estacionamiento y mudanza en altura si aplica.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-white">Embalaje Adaptado</p>
                          <p className="text-xs text-slate-400">Protección con cartón y plástico burbuja reforzado en calles de tierra o ruta.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-white">Seguro Vehicular Total</p>
                          <p className="text-xs text-slate-400">Garantía vial total con cobertura activa de siniestros de tránsito.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regional Cross-linking - Important for SEO crawl index! */}
                  <div className="border-t border-white/10 pt-8 space-y-3">
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      Otras localidades en {currentDestination?.region}
                    </h4>
                    <p className="text-xs text-slate-400">También brindamos cobertura programada frecuente en:</p>
                    <div className="flex flex-wrap gap-2">
                      {destinations
                        .filter((d) => d.region === currentDestination?.region && d.slug !== activePage)
                        .map((d) => (
                          <button
                            key={d.slug}
                            onClick={() => handleNavigation(d.slug)}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-500 text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 transition-colors cursor-pointer"
                          >
                            Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Local Form Quote Section */}
              <section id="form" className="py-16 bg-[#0A0A0A] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                      Cotizá tu mudanza para {currentDestination?.name}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Completá el formulario interactivo. El destino se encuentra pre-configurado para tu comodidad.
                    </p>
                  </div>

                  <QuoteForm destinationName={currentDestination?.name} />
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Premium Footer */}
      <Footer destinations={destinations} onNavigate={handleNavigation} />

      {/* 4. Sticky Floating WhatsApp Widget - High CRO Booster */}
      <a
        href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda!%20Quisiera%20consultar%20por%20un%20servicio%20de%20mudanza%20para%20Mendoza.`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group ring-4 ring-green-500/10 animate-pulse"
        aria-label="Contactar a Mudanzas Miranda por WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-[2]" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-bold whitespace-nowrap">
          ¿En qué te ayudamos?
        </span>
      </a>
    </div>
  );
}
