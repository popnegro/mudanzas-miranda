import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Truck } from 'lucide-react';
import PageLayout from './PageLayout';

const LocalMoves: React.FC = () => {
  return (
    <PageLayout
      title="Mudanzas Locales"
      description="Servicio de mudanzas y fletes locales en Mendoza. Soluciones rápidas y seguras para traslados dentro de la ciudad y alrededores."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Mudanzas Locales</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              La solución más rápida y eficiente para moverte dentro de tu ciudad.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Agilidad y conocimiento a tu servicio</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Para mudanzas dentro de Mendoza, la agilidad y el conocimiento de la zona son clave. Nuestro servicio de mudanzas locales está diseñado para ofrecerte un traslado rápido, seguro y sin complicaciones.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Conocemos cada barrio y optimizamos las rutas para evitar demoras. Ya sea que te mudes a un departamento en el centro o a una casa en las afueras, nuestro equipo te brinda una solución a medida para que tu única preocupación sea disfrutar de tu nuevo espacio.
              </p>
            </div>
            <div className="text-center">
              <Truck className="w-48 h-48 text-amber-500/20 mx-auto" />
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Lo que podés esperar de nuestro servicio local</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Vehículos Versátiles</h3>
                  <p className="text-sm text-slate-400">Camiones de distintos tamaños para adaptarse a calles estrechas y diferentes volúmenes de carga.</p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Personal Eficiente</h3>
                  <p className="text-sm text-slate-400">Equipo capacitado para realizar la carga y descarga en tiempo récord y con máximo cuidado.</p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Flexibilidad Horaria</h3>
                  <p className="text-sm text-slate-400">Nos adaptamos a tus horarios, incluyendo fines de semana, para facilitar tu mudanza.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Servicio de Flete</h3>
                  <p className="text-sm text-slate-400">¿Necesitás mover solo algunos objetos? También ofrecemos servicio de flete por hora.</p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Embalaje Opcional</h3>
                  <p className="text-sm text-slate-400">Si preferís, podemos encargarnos del embalaje completo de tus pertenencias.</p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Precios Competitivos</h3>
                  <p className="text-sm text-slate-400">Tarifas claras y accesibles para que te mudes sin gastar de más.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Te movés cerca? Hacelo fácil.</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Obtené una cotización rápida para tu mudanza local o flete. ¡Estamos listos para ayudarte!
                </p>
                <Link to="/cotizacion" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Cotizar mi Mudanza Local <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default LocalMoves;
