import React from 'react';
import { Check } from 'lucide-react';
import PageLayout from './PageLayout';

const placeholderStories = [
  {
    id: 1,
    title: "Mudanza Corporativa de [Nombre de Empresa Cliente]",
    challenge: "Trasladar una oficina de [Número] empleados en un fin de semana para minimizar el impacto en la operación.",
    solution: "Se realizó una planificación logística detallada, embalaje y etiquetado por puestos de trabajo, y una ejecución coordinada que permitió que el personal comenzara a trabajar el lunes por la mañana sin interrupciones.",
    imagePlaceholder: "// TODO: Insertar imagen del antes y después de la oficina",
  },
  {
    id: 2,
    title: "Traslado Residencial de Larga Distancia a [Ciudad Destino]",
    challenge: "Mudar una familia completa y sus pertenencias, incluyendo objetos frágiles y de valor sentimental, desde Mendoza a [Ciudad Destino].",
    solution: "Se utilizó un embalaje premium para todos los artículos delicados, un camión exclusivo con seguimiento satelital y se coordinó la entrega en la fecha exacta solicitada por el cliente.",
    imagePlaceholder: "// TODO: Insertar imagen de la familia en su nuevo hogar",
  },
  {
    id: 3,
    title: "Servicio Integral de Embalaje y Mudanza para [Tipo de Cliente]",
    challenge: "Un cliente con poco tiempo disponible necesitaba una solución 'llave en mano' para mudarse de un departamento a una casa.",
    solution: "Nuestro equipo se encargó del 100% del embalaje, traslado y desembalaje, incluyendo el montaje de muebles, permitiendo al cliente disfrutar de su nuevo hogar desde el primer minuto.",
    imagePlaceholder: "// TODO: Insertar imagen del equipo embalando",
  },
];

const SuccessStories: React.FC = () => {
  return (
    <PageLayout
      title="Casos de Éxito"
      description="Vea ejemplos reales de cómo hemos ayudado a nuestros clientes con sus mudanzas, superando desafíos y garantizando su satisfacción."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Casos de Éxito</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Historias reales de desafíos resueltos y clientes satisfechos.
            </p>
          </div>
        </section>

        {/* Stories List */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 space-y-16">
            <div className="text-center p-4 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg">
                <p className="font-bold">NOTA: El contenido a continuación es un ejemplo.</p>
                <p className="text-sm">Debe ser reemplazado por casos de éxito reales de la empresa para cumplir con las directrices de EEAT de Google.</p>
            </div>

            {placeholderStories.map((story, index) => (
              <div key={story.id} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                  <h2 className="text-2xl font-serif font-bold mb-4">{story.title}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-amber-500">El Desafío</h3>
                      <p className="text-slate-400">{story.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-500">La Solución</h3>
                      <p className="text-slate-400">{story.solution}</p>
                    </div>
                  </div>
                </div>
                <div className={`text-center p-8 bg-[#111111] rounded-lg border border-white/10 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                    <p className="text-slate-500 font-mono">{story.imagePlaceholder}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default SuccessStories;
