import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: 'Sobre el Servicio',
    questions: [
      {
        q: '¿Con cuánta anticipación debo reservar mi mudanza?',
        a: 'Recomendamos reservar con al menos 1 o 2 semanas de anticipación, especialmente si planeas mudarte en fin de semana o a fin de mes, que son nuestras fechas de mayor demanda. Para mudanzas nacionales, lo ideal es contactarnos con 3 o 4 semanas de antelación.'
      },
      {
        q: '¿Qué tipo de camiones utilizan?',
        a: 'Contamos con una flota de camiones de diferentes tamaños, desde furgones para fletes pequeños hasta camiones de gran capacidad para mudanzas de casas completas. Todos nuestros vehículos están alfombrados y equipados con mantas y sogas para proteger tus muebles.'
      },
      {
        q: '¿Mi mudanza está asegurada?',
        a: 'Sí, todas nuestras mudanzas cuentan con un seguro de carga básico que cubre cualquier imprevisto durante el transporte. Si tenés objetos de gran valor, podemos gestionar un seguro adicional específico. //TODO: Especificar detalles de la cobertura.'
      }
    ]
  },
  {
    category: 'Precios y Cotización',
    questions: [
      {
        q: '¿Cómo se calcula el precio de una mudanza?',
        a: 'El precio se calcula en base a varios factores: el volumen de objetos a trasladar (medido en metros cúbicos), la distancia entre el origen y el destino, la complejidad de los accesos (pisos por escalera, uso de ascensores), y los servicios adicionales que contrates, como el embalaje.'
      },
      {
        q: '¿La cotización tiene algún costo?',
        a: 'No, todas nuestras cotizaciones son completamente gratuitas y sin compromiso. Podés solicitarla a través de nuestro formulario web, por WhatsApp o por teléfono.'
      }
    ]
  },
  {
    category: 'Durante la Mudanza',
    questions: [
      {
        q: '¿Debo embalar mis cosas yo mismo?',
        a: 'Podés hacerlo vos mismo si lo preferís, pero también ofrecemos un servicio de embalaje profesional completo o parcial. Nuestro equipo puede encargarse de todo, desde la vajilla hasta la ropa, utilizando materiales de alta calidad.'
      },
      {
        q: '¿Puedo viajar en el camión de la mudanza?',
        a: 'Por cuestiones de seguridad y regulaciones del seguro, no está permitido que los clientes viajen en la cabina del camión. Te recomendamos coordinar tu propio transporte al nuevo domicilio.'
      }
    ]
  }
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-6"
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-6 text-slate-400 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqsPage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.flatMap(category => category.questions.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    })))
  };

  return (
    <PageLayout
      title="Preguntas Frecuentes"
      description="Encontrá respuestas a las dudas más comunes sobre nuestros servicios de mudanza, precios, embalaje y más. Preparate para tu mudanza con Mudanzas Miranda."
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="bg-[#0A0A0A] text-white">
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4"><h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Preguntas Frecuentes</h1><p className="mt-4 text-lg md:text-xl text-slate-300">Resolvemos tus dudas para que te mudes con total tranquilidad.</p></div>
        </section>
        <section className="py-20"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">{faqData.map(category => (<div key={category.category}><h2 className="text-2xl font-serif font-bold text-amber-500 mb-6">{category.category}</h2><div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">{category.questions.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}</div></div>))}</div></section>
      </div>
    </PageLayout>
  );
};

export default FaqsPage;