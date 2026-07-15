import React from 'react';
import { destinations } from '../data/destinations';
import { MapPin } from 'lucide-react';
import PageLayout from './PageLayout';

const Coverage: React.FC = () => {
  const regions = {
    'Gran Mendoza': destinations.filter(d => d.region === 'Gran Mendoza'),
    'Zona Este y Valle de Uco': destinations.filter(d => d.region === 'Zona Este y Valle de Uco'),
    'Sur de Mendoza': destinations.filter(d => d.region === 'Sur de Mendoza'),
  };

  return (
    <PageLayout
      title="Área de Cobertura"
      description="Conocé nuestra amplia área de cobertura para mudanzas en Mendoza y traslados a nivel nacional. Llegamos a donde nos necesites."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Nuestra Cobertura</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Desde el corazón de Mendoza hasta cada rincón del país.
            </p>
          </div>
        </section>

        {/* Map and Intro Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Llegamos a donde necesites</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Nuestra base de operaciones se encuentra en Mendoza, pero nuestro alcance es nacional. Ofrecemos una cobertura completa en toda la provincia, desde el Gran Mendoza hasta las zonas más alejadas, y realizamos traslados a cualquier punto de la Argentina.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Contamos con el conocimiento local para movernos con agilidad en la ciudad y la experiencia en logística para planificar rutas eficientes a larga distancia.
                </p>
              </div>
              <div className="h-96 bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.704332299388!2d-68.8322221848154!3d-32.8792069809407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09e2cf86c559%3A0x82eda333d3f3f3b4!2sArmada%20Argentina%20584%2C%20M5500%20Mendoza!5e0!3m2!1ses-419!2sar!4v1678886476123!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Mudanzas Miranda"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations List Section */}
        <section className="bg-[#111111] py-20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Principales Zonas de Servicio en Mendoza</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(regions).map(([regionName, regionDestinations]) => (
                <div key={regionName}>
                  <h3 className="text-xl font-bold text-amber-500 mb-4 border-b border-white/10 pb-2">{regionName}</h3>
                  <ul className="space-y-2">
                    {regionDestinations.map(dest => (
                      <li key={dest.slug} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">{dest.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
             <p className="text-center text-slate-400 mt-12 text-sm">
                Y también realizamos mudanzas a nivel nacional. ¡Consultanos por tu destino!
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Coverage;
