import React from 'react';
import {
  Truck,
  Star,
  ArrowRight,
  Phone,
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
      {/* Subtle background overlay patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtext, Badges, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4 animate-bounce" />
              Mudanzas en Mendoza
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
              Mudanzas Miranda
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Con <strong>Mudanzas Miranda</strong>, dejamos atrás el caos de las mudanzas. Nuestro equipo experto, flota de camiones propia y una planificación detallada garantizan un servicio rápido, eficiente y sumamente cuidadoso con tus pertenencias.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#form"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-600/10 hover:shadow-amber-600/20 active:scale-[0.99] transition-all cursor-pointer text-base"
              >
                Cotizar mi Mudanza
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.link/zn3zij"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
              >
                <Phone className="w-5 h-5 text-amber-500" />
                Consultar por WhatsApp
              </a>
            </div>

            {/* Google Rating Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-slate-300 ml-2">
                  <strong>4.9/5</strong> de 186 opiniones en Google
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Preloaded hero visual with aspect ratio */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shadow-amber-500/5 hover:scale-[1.01] transition-transform duration-300">
              <picture>
                <source
                  srcSet="/img/mudanzas-miranda-600.webp 600w, /img/mudanzas-miranda-800.webp 800w, /img/mudanzas-miranda-1200.webp 1200w"
                  sizes="(max-width: 991px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src="/img/mudanzas-miranda-1200.jpg"
                  alt="Equipo de mudanzas profesionales de Mudanzas Miranda sonrientes cargando camión en un día soleado en Mendoza."
                  className="w-full h-full object-cover"
                  width="1200"
                  height="900"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
