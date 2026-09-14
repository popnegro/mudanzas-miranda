import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, ShieldCheck, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';
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

interface DestinationPageProps {
  currentDestination: (typeof destinations)[number];
  handleNavigation: (slug: string) => void;
}

export default function DestinationPage({ currentDestination, handleNavigation }: DestinationPageProps) {
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
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('');
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Inicio
                  </a>
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

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
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
                      Solicitar Presupuesto
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

              <FleetShowcase />

              {/* Local Editorial Content & Cross links */}
              <section className="py-16 bg-[#0D0D0D] border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  {/* Local Info block */}
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-5 sm:p-10 space-y-6">
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
                          <a
                            key={d.slug}
                            href={`/mudanzas-mendoza/${d.slug}.html`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(d.slug);
                            }}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-500 text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 transition-colors cursor-pointer block"
                          >
                            Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              <FormSection
                title={`Cotizá tu mudanza para ${currentDestination?.name}`}
                subtitle="Completá el formulario interactivo. El destino se encuentra pre-configurado para tu comodidad."
                destinationName={currentDestination?.name}
                compact
              />
            </motion.div>
  );
}
