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
} from 'lucide-react';

// Data imports
import { destinations } from './data/destinations';
import { services, faqs, testimonials } from './data/staticData';

// Component imports
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';

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
      // Match path patterns like '/mudanzas-mendoza/mudanzas-ciudad-mendoza.html' or '/mudanzas-ciudad-mendoza'
      const htmlMatch = path.match(/\/mudanzas-mendoza\/(mudanzas-[a-z-]+)\.html/);
      const simpleMatch = path.match(/^\/([a-z-]+)$/);
      const slugCandidate = htmlMatch ? htmlMatch[1] : simpleMatch ? simpleMatch[1] : '';

      const matchedDestination = destinations.find((d) => d.slug === slugCandidate);
      if (matchedDestination) {
        setActivePage(matchedDestination.slug);
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
    const newPath = slug ? `/mudanzas-mendoza/${slug}.html` : '/';
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
  const pageTitle = currentDestination
    ? currentDestination.title
    : 'Mudanzas en Mendoza - Profesionales y Seguras | Mudanzas Miranda';
  const pageDescription = currentDestination
    ? currentDestination.description
    : 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Rápido, seguro y sin estrés. ¡Cotizá tu mudanza online en minutos!';
  const pageCanonical = currentDestination
    ? `https://www.mudanzasmiranda.com.ar/mudanzas-mendoza/${currentDestination.slug}.html`
    : 'https://www.mudanzasmiranda.com.ar';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. Dynamic SEO & Meta Injector */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={pageCanonical}
        isLocalPage={!!currentDestination}
        destinationData={currentDestination}
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading, Subtext, Badges, CTAs */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
                        <Truck className="w-4 h-4 animate-bounce" />
                        Mudanzas Profesionales en Mendoza
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                        Mudanzas en Mendoza, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                          Profesionales y Seguras
                        </span>
                      </h1>

                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Con <strong>Mudanzas Miranda</strong>, dejamos atrás el caos de las mudanzas. Nuestro equipo experto, flota de camiones propia y una planificación detallada garantizan un servicio rápido, eficiente y sumamente cuidadoso con tus pertenencias.
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

                      {/* Google Rating Badge */}
                      <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                        <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <span className="text-xs text-slate-300 ml-2">
                            <strong>4.9/5</strong> de 186 opiniones en Google
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Preloaded hero visual with aspect ratio */}
                    <div className="lg:col-span-6 relative flex justify-center">
                      <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shadow-amber-500/5 hover:scale-[1.01] transition-transform duration-300">
                        <picture>
                          <source
                            srcset="/img/mudanzas-miranda-600.webp 600w, /img/mudanzas-miranda-800.webp 800w, /img/mudanzas-miranda-1200.webp 1200w"
                            sizes="(max-width: 991px) 100vw, 50vw"
                            type="image/webp"
                          />
                          <img
                            src="/img/mudanzas-miranda-1200.jpg"
                            alt="Equipo de mudanzas profesionales de Mudanzas Miranda sonrientes cargando camión en un día soleado en Mendoza."
                            className="w-full h-full object-cover"
                            width="1200"
                            height="900"
                            fetchPriority="high"
                          />
                        </picture>
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
                      Tu mudanza en manos de expertos mendocinos
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Por eso, combinamos más de 20 años de experiencia, camiones equipados propios y un equipo profesional sumamente cuidadoso.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Benefit 1 */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                        <Award className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Más de 20 Años de Trayectoria</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Décadas de servicio ininterrumpido en Mendoza nos convierten en el referente indiscutido de fletes y mudanzas de máxima confianza y calidad.
                      </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                        <Truck className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Flota de Camiones Propia</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Contamos con furgones habilitados y acondicionados con mantas especiales, sogas tensoras de cricket, y rampas para resguardar tus muebles en viaje.
                      </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-[#111111] hover:bg-[#151515] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                        <ShieldCheck className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Seguro de Tránsito Completo</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Todas nuestras operaciones cuentan con póliza de seguro de carga vial, protegiendo tu patrimonio familiar desde que se carga hasta su colocación final.
                      </p>
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Tab Buttons List */}
                    <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
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
                    <div className="lg:col-span-8 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8">
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
                              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                            >
                              <div className="space-y-4">
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

                              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                                <picture>
                                  <source srcset={svc.image} type="image/webp" />
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
                      Brindamos fletes y traslados puerta a puerta dentro de tu barrio, departamento o mudanzas nacionales de larga distancia.
                    </p>
                  </div>

                  {/* Regions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(regions).map(([regionName, list]) => (
                      <div
                        key={regionName}
                        className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:shadow-2xl hover:shadow-black/40 transition-all"
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

              {/* Local Editorial Content & Cross links */}
              <section className="py-16 bg-[#0D0D0D] border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  {/* Local Info block */}
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-white leading-snug">
                      Servicio de Mudanzas y Fletes de Confianza en {currentDestination?.name}
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
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group ring-4 ring-green-500/10 animate-pulse"
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
