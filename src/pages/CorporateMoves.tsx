import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import PageLayout from './PageLayout';

const CorporateMoves: React.FC = () => {
  return (
    <PageLayout
      title="Mudanzas Corporativas"
      description="Servicio de mudanzas para oficinas y empresas en Mendoza. Planificación experta para minimizar el tiempo de inactividad y asegurar una transición eficiente."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Mudanzas Corporativas</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Eficiencia y profesionalismo para que tu negocio no se detenga.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Minimizamos el impacto en tu operación</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Entendemos que el tiempo es oro para tu empresa. Nuestro servicio de mudanzas corporativas está meticulosamente planificado y ejecutado para asegurar una transición rápida, eficiente y con el mínimo tiempo de inactividad.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Coordinamos cada detalle con tu equipo, desde el embalaje de equipos informáticos y documentación sensible hasta el montaje del mobiliario en la nueva oficina, permitiendo que tus empleados retomen sus actividades lo antes posible.
              </p>
            </div>
             <div className="text-center">
                <Briefcase className="w-48 h-48 text-amber-500/20 mx-auto" />
            </div>
          </div>
        </section>

        {/* Planning Process Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Planificación a tu medida</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-amber-500 mb-2">1</div>
                <h3 className="font-bold text-lg mb-2">Análisis y Presupuesto</h3>
                <p className="text-sm text-slate-400">Evaluamos el volumen a trasladar, los accesos y tus requerimientos para crear un plan detallado.</p>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-amber-500 mb-2">2</div>
                <h3 className="font-bold text-lg mb-2">Coordinación y Embalaje</h3>
                <p className="text-sm text-slate-400">Etiquetamos y embalamos equipos, muebles y archivos siguiendo un inventario riguroso.</p>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-amber-500 mb-2">3</div>
                <h3 className="font-bold text-lg">Ejecución y Montaje</h3>
                <p className="text-sm text-slate-400">Trasladamos y reinstalamos tu oficina en el nuevo destino, siguiendo el layout acordado.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Preparado para hacer crecer tu negocio?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Dejá la logística en nuestras manos expertas. Contactanos para una visita de evaluación sin costo y recibí una propuesta a la medida de tu empresa.
                </p>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Contactar a un Asesor <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CorporateMoves;
