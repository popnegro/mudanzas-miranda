import { Service, FAQItem, Testimonial } from '../types';

export const SERVICE_IDS = {
  RESIDENCIAL: 'residencial',
  OFICINA: 'oficina',
  COMBINADA: 'combinada',
  EMBALAJE: 'embalaje',
  GUARDAMUEBLES: 'guardamuebles',
  LOGISTICA: 'logistica',
} as const;

export const services: Service[] = [
  {
    id: SERVICE_IDS.RESIDENCIAL,
    slug: 'mudanzas-residenciales',
    title: 'Mudanzas Residenciales',
    shortTitle: 'Residenciales',
    description: 'Nos encargamos del traslado completo de tu hogar, ya sea una casa, dúplex o departamento en altura. Desde el embalaje de vajilla y objetos frágiles hasta el transporte de muebles de gran porte, nuestro equipo experto garantiza un servicio cuidadoso, puntual y ordenado de puerta a puerta.',
    icon: 'Home',
    image: '/img/mudanza-residencial-800.webp',
    alt: 'Living luminoso con cajas de mudanza y muebles embalados con film alveolar.',
    ctaText: 'Cotizar Mudanza de Hogar'
  },
  {
    id: SERVICE_IDS.OFICINA,
    slug: 'mudanzas-de-oficinas',
    title: 'Mudanzas de Oficinas',
    shortTitle: 'Oficinas',
    description: 'Minimizamos el tiempo de inactividad de tu empresa con un servicio de mudanza corporativa de planificación milimétrica. Trasladamos con total seguridad y confidencialidad mobiliario de oficina, puestos de trabajo, servidores, material informático delicado, archivos físicos y más.',
    icon: 'Building',
    image: '/img/mudanza-oficina-800.webp',
    alt: 'Espacio de oficina moderno con equipos informáticos y cajas listas para una mudanza corporativa.',
    ctaText: 'Planificar Mudanza Comercial'
  },
  {
    id: SERVICE_IDS.COMBINADA,
    slug: 'mudanzas-combinadas',
    title: 'Mudanzas Combinadas y Grupales',
    shortTitle: 'Combinadas',
    description: 'Optimizá tu presupuesto compartiendo espacio en un camión con otras cargas destinadas al mismo trayecto nacional o provincial. Es la solución ideal para traslados de larga distancia con flexibilidad de fechas, manteniendo la rigurosa separación, seguridad y rotulado de cada pertenencia.',
    icon: 'Truck',
    image: '/img/mudanzas-miranda-800.webp',
    alt: 'Camión de mudanzas circulando por rutas mendocinas brindando flete compartido.',
    ctaText: 'Consultar Rutas Combinadas'
  },
  {
    id: SERVICE_IDS.EMBALAJE,
    slug: 'embalaje-profesional',
    title: 'Embalaje Profesional',
    shortTitle: 'Embalaje',
    description: 'Ahorrá tiempo valioso y reducí riesgos de roturas al mínimo. Nuestro equipo utiliza materiales específicos de calidad premium (plástico de burbujas alveolar de alta densidad, cajas de cartón reforzadas, film stretch, mantas acolchadas y cintas de alta adherencia) para resguardar cada pieza.',
    icon: 'PackageCheck',
    image: '/img/mudanza-residencial-800.webp',
    alt: 'Vajilla y copas embaladas individualmente con plástico burbuja en caja rotulada.',
    ctaText: 'Contratar Embalaje Profesional'
  },
  {
    id: SERVICE_IDS.GUARDAMUEBLES,
    slug: 'servicio-de-guardamuebles',
    title: 'Servicio de Guardamuebles',
    shortTitle: 'Guardamuebles',
    description: '¿Buscás almacenamiento temporal o a largo plazo entre firmas de contratos de alquiler, mudanzas demoradas o refacciones en el hogar? Disponemos de depósitos secos, limpios e individuales con monitoreo, alarma y vigilancia presencial las 24 horas del día.',
    icon: 'Archive',
    image: '/img/mudanzas-miranda-800.webp',
    alt: 'Depósito de guardamuebles limpio con unidades de almacenamiento seguras.',
    ctaText: 'Reservar Espacio Guardamuebles'
  },
  {
    id: SERVICE_IDS.LOGISTICA,
    slug: 'logistica-integral',
    title: 'Logística Integral',
    shortTitle: 'Logística',
    description: 'Soporte logístico de alta eficiencia para comercios y pymes en Mendoza. Ofrecemos distribución programada, almacenamiento de mercaderías, entregas directas a locales y gestión de inventarios con la seriedad y cumplimiento de plazos que tu negocio exige para operar sin fisuras.',
    icon: 'Building2',
    image: '/img/mudanzas-miranda-800.webp',
    alt: 'Operaciones de distribución y logística integral para empresas en Mendoza.',
    ctaText: 'Consultar Solución Logística'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Con cuánta antelación debo reservar mi mudanza?',
    answer: 'Recomendamos reservar con al menos una o dos semanas de antelación para asegurar disponibilidad en el día y horario que mejor te convenga. En temporada alta (de diciembre a marzo), sugerimos hacerlo con 3 semanas de anticipación para evitar imprevistos.'
  },
  {
    id: 'faq-2',
    question: '¿Qué incluye el servicio básico de mudanza?',
    answer: 'El servicio básico incluye el camión adaptado al volumen de tu carga, combustible, chofer profesional habilitado, personal calificado para la carga y descarga de las pertenencias en origen y destino, y el uso de mantas protectoras profesionales para proteger tus muebles grandes.'
  },
  {
    id: 'faq-3',
    question: '¿Cómo protegen los muebles y objetos frágiles?',
    answer: 'Utilizamos mantas de lana pesadas, sogas con cricket de traba rápida y carretillas de dos y cuatro ruedas. Si contratás nuestro servicio de Embalaje Profesional, embalamos copa por copa, vajilla con papel manteca y plástico burbuja, y cubrimos colchones y sillones con fundas especiales o film alveolar de alta resistencia.'
  },
  {
    id: 'faq-4',
    question: '¿Las mudanzas cuentan con seguro de carga?',
    answer: 'Sí. Todas nuestras mudanzas están respaldadas por un seguro de carga de tránsito completo para resguardar el valor de tus bienes ante cualquier imprevisto físico en la ruta, garantizando que tu patrimonio familiar esté 100% protegido de principio a fin.'
  },
  {
    id: 'faq-5',
    question: '¿Realizan mudanzas interprovinciales o de larga distancia?',
    answer: 'Sí, realizamos mudanzas de Mendoza hacia Buenos Aires, Córdoba, San Luis, San Juan, Neuquén, Bariloche, y cualquier rincón del país. Ofrecemos tanto el servicio Exclusivo (camión directo solo con tus cosas) como el servicio Combinado (más económico, compartiendo espacio).'
  },
  {
    id: 'faq-6',
    question: '¿Ofrecen presupuestos cerrados o cobran por hora?',
    answer: 'Por transparencia y tu tranquilidad, ofrecemos presupuestos de PRECIO CERRADO basados en la distancia, accesos (por escalera, ascensor, pasillo largo), volumen y servicios contratados. De esta forma sabés el monto exacto antes de mudar, sin recargos sorpresa por demoras de tránsito.'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mariana Galdame',
    role: 'Mudanza Residencial (Ciudad de Mendoza)',
    rating: 5,
    content: 'Excelente servicio de principio a fin. Los chicos llegaron súper puntuales, embalaron todo el living con un cuidado increíble y subieron todo por escalera sin un solo raspón. Muy educados y eficientes. ¡Súper recomendados!',
    date: 'Hace 2 semanas'
  },
  {
    id: 'test-2',
    author: 'Esteban Corvalán',
    role: 'Mudanza de Oficina (Godoy Cruz a Chacras)',
    rating: 5,
    content: 'Teníamos que mudar una oficina de desarrollo con monitores y servidores delicados. Hicieron un embalaje impecable con plástico burbuja doble y rotulado estricto. Cumplieron los tiempos a rajatabla y al día lunes ya estábamos operando sin problemas.',
    date: 'Hace 1 mes'
  },
  {
    id: 'test-3',
    author: 'Florencia Benítez',
    role: 'Mudanza de Larga Distancia (San Rafael a Córdoba)',
    rating: 5,
    content: 'Elegí el servicio de mudanza combinada a Córdoba y el precio fue excelente. Me mantuvieron informada de todo el viaje por WhatsApp. Todo llegó impecable, en la fecha acordada y con un trato súper cálido por parte de los cargadores.',
    date: 'Hace 3 meses'
  },
  {
    id: 'test-4',
    author: 'Andrés Manzano',
    role: 'Mudanza de Casa (Maipú)',
    rating: 5,
    content: 'Un equipo sumamente profesional. Armaron y desarmaron las camas matrimoniales y un placard gigante con total rapidez. Tienen herramientas adecuadas y un trato excelente. Una tranquilidad enorme haberlos contratado.',
    date: 'Hace 2 meses'
  }
];
