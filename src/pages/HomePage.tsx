import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, Locate, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';
import { services, faqs } from '../data/staticData';
import { HERO_CAROUSEL_SLIDES } from '../config/site';
import { servicePages } from '../data/seoPages';
import { trackEvent } from '../lib/analytics';
import { destinations } from '../data/destinations';
import FormSection from '../theme/components/FormSection';
import Hero from '../theme/components/Hero';
import Section from '../theme/components/Section';
import QuoteForm from '../components/QuoteForm';
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
      <Hero
        eyebrow={<><Truck className="w-4 h-4" aria-hidden="true" />Mudanzas en Mendoza</>}
        title="Mudanzas Miranda"
        description={<>Con <strong className="text-ink">Mudanzas Miranda</strong>, dejamos atrás el caos de las mudanzas.</>}
        primaryAction={
          <a href="#form" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-brand/20 hover:shadow-brand/30 active:scale-[0.99] transition-all cursor-pointer text-base">
            Cotizar mi Mudanza
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        }
        secondaryAction={
          <a
            href="https://wa.me/542615130910"
            onClick={() => trackEvent('whatsapp_click', { source: 'hero_cta' })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-line bg-surface hover:bg-background-soft text-ink font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
          >
            <Phone className="w-5 h-5 text-brand" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        }
        media={
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-6 left-4 sm:-left-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-surface/95 backdrop-blur-md border border-line rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-ink/10 flex items-center gap-3"
              >
                <div className="bg-brand/10 p-2 rounded-xl border border-brand/20">
                  <Star className="w-5 h-5 text-brand fill-brand" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-ink">4.9 / 5.0</span>
                    <div className="flex text-brand" aria-label="5 estrellas">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-brand text-brand" aria-hidden="true" />)}
                    </div>
                  </div>
                  <p className="text-[11px] text-ink-subtle font-medium">603 reseñas en Google</p>
                </div>
              </motion.div>
            </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
              <button onClick={(e) => { e.preventDefault(); previousHero(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border border-white/10 text-white p-2.5 rounded-full backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-all duration-300 z-10 hover:scale-105" aria-label="Imagen anterior">
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button onClick={(e) => { e.preventDefault(); nextHero(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border border-white/10 text-white p-2.5 rounded-full backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-all duration-300 z-10 hover:scale-105" aria-label="Siguiente imagen">
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                {HERO_CAROUSEL_SLIDES.map((_, idx) => (
                  <button key={idx} onClick={(e) => { e.preventDefault(); setHeroIndex(idx); }} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === heroIndex ? "bg-brand w-4" : "bg-white/50 hover:bg-white"}`} aria-label={`Ir a la imagen ${idx + 1}`} />
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Trust & Key Features Section */}
      <Section
        id="nosotros"
        tone="soft"
        title="Tu empresa de mudanzas en Mendoza"
        description="La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Por eso, combinamos más de 20 años de experiencia, camiones equipados propios y un equipo profesional sumamente cuidadoso."
      >

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
      </Section>

      {/* Interactive Services Section - Tabs */}
      <Section id="servicios" tone="surface" align="center" className="text-ink">
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
            <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 snap-x" role="tablist" aria-label="Servicios disponibles">
              {services.map((svc) => {
                const IconComponent = IconMap[svc.icon] || Truck;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveServiceTab(svc.id)}
                    role="tab"
                    aria-selected={activeServiceTab === svc.id}
                    aria-controls={`service-panel-${svc.id}`}
                    tabIndex={activeServiceTab === svc.id ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const current = services.findIndex((item) => item.id === svc.id);
                        const next = services[(current + 1) % services.length];
                        setActiveServiceTab(next.id);
                        requestAnimationFrame(() => document.getElementById(`service-tab-${next.id}`)?.focus());
                      }
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const current = services.findIndex((item) => item.id === svc.id);
                        const previous = services[(current - 1 + services.length) % services.length];
                        setActiveServiceTab(previous.id);
                        requestAnimationFrame(() => document.getElementById(`service-tab-${previous.id}`)?.focus());
                      }
                    }}
                    id={`service-tab-${svc.id}`}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal cursor-pointer snap-start ${activeServiceTab === svc.id
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
                      id={`service-panel-${svc.id}`}
                      role="tabpanel"
                      aria-labelledby={`service-tab-${svc.id}`}
                      tabIndex={0}
                      className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-8 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-2xl"
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
      </Section>

      {/* Destinations Section */}
      <Section id="rutas" tone="soft">
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
                    <div className="flex flex-col gap-1.5 max-h-[300px] lg:max-h-none overflow-y-auto lg:overflow-visible pr-2 lg:pr-0">
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
      </Section>

      {/* FAQs Section */}
      <Section id="faq" tone="soft" className="!border-b-0">
        <div className="max-w-4xl mx-auto">
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
      </Section>

      <FormSection
        id="form"
        title="Cotizá tu mudanza en 2 simples pasos"
        description="Completá el formulario y recibí la cotización gratis por Whatsapp"
      >
        <QuoteForm />
      </FormSection>
    </motion.div>
  );
}
