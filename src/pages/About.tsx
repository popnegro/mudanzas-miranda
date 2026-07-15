import React from 'react';
import { Users, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';

const About: React.FC = () => {
  return (
    <PageLayout
      title="Sobre Nosotros"
      description="Conozca la historia, el equipo y los valores de Mudanzas Miranda, su empresa de confianza para mudanzas en Mendoza."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Sobre Mudanzas Miranda</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Más de 20 años moviendo tus sueños con la confianza y seguridad que nos caracterizan.
            </p>
          </div>
        </section>

        {/* Company History Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-center">De una idea familiar a una empresa líder</h2>
            <p className="text-slate-400 leading-relaxed">
              Mudanzas Miranda nació en 2004 como un pequeño emprendimiento familiar con un solo camión y un gran sueño: ofrecer un servicio de mudanzas en Mendoza que fuera sinónimo de confianza y tranquilidad. Fundada por la familia Miranda, la empresa se construyó sobre los valores del trabajo duro, la honestidad y un profundo respeto por las pertenencias de cada cliente.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Con el paso de los años, nuestra reputación creció gracias a las recomendaciones de clientes satisfechos. Esto nos permitió expandir nuestra flota, incorporar nuevo personal y desarrollar una metodología de trabajo que hoy es nuestro sello de calidad. Aunque hemos crecido, mantenemos el mismo espíritu cercano y la atención personalizada del primer día.
            </p>
            <div className="text-center pt-4">
                <p className="text-slate-500 font-mono text-sm"> //[TODO: Insertar una imagen histórica o del fundador aquí. Idealmente una foto en blanco y negro del primer camión o del equipo inicial] </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Confianza y Seguridad</h3>
                <p className="text-slate-400">Tratamos tus pertenencias como si fueran nuestras. Tu tranquilidad es nuestra máxima prioridad.</p>
              </div>
              <div className="flex flex-col items-center">
                <HeartHandshake className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Compromiso y Puntualidad</h3>
                <p className="text-slate-400">Cumplimos con lo pactado. Respetamos tu tiempo y nos aseguramos de que tu mudanza se realice en los plazos acordados.</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Atención Personalizada</h3>
                <p className="text-slate-400">Cada mudanza es única. Escuchamos tus necesidades para ofrecerte una solución a medida.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">El Equipo que te Acompaña</h2>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Nuestro equipo es nuestro mayor orgullo. Contamos con personal con más de 15 años de experiencia en el rubro, capacitados no solo en la logística del transporte, sino también en el trato cordial y la resolución de imprevistos. Cada miembro del equipo comparte nuestra pasión por un trabajo bien hecho.
            </p>
             <div className="text-center pt-4">
                <p className="text-slate-500 font-mono text-sm"> //[TODO: Insertar una foto profesional y reciente del equipo, uniformado si es posible] </p>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-serif font-bold mb-4">Nuestra Flota: Preparada para Todo</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Disponemos de una flota de vehículos modernos y equipados para todo tipo de mudanzas, desde pequeños fletes hasta grandes traslados interprovinciales. Todos nuestros camiones están alfombrados y cuentan con mantas, sogas y herramientas necesarias para el máximo cuidado de tus muebles.
                </p>
                 <p className="text-slate-400 leading-relaxed">
                  // [TODO: Mencionar la cantidad de vehículos y sus capacidades si es posible. Ej: "Contamos con 5 camiones de hasta 30m³..."]
                </p>
              </div>
              <div className="text-center pt-4">
                  <p className="text-slate-500 font-mono text-sm"> //[TODO: Insertar una foto de la flota de camiones, limpios y alineados] </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Listo para tu próximo movimiento?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Ahora que conocés nuestra historia y compromiso, dejá que nuestro equipo se encargue de tu mudanza.
                </p>
                <Link to="/cotizacion" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Solicitar Presupuesto <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;
