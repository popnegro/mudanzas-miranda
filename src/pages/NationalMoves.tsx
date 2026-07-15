import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Globe2 } from 'lucide-react';
import PageLayout from './PageLayout';

const NationalMoves: React.FC = () => {
  return (
    <PageLayout
      title="Mudanzas Nacionales"
      description="Servicio de mudanzas de larga distancia desde y hacia Mendoza. Conectamos todo el país con rutas seguras y planificación logística experta."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Mudanzas Nacionales</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Conectamos Mendoza con cada rincón del país. Tu mudanza, sin fronteras.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Logística experta para largas distancias</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Una mudanza interprovincial requiere una planificación y ejecución impecables. En Mudanzas Miranda, somos especialistas en traslados de larga distancia, garantizando que tus pertenencias lleguen a cualquier punto del país de forma segura y puntual.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Coordinamos rutas eficientes, optimizamos los tiempos de viaje y utilizamos técnicas de estiba y embalaje reforzado para proteger tus bienes durante todo el trayecto. Viajá a tu nuevo destino con la certeza de que tu mudanza está en manos de expertos.
              </p>
            </div>
            <div className="text-center">
              <Globe2 className="w-48 h-48 text-amber-500/20 mx-auto" />
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Un servicio puerta a puerta sin fisuras</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Planificación de Ruta</h3>
                  <p className="text-sm text-slate-400">Seleccionamos la ruta más segura y eficiente para tu destino.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Embalaje Reforzado</h3>
                  <p className="text-sm text-slate-400">Protección extra para soportar el trajin del viaje largo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Gestión de Documentación</h3>
                  <p className="text-sm text-slate-400">Te asesoramos con la documentación necesaria para el traslado entre provincias.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Carga y Estiba Profesional</h3>
                  <p className="text-sm text-slate-400">Aseguramos la carga para minimizar el movimiento y las vibraciones.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Seguimiento y Comunicación</h3>
                  <p className="text-sm text-slate-400">Te mantenemos informado sobre el estado de tu mudanza durante el viaje.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Seguro de Larga Distancia</h3>
                  <p className="text-sm text-slate-400">Cobertura completa para tu tranquilidad total. //[TODO: Especificar cobertura]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Tu próximo destino está en otra provincia?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    No importa la distancia, llevamos tus pertenencias con el mismo cuidado. Solicitá tu cotización para mudanzas nacionales.
                </p>
                <Link to="/cotizacion" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Cotizar mi Mudanza Nacional <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default NationalMoves;
