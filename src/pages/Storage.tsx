import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Warehouse } from 'lucide-react';
import PageLayout from './PageLayout';

const Storage: React.FC = () => {
  return (
    <PageLayout
      title="Servicio de Guardamuebles"
      description="Servicio de guardamuebles en Mendoza. Soluciones de almacenamiento seguras, flexibles y económicas para tus pertenencias."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Guardamuebles</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              El espacio seguro que necesitás, por el tiempo que quieras.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Más que un depósito, una solución</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                ¿Necesitás un lugar seguro para tus pertenencias entre mudanzas, durante una reforma o por falta de espacio? Nuestro servicio de guardamuebles te ofrece una solución de almacenamiento flexible, segura y a tu medida.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Contamos con boxes individuales de diferentes tamaños, para que pagues solo por el espacio que utilizás. Tus bienes estarán protegidos en un entorno limpio, seguro y monitoreado las 24 horas.
              </p>
            </div>
            <div className="text-center">
              <Warehouse className="w-48 h-48 text-amber-500/20 mx-auto" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Características de nuestro servicio</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Seguridad 24/7</h3>
                  <p className="text-sm text-slate-400">Sistema de alarmas, cámaras de vigilancia y personal de seguridad. //[TODO: Confirmar detalles]</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Boxes Individuales</h3>
                  <p className="text-sm text-slate-400">Privacidad total para tus pertenencias en espacios de uso exclusivo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Control de Humedad</h3>
                  <p className="text-sm text-slate-400">Ambiente controlado para la perfecta conservación de muebles y objetos delicados. //[TODO: Confirmar si aplica]</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Flexibilidad de Contrato</h3>
                  <p className="text-sm text-slate-400">Alquiler por semanas, meses o años. Sin ataduras a largo plazo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Diferentes Tamaños</h3>
                  <p className="text-sm text-slate-400">Desde pequeñas bauleras hasta grandes espacios para una casa completa.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Fácil Acceso</h3>
                  <p className="text-sm text-slate-400">Accedé a tus pertenencias cuando lo necesites dentro de nuestro horario de atención.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">¿Necesitás espacio extra?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Liberá espacio en tu casa u oficina con la tranquilidad de saber que tus bienes están seguros. Consultanos por nuestras soluciones de almacenamiento.
                </p>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">
                    Consultar por Guardamuebles <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Storage;
