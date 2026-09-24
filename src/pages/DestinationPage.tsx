import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, ShieldCheck, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';
import { services, faqs, testimonials } from '../data/staticData';
import { servicePages } from '../data/seoPages';
import { destinations } from '../data/destinations';
import FormSection from '../components/FormSection';
import FleetShowcase from '../components/FleetShowcase';

const IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Warehouse, Truck };

interface DestinationPageProps { currentDestination: (typeof destinations)[number]; activePage: string; handleNavigation: (slug: string) => void; }
export default function DestinationPage({ currentDestination, activePage, handleNavigation }: DestinationPageProps) {
  return (
            <motion.div
              key="localseopage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background"
            >
              {/* Breadcrumbs Navigation */}
              <div className="bg-background-soft border-b border-line text-ink-subtle py-3 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="hover:text-ink transition-colors flex items-center gap-1 cursor-pointer font-semibold">Inicio</a>
                  <span>/</span>
                  <span className="text-brand font-semibold">Destinos</span>
                  <span>/</span>
                  <span className="text-ink truncate font-medium">{currentDestination?.name}</span>
                </div>
              </div>
              <section className="relative bg-surface text-ink overflow-hidden py-16 lg:py-20 border-b border-line">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F6F7F8_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full z-0 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider"><MapPin className="w-4 h-4" />Cobertura en {currentDestination?.region}</div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight">{currentDestination?.heroHeadline}</h1>
                  <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl mx-auto">{currentDestination?.heroSubheadline}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#form" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-brand/10 cursor-pointer transition-all">Solicitar Presupuesto</a>
                    <a href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20una%20mudanza%20para%20${encodeURIComponent(currentDestination?.name || '')}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-line bg-surface hover:bg-background-soft text-ink font-semibold px-8 py-3.5 rounded-2xl cursor-pointer transition-all"><Phone className="w-5 h-5 text-brand" />Llamar Directo</a>
                  </div>
                </div>
              </section>
              <FleetShowcase />
              <section className="py-16 bg-background-soft border-b border-line">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="bg-surface border border-line rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm shadow-ink/5">
                    <h2 className="text-2xl font-serif font-bold text-ink leading-snug">Servicio de Mudanzas y Traslados de Confianza en {currentDestination?.name}</h2>
                    <p className="text-base text-ink-secondary leading-relaxed font-medium">{currentDestination?.leadText}</p>
                    <p className="text-sm sm:text-base text-ink-subtle leading-relaxed">{currentDestination?.detailText}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-ink tracking-tight">Por qué elegirnos para tu traslado en {currentDestination?.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        ['Operarios Locales', 'Choferes que conocen a la perfección cada calle, avenida y acceso rápido.'],
                        ['Trámites y Permisos', 'Gestionamos autorizaciones de estacionamiento y mudanza en altura si aplica.'],
                        ['Embalaje Adaptado', 'Protección con cartón y plástico burbuja reforzado en calles de tierra o ruta.'],
                        ['Seguro Vehicular Total', 'Garantía vial total con cobertura activa de siniestros de tránsito.'],
                      ].map(([title, text]) => <div key={title} className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" /><div><p className="font-bold text-sm text-ink">{title}</p><p className="text-xs text-ink-subtle">{text}</p></div></div>)}
                    </div>
                  </div>
                  <div className="border-t border-line pt-8 space-y-3">
                    <h4 className="text-xs font-bold text-brand uppercase tracking-wider">Otras localidades en {currentDestination?.region}</h4>
                    <p className="text-xs text-ink-subtle">También brindamos cobertura programada frecuente en:</p>
                    <div className="flex flex-wrap gap-2">
                      {destinations.filter((d) => d.region === currentDestination?.region && d.slug !== activePage).map((d) => (
                        <a key={d.slug} href={`/mudanzas-mendoza/${d.slug}.html`} onClick={(e) => { e.preventDefault(); handleNavigation(d.slug); }} className="bg-background-soft hover:bg-brand/10 text-ink-secondary hover:text-brand text-xs font-semibold py-1.5 px-3 rounded-lg border border-line transition-colors cursor-pointer block">Mudanzas {d.name.replace(' de Mendoza', '').replace('Mendoza', '')}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <FormSection title={`Cotizá tu mudanza para ${currentDestination?.name}`} destinationName={currentDestination?.name} compact />
            </motion.div>
  );
}
