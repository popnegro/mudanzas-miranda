import React from 'react';
import PageLayout from './PageLayout';

const placeholderImages = [
  // ... (image data remains the same)
  { id: 1, alt: "Placeholder para imagen de camión de mudanzas.", src: "//via.placeholder.com/400x300.png?text=Camión+en+Ruta" },
  { id: 2, alt: "Placeholder para imagen de equipo trabajando.", src: "//via.placeholder.com/400x300.png?text=Equipo+Embalando" },
  { id: 3, alt: "Placeholder para imagen de embalaje de objeto frágil.", src: "//via.placeholder.com/400x300.png?text=Embalaje+Frágil" },
  { id: 4, alt: "Placeholder para imagen de interior de guardamuebles.", src: "//via.placeholder.com/400x300.png?text=Guardamuebles" },
  { id: 5, alt: "Placeholder para imagen de personal sonriendo.", src: "//via.placeholder.com/400x300.png?text=Personal+Amable" },
  { id: 6, alt: "Placeholder para imagen de mudanza en edificio.", src: "//via.placeholder.com/400x300.png?text=Mudanza+en+Altura" },
];

const Gallery: React.FC = () => {
  return (
    <PageLayout 
      title="Galería"
      description="Vea nuestra flota, equipo y procesos de trabajo en acción. Fotos reales de nuestros servicios de mudanza."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Galería de Fotos</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Una imagen vale más que mil palabras. Conocé nuestro trabajo.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center p-4 mb-12 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg">
                <p className="font-bold">NOTA: Las imágenes a continuación son ejemplos.</p>
                <p className="text-sm">Deben ser reemplazadas por fotografías reales del equipo, la flota y los trabajos de Mudanzas Miranda para generar confianza y demostrar experiencia (EEAT).</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {placeholderImages.map(image => (
                <div key={image.id} className="aspect-w-4 aspect-h-3 bg-[#111111] rounded-lg border border-white/10 overflow-hidden group">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Gallery;
