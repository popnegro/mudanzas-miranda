import type { FAQItem } from '../types';

/** FAQs per service slug (indexable services). */
export const serviceFaqsBySlug: Record<string, FAQItem[]> = {
  'mudanzas-residenciales': [
    {
      id: 'res-faq-1',
      question: '¿Qué incluye una mudanza residencial?',
      answer:
        'Incluye camión acorde al volumen, chofer habilitado, personal de carga y descarga, y protección con mantas en muebles grandes. El embalaje de vajilla o desarmado de placards se cotiza aparte si lo necesitás.',
    },
    {
      id: 'res-faq-2',
      question: '¿Pueden mudar departamentos en pisos altos?',
      answer:
        'Sí. Trabajamos con ascensor de servicio cuando el edificio lo permite, o por escalera con el personal necesario. Es clave indicarlo al cotizar para dimensionar el equipo.',
    },
    {
      id: 'res-faq-3',
      question: '¿Cuánto dura una mudanza de casa o departamento?',
      answer:
        'Depende del volumen y los accesos. Una mudanza de departamento chico puede resolverse en media jornada; casas más grandes pueden requerir el día completo. Te damos una estimación al cotizar.',
    },
  ],
  'mudanzas-oficinas': [
    {
      id: 'ofi-faq-1',
      question: '¿Pueden mudar fuera del horario laboral?',
      answer:
        'Sí, coordinamos mudanzas de oficina en horarios que minimicen la interrupción del negocio, incluyendo fines de semana cuando la agenda lo permite.',
    },
    {
      id: 'ofi-faq-2',
      question: '¿Trasladan equipos informáticos y archivos?',
      answer:
        'Sí. Protegemos monitores, CPUs y cajas de archivo. Recomendamos etiquetar puestos y priorizar lo crítico para el reinicio de operaciones.',
    },
    {
      id: 'ofi-faq-3',
      question: '¿Ayudan a desarmar mobiliario de oficina?',
      answer:
        'Podemos desarmar y rearmar escritorios, paneles y muebles modulares. Indicá el tipo de mobiliario al solicitar el presupuesto.',
    },
  ],
  'embalaje-profesional': [
    {
      id: 'emb-faq-1',
      question: '¿Qué materiales usan para embalar?',
      answer:
        'Usamos cajas de distintos tamaños, film, plástico burbuja, mantas y protecciones específicas para vajilla, cuadros y electrodomésticos.',
    },
    {
      id: 'emb-faq-2',
      question: '¿El embalaje se puede contratar sin la mudanza completa?',
      answer:
        'Sí. Podés contratar solo embalaje profesional o combinarlo con el traslado. Es ideal si querés empacar con anticipación.',
    },
    {
      id: 'emb-faq-3',
      question: '¿Cuánto tiempo lleva embalar un departamento?',
      answer:
        'Varía según la cantidad de ambientes y objetos frágiles. En la cotización estimamos horas de embalaje para que sepas cómo planificar el día de la mudanza.',
    },
  ],
};

export function getServiceFaqs(slug: string): FAQItem[] {
  return serviceFaqsBySlug[slug] ?? [];
}
