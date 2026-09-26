import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, Locate, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';
import { services, faqs } from '../data/staticData';
import { HERO_CAROUSEL_SLIDES } from '../config/site';
import { servicePages } from '../data/seoPages';
import { trackEvent } from '../lib/analytics';
import { destinations } from '../data/destinations';
import FormSection from '../components/FormSection';
import FleetShowcase from '../components/FleetShowcase';

const IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Warehouse, Truck };

interface HomePageProps {
  activeServiceTab: string; setActiveServiceTab: React.Dispatch<React.SetStateAction<string>>;
  openFaq: string | null; setOpenFaq: React.Dispatch<React.SetStateAction<string | null>>;
  destSearch: string; setDestSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredDestinations: typeof destinations; regions: Record<string, typeof destinations>;
  handleNavigation: (slug: string) => void; heroIndex: number;
  setHeroIndex: React.Dispatch<React.SetStateAction<number>>; previousHero: () => void; nextHero: () => void;
}
export default function HomePage(props: HomePageProps) {
  const { activeServiceTab, setActiveServiceTab, openFaq, setOpenFaq, destSearch, setDestSearch, filteredDestinations, regions, handleNavigation, heroIndex, setHeroIndex, previousHero, nextHero } = props;
  return (
    <motion.div
      key="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="relative bg-surface text-ink overflow-hidden py-16 lg:py-24 border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F6F7F8_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-12 items-center">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                Mudanzas en Mendoza
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight">
                Mudanzas Miranda
              </h1>
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Con <strong className="text-ink">Mudanzas Miranda</strong>, dejamos atrás el caos de las mudanzas.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#form"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-brand/20 hover:shadow-brand/30 active:scale-[0.99] transition-all cursor-pointer text-base"
                >
                  Cotizar mi Mudanza
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/542615130910"
                  onClick={() => trackEvent('whatsapp_click', { source: 'hero_cta' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-line bg-surface hover:bg-background-soft text-ink font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
                >
                  <Phone className="w-5 h-5 text-brand" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Hero carousel */}
            <div className="col-span-12 lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                {/* Floating Google Rating badge */}
                <div className="absolute -top-6 left-4 sm:-left-6 z-20 group/rating">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="bg-surface/95 backdrop-blur-md border border-line rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-ink/10 flex items-center gap-3 cursor-pointer"
                  >
                    <div className="bg-brand/10 p-2 rounded-xl border border-brand/20">
                      <Star className="w-5 h-5 text-brand fill-brand" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-ink">4.9 / 5.0</span>
                        <div className="flex text-brand">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-brand text-brand" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-ink-subtle font-medium">603 reseñas en Google</p>
                    </div>
                  </motion.div>
                </div>

                {/* Image carousel */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg shadow-ink/10 border-4 border-line group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroIndex}
                      src={HERO_CAROUSEL_SLIDES[heroIndex].src}
                      alt={HERO_CAROUSEL_SLIDES[heroIndex].alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      width="1200"
                      height="900"
                      fetchPriority={heroIndex === 0 ? "high" : "low"}
                      loading={heroIndex === 0 ? "eager" : "lazy"}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <button
                    onClick={(e) => { e.preventDefault(); previousHero(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border border-white/10 text-white p-2.5 rounded-full backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-all duration-300 z-10 hover:scale-105"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => { e.preventDefault(); nextHero(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border border-white/10 text-white p-2.5 rounded-full backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-all duration-300 z-10 hover:scale-105"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    {HERO_CAROUSEL_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.preventDefault(); setHeroIndex(idx); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === heroIndex ? "bg-brand w-4" : "bg-white/50 hover:bg-white"}`}
                        aria-label={`Ir a la imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Key Features Section */}
      <section id="nosotros" className="py-20 bg-background-soft border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
              Tu empresa de mudanzas en Mendoza
            </h2>
            <p className="text-ink-secondary text-base leading-relaxed">
              La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Por eso, combinamos más de 20 años de experiencia, camiones equipados propios y un equipo profesional sumamente cuidadoso.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8">
            {/* Benefit 1 */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-line bg-surface hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full gap-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand">
                  <Award className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-ink">Más de 20 Años de Trayectoria</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Contamos con más de 20 años de trayectoria dedicada a brindar servicios de mudanzas y traslados en Mendoza.
                </p>
              </div>
              <button
                onClick={() => handleNavigation('nosotros')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-brand/10 hover:bg-brand border border-brand/20 hover:border-brand text-brand hover:text-white rounded-xl transition-all duration-200 cursor-pointer self-start"
              >
                Conocé nuestra historia
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Benefit 2 */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-line bg-surface hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full gap-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand">
                  <Truck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-ink">Flota de Camiones Propia</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Contamos con furgones habilitados y acondicionados con mantas especiales para proteger los muebles y rampas para resguardar tus muebles en viaje.
                </p>
              </div>
              <button
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-brand/10 hover:bg-brand border border-brand/20 hover:border-brand text-brand hover:text-white rounded-xl transition-all duration-200 cursor-pointer self-start"
              >
                Explorar servicios
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Benefit 3 */}
            <div className="col-span-12 sm:col-span-12 lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-line bg-surface hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full gap-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand">
                  <Locate className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-ink">Mudanzas por Gran Mendoza</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Servicio especializado de traslados en todo el Gran Mendoza, conectando tus mudanzas de forma rápida y segura entre departamentos clave de la región.
                </p>
              </div>
              <button
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-brand/10 hover:bg-brand border border-brand/20 hover:border-brand text-brand hover:text-white rounded-xl transition-all duration-200 cursor-pointer self-start"
              >
                Pedir cotización gratis
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section - Tabs */}
      <section id="servicios" className="py-20 bg-surface text-ink border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
              Soluciones a la medida de tu necesidad
            </h2>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Seleccioná uno de nuestros servicios especializados para conocer en detalle cómo trabajamos cada modalidad.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8 items-start">
            {/* Tab Buttons List */}
            <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
              {services.map((svc) => {
                const IconComponent = IconMap[svc.icon] || Truck;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveServiceTab(svc.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal cursor-pointer ${activeServiceTab === svc.id
                      ? 'bg-brand text-white shadow-md shadow-brand/20'
                      : 'bg-surface hover:bg-background-soft text-ink-secondary hover:text-ink border border-line'
                      }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span>{svc.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel Content */}
            <div className="col-span-12 lg:col-span-8 bg-surface border border-line rounded-3xl p-5 sm:p-8 shadow-sm shadow-ink/5">
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
                        <h3 className="text-2xl font-serif font-bold text-ink leading-snug">
                          {svc.title}
                        </h3>
                        <p className="text-sm text-ink-secondary leading-relaxed">
                          {svc.description}
                        </p>
                        <div className="pt-4">
                          <a
                            href="#form"
                            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-brand/10 hover:shadow-brand/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
                          >
                            {svc.ctaText}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden bg-background-soft border border-line">
                        <img
                          src={svc.image}
                          alt={svc.alt}
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                          width="800"
                          height="600"
                        />
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="rutas" className="py-20 bg-background-soft border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
              Cubrimos todo Mendoza con servicios locales
            </h2>
            <p className="text-ink-secondary text-base leading-relaxed">
              Brindamos transportes y traslados puerta a puerta dentro de tu barrio, departamento o mudanzas nacionales de larga distancia.
            </p>
          </div>

          {/* Destinations Search Bar */}
          <div className="max-w-md mx-auto mb-12 relative z-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle" />
              <input
                type="text"
                placeholder="Buscá tu departamento o localidad (ej: Godoy Cruz, Maipú)..."
                value={destSearch}
                onChange={(e) => setDestSearch(e.target.value)}
                className="w-full bg-surface border border-line rounded-2xl pl-12 pr-10 py-3.5 text-sm text-ink placeholder-ink-subtle/60 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm shadow-ink/5"
              />
              {destSearch && (
                <button
                  onClick={() => setDestSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink p-1 rounded-full hover:bg-background-soft transition-all"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {filteredDestinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-surface border border-line rounded-3xl max-w-2xl mx-auto px-6 space-y-4 shadow-sm shadow-ink/5"
            >
              <MapPin className="w-12 h-12 text-brand mx-auto animate-pulse" />
              <h3 className="text-lg font-bold text-ink">¡Sí, cubrimos tu zona en Mendoza!</h3>
              <p className="text-sm text-ink-secondary leading-relaxed max-w-md mx-auto">
                Aunque "{destSearch}" no esté en la lista de páginas locales destacadas, brindamos traslados y mudanzas profesionales a cualquier punto de la provincia y el país.
              </p>
              <div>
                <a
                  href="#form"
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-brand/10"
                >
                  Cotizar mi mudanza ahora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8">
              {Object.entries(regions).map(([regionName, list]) => {
                if (list.length === 0) return null;
                return (
                  <div
                    key={regionName}
                    className="col-span-12 sm:col-span-6 md:col-span-4 bg-surface border border-line rounded-2xl p-5 sm:p-6 hover:shadow-md hover:shadow-ink/5 transition-all"
                  >
                    <h3 className="text-lg font-bold text-brand uppercase tracking-wider border-b border-line-soft pb-3 mb-4">
                      {regionName} ({list.length})
                    </h3>
                    <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-2">
                      {list.map((dest) => (
                        <a
                          key={dest.slug}
                          href={`/mudanzas-mendoza/${dest.slug}.html`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(dest.slug);
                          }}
                          className="text-left text-sm py-1.5 px-2.5 rounded-lg text-ink-secondary hover:text-brand hover:bg-background-soft font-medium transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span>{dest.name}</span>
                          <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-brand opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-20 bg-background-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-serif font-bold text-ink tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-ink-secondary text-sm">
              Resolvemos tus dudas más comunes para que planifiques tu mudanza con total tranquilidad.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-line rounded-2xl overflow-hidden transition-all duration-200 bg-surface"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between font-bold text-ink hover:bg-background-soft transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={openFaq === faq.id}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-subtle transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === faq.id ? 'rotate-180 text-brand' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-surface border-t border-line-soft"
                    >
                      <div className="p-6 text-sm sm:text-base text-ink-secondary leading-relaxed">
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

      <FormSection
        title="Cotizá tu mudanza en 2 simples pasos"
        subtitle="Completá el formulario y recibí la cotización gratis por Whatsapp"
      />
    </motion.div>
  );
}
