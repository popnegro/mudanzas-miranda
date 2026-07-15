import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationsProps {
  regions: { [key: string]: Destination[] };
  handleNavigation: (slug: string) => void;
}

export function Destinations({ regions, handleNavigation }: DestinationsProps) {
  return (
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
  );
}
