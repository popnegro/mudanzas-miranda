import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import PageLayout from './PageLayout';

const quickFaqs = [
    { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos efectivo, transferencia bancaria y Mercado Pago.' },
    { q: '¿Trabajan los fines de semana?', a: 'Sí, realizamos mudanzas los sábados. Recomendamos reservar con anticipación.' },
    { q: '¿La cotización tiene costo?', a: 'No, todas nuestras cotizaciones son gratuitas y sin compromiso.' },
];

const Contact: React.FC = () => {
  return (
    <PageLayout
      title="Contacto"
      description="Contactate con Mudanzas Miranda. Solicitá tu presupuesto, consultanos tus dudas o visitanos en nuestra oficina en Mendoza."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Contacto</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Estamos para ayudarte. Ponete en contacto con nosotros.
            </p>
          </div>
        </section>

        {/* Contact Info and Map */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
            <div className="space-y-8 max-w-xl">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Nuestra Oficina</h2>
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                    <a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer">Armada Argentina 584, Mendoza, AR</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-6 h-6 text-amber-500 mt-1" />
                    <a href="tel:+5492615130910">+54 9 261 513-0910</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-amber-500 mt-1" />
                    <a href="mailto:info@mudanzasmiranda.com.ar">info@mudanzasmiranda.com.ar</a>
                  </div>
                </div>
              </div>
               <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Horarios de Atención</h3>
                 <div className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-3"><Clock className="w-6 h-6 text-amber-500 mt-1" /><span>Lunes a Viernes: 08:00 - 20:00</span></div>
                    <div className="flex items-start gap-3"><Clock className="w-6 h-6 text-amber-500 mt-1" /><span>Sábados: 09:00 - 14:00</span></div>
                 </div>
              </div>
            </div>
            <div className="h-96 md:h-full bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
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
        </section>

        {/* Quick FAQs Section */}
        <section className="py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-bold text-center mb-12">Preguntas Rápidas</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {quickFaqs.map(faq => (
                        <div key={faq.q}>
                            <h3 className="font-bold text-amber-500 mb-2">{faq.q}</h3>
                            <p className="text-sm text-slate-400">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Form Section */}
        <section id="form" className="py-20 bg-[#111111] border-t border-white/10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Envianos tu consulta o pedido de cotización</h2>
                    <p className="text-slate-400 text-sm mt-2">
                      Completá el formulario y nuestro equipo se pondrá en contacto a la brevedad.
                    </p>
                </div>
                <QuoteForm />
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
