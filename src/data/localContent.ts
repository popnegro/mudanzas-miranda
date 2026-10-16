import type { FAQItem } from '../types';

/** Extra SEO content keyed by destination slug (expandable without bloating base data). */
export interface LocalContent {
  tips: string[];
  faqs: FAQItem[];
}

const defaultFaqs = (name: string): FAQItem[] => [
  {
    id: `${name}-faq-1`,
    question: `¿Cuánto cuesta una mudanza en ${name}?`,
    answer:
      'El precio depende del volumen, los accesos (escaleras, ascensor, distancia al camión) y si necesitás embalaje. Cotizamos sin cargo por WhatsApp o con el formulario online.',
  },
  {
    id: `${name}-faq-2`,
    question: `¿Hacen mudanzas de departamentos en ${name}?`,
    answer:
      'Sí. Trabajamos en edificios y casas: coordinamos horarios de carga, protección de pasillos y uso de ascensor cuando está permitido por el consorcio.',
  },
  {
    id: `${name}-faq-3`,
    question: `¿Con cuánta anticipación debo reservar en ${name}?`,
    answer:
      'Recomendamos reservar con la mayor anticipación posible, sobre todo a fin de mes y fines de semana. Si la fecha es flexible, podemos ofrecerte más opciones de agenda.',
  },
];

export const localContentBySlug: Record<string, LocalContent> = {
  'mudanzas-ciudad-mendoza': {
    tips: [
      'Centro y microcentro: conviene coordinar horarios de carga por el tránsito y zonas de estacionamiento restringido.',
      'Departamentos en altura: evaluamos si hay ascensor de servicio y protecciones en pasillos comunes.',
      'Ideal para mudanzas residenciales y de oficinas en la capital mendocina.',
    ],
    faqs: defaultFaqs('Ciudad de Mendoza'),
  },
  'mudanzas-godoy-cruz': {
    tips: [
      'Cobertura en zonas céntricas y barrios residenciales de Godoy Cruz, con acceso frecuente a avenidas principales.',
      'Mudanzas de casas y departamentos con personal acostumbrado a calles angostas y cocheras.',
      'Base operativa cercana: facilitamos coordinación y reprogramaciones el mismo día cuando es posible.',
    ],
    faqs: defaultFaqs('Godoy Cruz'),
  },
  'mudanzas-guaymallen': {
    tips: [
      'Atendemos barrios densos y zonas de crecimiento residencial en Guaymallén.',
      'Útil para familias que combinan mudanza local con guardamuebles o embalaje de vajilla.',
      'Coordinamos con anticipación si hay restricciones de horario en el edificio o barrio.',
    ],
    faqs: defaultFaqs('Guaymallén'),
  },
  'mudanzas-las-heras': {
    tips: [
      'Cobertura en Las Heras incluyendo zonas residenciales y accesos desde rutas de ingreso al Gran Mendoza.',
      'Mudanzas de casas con jardín o volumen medio-alto: dimensionamos el camión según inventario.',
      'Opción de embalaje profesional para piezas frágiles antes del traslado.',
    ],
    faqs: defaultFaqs('Las Heras'),
  },
  'mudanzas-maipu': {
    tips: [
      'Mudanzas en Maipú para casas, dúplex y locales comerciales.',
      'Conocemos distancias típicas hacia Godoy Cruz, Ciudad y Luján de Cuyo para estimar tiempos de viaje.',
      'Recomendamos inventariar electrodomésticos grandes para asignar personal y herramientas adecuadas.',
    ],
    faqs: defaultFaqs('Maipú'),
  },
  'mudanzas-lujan-de-cuyo': {
    tips: [
      'Traslados en Luján de Cuyo, Chacras y zonas de mayor distancia al centro.',
      'Planificamos salidas tempranas cuando hay mucho tránsito en rutas de acceso.',
      'Servicio adaptable a casas amplias y mudanzas parciales (solo living, solo dormitorios, etc.).',
    ],
    faqs: defaultFaqs('Luján de Cuyo'),
  },
};

/** Fallback tips/faqs when a destination has no dedicated block yet. */
export function getLocalContent(slug: string, name: string): LocalContent {
  return (
    localContentBySlug[slug] ?? {
      tips: [
        `Servicio de mudanzas y traslados puerta a puerta en ${name}.`,
        'Presupuesto personalizado según volumen, accesos y servicios adicionales (embalaje, desarmado de muebles).',
        'Coordinación previa por WhatsApp o formulario para definir fecha y equipo.',
      ],
      faqs: defaultFaqs(name),
    }
  );
}
