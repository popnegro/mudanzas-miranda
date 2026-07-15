import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import PageLayout from './PageLayout';

const ResidentialMoves: React.FC = () => {
  return (
    <PageLayout
      title="Mudanzas Residenciales"
      description="Servicio de mudanzas residenciales en Mendoza. Trasladamos tu casa o departamento con profesionalismo, cuidando cada detalle."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Mudanzas Residenciales</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Tu hogar, en las mejores manos. Cuidamos cada detalle de tu mudanza.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Tranquilidad para tu nuevo comienzo</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Sabemos que una mudanza es más que mover cajas; es el comienzo de una nueva etapa. Nuestro servicio de mudanzas residenciales está diseñado para que vivas esta transición con la máxima tranquilidad y confianza.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Nos encargamos de todo el proceso, desde el embalaje cuidadoso de tus objetos más preciados hasta el montaje de muebles en tu nuevo hogar. Nuestro equipo de profesionales se asegura de que cada paso se realice con eficiencia y seguridad.
              </p>
            </div>
            <div className="text-center">
              <p className="text-amber-500 font-bold text-lg"> //[TODO: Insertar una imagen representativa del servicio aquí, ej: familia feliz en su nuevo hogar] </p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Nuestro servicio incluye</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Embalaje Profesional</h3>
                  <p className="text-sm text-slate-400">Utilizamos materiales de alta calidad para proteger todo, desde tu vajilla hasta tus muebles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Carga y Descarga</h3>
                  <p className="text-sm text-slate-400">Nuestro equipo se encarga del trabajo pesado con cuidado y técnica.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Transporte Seguro</h3>
                  <p className="text-sm text-slate-400">Flota de camiones adaptados para que tus pertenencias viajen seguras.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Desmontaje y Montaje</h3>
                  <p className="text-sm text-slate-400">Desarmamos y armamos tus muebles para facilitar el traslado.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Ubicación en Destino</h3>
                  <p className="text-sm text-slate-400">Dejamos cada caja y mueble en la habitación que nos indiques.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Seguro de Carga</h3>
                  <p className="text-sm text-slate-400">Tu mudanza está protegida ante cualquier imprevisto. //[TODO: Especificar cobertura]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Listo para tu nuevo comienzo?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Dejanos los detalles a nosotros. Solicitá tu cotización personalizada y descubrí por qué somos la empresa de confianza en Mendoza.
                </p>
                <Link to="/cotizacion" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Cotizar mi Mudanza <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ResidentialMoves;
