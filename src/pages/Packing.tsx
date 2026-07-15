import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, PackageCheck } from 'lucide-react';
import PageLayout from './PageLayout';

const Packing: React.FC = () => {
  return (
    <PageLayout
      title="Embalaje Profesional"
      description="Servicio de embalaje profesional para mudanzas en Mendoza. Protegemos tus objetos más valiosos con materiales de alta calidad y técnicas expertas."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Embalaje Profesional</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              La protección que tus pertenencias merecen, la tranquilidad que vos necesitás.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Ahorrá tiempo y ganá en seguridad</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                El embalaje es una de las tareas más críticas y que más tiempo consume en una mudanza. Un embalaje inadecuado es la principal causa de daños. Nuestro servicio de embalaje profesional te libera de esta tarea, garantizando que cada objeto, desde el más robusto hasta el más frágil, reciba la protección adecuada.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Nuestro equipo utiliza técnicas y materiales específicos para cada tipo de artículo, asegurando su integridad durante todo el proceso de carga, transporte y descarga.
              </p>
            </div>
            <div className="text-center">
              <PackageCheck className="w-48 h-48 text-amber-500/20 mx-auto" />
            </div>
          </div>
        </section>

        {/* Materials Used Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Materiales de primera calidad</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="font-bold text-lg">Cajas de Doble Corrugado</h3>
                <p className="text-sm text-slate-400">Resistencia superior para libros, vajilla y objetos pesados.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Plástico de Burbujas</h3>
                <p className="text-sm text-slate-400">Protección esencial contra golpes y vibraciones para artículos frágiles.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Film Stretch</h3>
                <p className="text-sm text-slate-400">Ideal para unificar y proteger muebles contra rayones y polvo.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Cajas Ropero</h3>
                <p className="text-sm text-slate-400">Para trasladar tu ropa colgada, evitando arrugas y ahorrando tiempo.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Querés una mudanza sin preocupaciones?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Añadí nuestro servicio de embalaje profesional a tu cotización y dedicate solo a disfrutar de tu nuevo hogar.
                </p>
                <Link to="/cotizacion" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Cotizar con Embalaje <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Packing;
