import React from 'react';
import { motion } from 'motion/react';
import { Award, Truck, ShieldCheck, Phone, Clock, CheckCircle2, Home, Building, Users, Package, Warehouse } from 'lucide-react';
import { servicePages } from '../data/seoPages';
import FleetShowcase from '../components/FleetShowcase';
import FormSection from '../components/FormSection';

interface ServicePageProps { currentService: (typeof servicePages)[number]; activePage: string; handleNavigation: (slug: string) => void; }
export default function ServicePage({ currentService, activePage, handleNavigation }: ServicePageProps) {
  return (
    <motion.div
      key="servicepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0A0A0A]"
    >
      <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold">Inicio</a>
          <span>/</span>
          <span className="text-amber-500 font-semibold">Servicios</span>
          <span>/</span>
          <span className="text-white truncate font-medium">{currentService.name}</span>
        </div>
      </div>

      <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Servicios Mudanza Miranda
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">{currentService.heroHeadline}</h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">{currentService.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#form" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-600/10 cursor-pointer">Reservar / Cotizar Online</a>
            <a href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20un%20servicio%20de%20${encodeURIComponent(currentService.name)}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-pointer">
              <Phone className="w-5 h-5 text-amber-500" />Contactar por Whatsapp
            </a>
          </div>
        </div>
      </section>

      <FleetShowcase />

      <section className="py-16 bg-[#0D0D0D] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-5 sm:p-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">¿Qué incluye nuestro {currentService.name}?</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">En Mudanzas Miranda diseñamos soluciones adaptadas a cada necesidad. Cada traslado incluye la máxima seguridad vial, atención personalizada, choferes habilitados y un seguro de tránsito completo para resguardar el valor de tus pertenencias.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {currentService.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#161616] p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">Beneficios Exclusivos del Servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3"><div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><ShieldCheck className="w-6 h-6" /></div><h4 className="text-sm font-bold text-white uppercase tracking-wider">Seguridad Garantizada</h4><p className="text-xs text-slate-400">Pertenencias protegidas por mantas de lana suave industriales y fajas elásticas.</p></div>
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3"><div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><Truck className="w-6 h-6" /></div><h4 className="text-sm font-bold text-white uppercase tracking-wider">Flota Autorizada</h4><p className="text-xs text-slate-400">Unidades habilitadas por la CNRT, con seguimiento satelital de seguridad en ruta.</p></div>
              <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl space-y-3"><div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><Clock className="w-6 h-6" /></div><h4 className="text-sm font-bold text-white uppercase tracking-wider">Puntualidad Absoluta</h4><p className="text-xs text-slate-400">Llegamos puntualmente en la fecha coordinada para evitar demoras innecesarias.</p></div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Nuestros otros servicios</h4>
            <div className="flex flex-wrap gap-2">
              {servicePages.filter((s) => s.slug !== activePage).map((s) => (
                <a key={s.slug} href={`/servicios/${s.slug}.html`} onClick={(e) => { e.preventDefault(); handleNavigation(s.slug); }} className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-500 text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 transition-colors cursor-pointer block">{s.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FormSection title={`Cotizá tu servicio de ${currentService.name}`} initialService={currentService.slug} compact />
    </motion.div>
  );
}
