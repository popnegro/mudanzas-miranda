import React from 'react';
import { ShieldAlert } from 'lucide-react';
import PageLayout from './PageLayout';

const Terms: React.FC = () => {
  return (
    <PageLayout
      title="Términos y Condiciones"
      description="Reglas de uso de nuestro sitio web y servicios."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Términos y Condiciones</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Reglas de uso de nuestro sitio web y servicios.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 space-y-8 text-slate-300 leading-relaxed">
            
            <div className="p-6 bg-red-900/20 border border-red-700 text-red-300 rounded-lg text-center">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4"/>
              <p className="font-bold text-lg">CONTENIDO DE EJEMPLO - NO VÁLIDO LEGALMENTE</p>
              <p className="mt-2 text-sm">El siguiente texto es un borrador genérico y no constituye asesoramiento legal. Debe ser reemplazado por un documento de Términos y Condiciones redactado y validado por un profesional del derecho.</p>
            </div>

            <p><strong>Última actualización:</strong> [Fecha]</p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar el sitio web de Mudanzas Miranda (el "Sitio"), usted acepta y se compromete a cumplir con los presentes términos y condiciones de uso ("Términos"). Si no está de acuerdo con estos Términos, no debe acceder ni utilizar el Sitio.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Uso del Sitio Web</h2>
              <p>Usted se compromete a utilizar el Sitio únicamente con fines lícitos y de manera que no infrinja los derechos de, ni restrinja o inhiba el uso y disfrute del Sitio por parte de terceros. Se prohíbe la conducta que sea ilegal, o que pueda acosar o causar angustia o inconvenientes a cualquier persona.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Propiedad Intelectual</h2>
              <p>Todo el contenido incluido en el Sitio, como texto, gráficos, logos, imágenes, así como la compilación de los mismos, es propiedad de Mudanzas Miranda o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitación de Responsabilidad</h2>
              <p>El Sitio y su contenido se proporcionan "tal cual". Mudanzas Miranda no ofrece ninguna garantía, expresa o implícita, sobre la exactitud, fiabilidad o integridad del contenido. En ningún caso Mudanzas Miranda será responsable de ninguna pérdida o daño, incluyendo, sin limitación, pérdidas o daños indirectos o consecuentes, que surjan del uso de este Sitio.</p>
            </div>

             <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Modificaciones a los Términos</h2>
              <p>Mudanzas Miranda se reserva el derecho de modificar estos Términos en cualquier momento. Su uso continuado del Sitio después de que se publiquen los cambios constituirá su aceptación de dichos cambios.</p>
            </div>

          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Terms;
