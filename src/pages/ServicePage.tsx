import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, ShieldCheck, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';
import { services, faqs, testimonials } from '../data/staticData';
import { servicePages } from '../data/seoPages';
import { destinations } from '../data/destinations';
import FormSection from '../components/FormSection';
import FleetShowcase from '../components/FleetShowcase';

const IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Warehouse, Truck };

interface ServicePageProps { currentService: (typeof servicePages)[number]; activePage: string; handleNavigation: (slug: string) => void; }
export default function ServicePage({ currentService, activePage, handleNavigation }: ServicePageProps) {
  return (
            <motion.div
              key="servicepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background"
            >
              {/* Breadcrumbs */}
              <div className="bg-background-soft border-b border-line text-ink-subtle py-3 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('');
                    }}
                    className="hover:text-ink transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Inicio
                  </a>
                  <span>/</span>
                  <span className="text-brand font-semibold">Servicios</span>
                  <span>/</span>
                  <span className="text-ink truncate font-medium">{currentService.name}</span>
                </div>
              </div>

              {/* Service Hero */}
              <section className="relative bg-surface text-ink overflow-hidden py-16 lg:py-20 border-b border-line">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F6F7F8_100%)] z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Servicios Mudanza Miranda
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight max-w-4xl mx-auto">
                    {currentService.heroHeadline}
                  </h1>

                  <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl mx-auto">
                    {currentService.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#form" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-brand/10 cursor-pointer transition-all">Reservar / Cotizar Online</a>
                    <a href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20un%20servicio%20de%20${encodeURIComponent(currentService.name)}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-line bg-surface hover:bg-background-soft text-ink font-semibold px-8 py-3.5 rounded-2xl cursor-pointer transition-all">
                      <Phone className="w-5 h-5 text-brand" />
                      Contactar por Whatsapp
                    </a>
                  </div>
                </div>
              </section>

              <FleetShowcase />

              {/* Service Details */}
              <section className="py-16 bg-background-soft border-b border-line">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="bg-surface border border-line rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm shadow-ink/5">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink leading-snug">¿Qué incluye nuestro {currentService.name}?</h2>
                    <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">En Mudanzas Miranda diseñamos soluciones adaptadas a cada necesidad. Cada traslado incluye la máxima seguridad vial, atención personalizada, choferes habilitados y un seguro de tránsito completo para resguardar el valor de tus pertenencias.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {currentService.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 bg-background-soft p-4 rounded-xl border border-line-soft">
                          <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-ink-tertiary font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-ink tracking-tight">Beneficios Exclusivos del Servicio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-surface border border-line p-6 rounded-2xl space-y-3 shadow-sm shadow-ink/5">
                        <div className="p-3 bg-brand/10 text-brand rounded-xl w-fit"><ShieldCheck className="w-6 h-6" /></div>
                        <h4 className="text-sm font-bold text-ink uppercase tracking-wider">Seguridad Garantizada</h4>
                        <p className="text-xs text-ink-subtle">Pertenencias protegidas por mantas de lana suave industriales y fajas elásticas.</p>
                      </div>
                      <div className="bg-surface border border-line p-6 rounded-2xl space-y-3 shadow-sm shadow-ink/5">
                        <div className="p-3 bg-brand/10 text-brand rounded-xl w-fit"><Truck className="w-6 h-6" /></div>
                        <h4 className="text-sm font-bold text-ink uppercase tracking-wider">Flota Autorizada</h4>
                        <p className="text-xs text-ink-subtle">Unidades habilitadas por la CNRT, con seguimiento satelital de seguridad en ruta.</p>
                      </div>
                      <div className="bg-surface border border-line p-6 rounded-2xl space-y-3 shadow-sm shadow-ink/5">
                        <div className="p-3 bg-brand/10 text-brand rounded-xl w-fit"><Clock className="w-6 h-6" /></div>
                        <h4 className="text-sm font-bold text-ink uppercase tracking-wider">Puntualidad Absoluta</h4>
                        <p className="text-xs text-ink-subtle">Llegamos puntualmente en la fecha coordinada para evitar demoras innecesarias.</p>
                      </div>
                    </div>
                  </div>

                  {/* Services internal cross-linking */}
                  <div className="border-t border-line pt-8 space-y-3">
                    <h4 className="text-xs font-bold text-brand uppercase tracking-wider">Nuestros otros servicios</h4>
                    <div className="flex flex-wrap gap-2">
                      {servicePages.filter((s) => s.slug !== activePage).map((s) => (
                        <a key={s.slug} href={`/servicios/${s.slug}.html`} onClick={(e) => { e.preventDefault(); handleNavigation(s.slug); }} className="bg-background-soft hover:bg-brand/10 text-ink-secondary hover:text-brand text-xs font-semibold py-1.5 px-3 rounded-lg border border-line transition-colors cursor-pointer block">{s.name}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <FormSection title={`Cotizá tu servicio de ${currentService.name}`} initialService={currentService.slug} compact />
            </motion.div>
  );
}
