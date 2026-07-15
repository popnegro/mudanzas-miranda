import React from 'react';
import {
  Award,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export function TrustFeatures() {
  return (
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
  );
}
