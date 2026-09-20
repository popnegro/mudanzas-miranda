import { motion } from 'motion/react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { services, faqs, testimonials } from '../data/staticData';
import { servicePages } from '../data/seoPages';
import { destinations } from '../data/destinations';
import FormSection from '../components/FormSection';
import FleetShowcase from '../components/FleetShowcase';

const IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Warehouse, Truck };
const HERO_CAROUSEL_SLIDES = [
  { id: 'flota', src: '/img/mudanzas-miranda-camiones.webp', alt: 'Camiones profesionales de Mudanzas Miranda estacionados listos para brindar servicio en Mendoza.' },
  { id: 'residencial', src: '/img/mudanzas-miranda-embalaje.webp', alt: 'Operarios realizando embalaje cuidadoso de muebles para una mudanza en un departamento de Mendoza.' },
  { id: 'equipo', src: '/img/mudanzas-miranda-residencial.webp', alt: 'Equipo de estibadores de Mudanzas Miranda sonrientes al realizar una mudanza profesional en Mendoza.' },
];

interface DestinationPageProps { currentDestination: (typeof destinations)[number]; activePage: string; handleNavigation: (slug: string) => void; }

export default function DestinationPage({ currentDestination, activePage, handleNavigation }: DestinationPageProps) {
  return (
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
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold">Inicio</a>
          <span>/</span>
          <span className="text-amber-500 font-semibold">Destinos</span>
          <span>/</span>
          <span className="text-white truncate font-medium">{currentDestination?.name}</span>
        </div>
      </div>

      {/* Destination Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            Cobertura en {currentDestination?.region}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">{currentDestination?.heroHeadline}</h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">{currentDestination?.heroSubheadline}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#form" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-600/10 cursor-pointer">Solicitar Presupuesto</a>
            <a href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20una%20mudanza%20para%20${encodeURIComponent(currentDestination?.name || '')}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-pointer">
              <Phone className="w-5 h-5 text-amber-500" />
              Llamar Directo
            </a>
          </div>
        </div>
      </section>

      <FleetShowcase />

      {/* Destination details — aligned with the Services content/card system */}
      <section className="bg-white text-slate-700 py-14 sm:py-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-7 sm:px-9 sm:py-9 lg:px-10 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-snug text-slate-800">
              Servicio de Mudanzas y Traslados de Confianza en {currentDestination?.name}
            </h2>
            <div className="mt-6 space-y-5">
              <p className="text-sm sm:text-base font-medium leading-7 text-slate-600">
                {currentDestination?.leadText}
              </p>
              <p className="text-sm sm:text-base leading-7 text-slate-500">
                {currentDestination?.detailText}
              </p>
            </div>
          </article>

          <section aria-labelledby="destination-services-title" className="space-y-5">
            <div>
              <h3 id="destination-services-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                Servicios disponibles en {currentDestination?.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Elegí la solución según el tipo de traslado que necesitás realizar en esta localidad.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {servicePages.map((service) => (
                <a
                  key={service.slug}
                  href={`/servicios/${service.slug}.html`}
                  onClick={(e) => { e.preventDefault(); handleNavigation(service.slug); }}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-orange-800">{service.name}</h4>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-600" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{service.heroSubheadline}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-200 pt-7 sm:pt-8 space-y-3" aria-labelledby="destination-related-title">
            <h4 id="destination-related-title" className="text-xs font-bold uppercase tracking-widest text-orange-700">
              Otras localidades en {currentDestination?.region}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              También brindamos cobertura programada frecuente en:
            </p>
            <div className="flex flex-wrap gap-2">
              {destinations
                .filter((d) => d.region === currentDestination?.region && d.slug !== activePage)
                .map((d) => (
                  <a
                    key={d.slug}
                    href={`/mudanzas-mendoza/${d.slug}.html`}
                    onClick={(e) => { e.preventDefault(); handleNavigation(d.slug); }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-orange-700 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-800 cursor-pointer"
                  >
                    Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}
                  </a>
                ))}
            </div>
          </section>
        </div>
      </section>

      <FormSection title={`Cotizá tu mudanza para ${currentDestination?.name}`} destinationName={currentDestination?.name} compact />
    </motion.div>
  );
}
