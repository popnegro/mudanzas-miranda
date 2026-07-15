import React from 'react';
import QuoteForm from '../QuoteForm';

export function Quote() {
  return (
    <section id="form" className="py-20 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Cotizá tu mudanza en 3 simples pasos
          </h2>
          <p className="text-slate-400 text-sm">
            Completá el formulario inteligente para recibir tu presupuesto adaptado sin compromisos.
          </p>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
