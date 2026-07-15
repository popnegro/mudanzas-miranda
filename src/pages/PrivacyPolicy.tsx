import React from 'react';
import { ShieldAlert } from 'lucide-react';
import PageLayout from './PageLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <PageLayout
      title="Política de Privacidad"
      description="Tu privacidad es importante para nosotros."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Política de Privacidad</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Tu privacidad es importante para nosotros.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 space-y-8 text-slate-300 leading-relaxed">
            
            <div className="p-6 bg-red-900/20 border border-red-700 text-red-300 rounded-lg text-center">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4"/>
              <p className="font-bold text-lg">CONTENIDO DE EJEMPLO - NO VÁLIDO LEGALMENTE</p>
              <p className="mt-2 text-sm">El siguiente texto es un borrador genérico y no constituye asesoramiento legal. Debe ser reemplazado por una política de privacidad redactada y validada por un profesional del derecho para cumplir con la legislación vigente.</p>
            </div>

            <p><strong>Última actualización:</strong> [Fecha]</p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
              <p>En Mudanzas Miranda, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web (independientemente de dónde lo visites) y te informará sobre tus derechos de privacidad y cómo la ley te protege.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Qué datos recopilamos sobre vos</h2>
              <p>Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre vos, que hemos agrupado de la siguiente manera:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Datos de Identidad:</strong> incluye nombre y apellido.</li>
                <li><strong>Datos de Contacto:</strong> incluye dirección de correo electrónico y números de teléfono.</li>
                <li><strong>Datos Técnicos:</strong> incluye la dirección del protocolo de Internet (IP), tipo y versión del navegador, etc.</li>
                <li><strong>Datos de Uso:</strong> incluye información sobre cómo utilizas nuestro sitio web.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Cómo utilizamos tus datos personales</h2>
              <p>Usaremos tus datos personales solo cuando la ley nos lo permita. Generalmente, usaremos tus datos personales en las siguientes circunstancias:</p>
               <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Para responder a tus solicitudes de cotización o consultas.</li>
                <li>Para gestionar nuestra relación con vos.</li>
                <li>Para mejorar nuestro sitio web, servicios, marketing y relaciones con los clientes.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
              <p>Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario. Podés configurar tu navegador para que rechace todas o algunas cookies del navegador, o para que te avise cuando los sitios web establezcan o accedan a las cookies. Si deshabilitas o rechazas las cookies, tené en cuenta que algunas partes de este sitio web pueden volverse inaccesibles o no funcionar correctamente.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Contacto</h2>
              <p>Si tenés alguna pregunta sobre esta política de privacidad, podés contactarnos a través de la información proporcionada en nuestra página de contacto.</p>
            </div>

          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
