import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Home,
  Building,
  Users,
  Package,
  Warehouse,
  Truck,
} from 'lucide-react';
import { services } from '../../data/staticData';

const IconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Building,
  Users,
  Package,
  Warehouse,
  Truck,
};

export function Services() {
  const [activeServiceTab, setActiveServiceTab] = useState<string>(services[0]?.id || '');

  return (
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
  );
}
