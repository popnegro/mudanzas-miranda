import { Service, FAQItem, Testimonial } from '../types';

export const services: Service[] = [
  {
    id: 'residencial',
    title: 'Mudanzas Residenciales',
    shortTitle: 'Residenciales',
    description: 'Coordinamos el traslado completo de tu hogar, desde casas y dúplex hasta departamentos en altura. Podemos ocuparnos del embalaje de objetos frágiles y del traslado de muebles de gran porte, con un servicio cuidado, puntual y ordenado de puerta a puerta.',
    icon: 'Home',
    image: '/img/mudanza-residencial-800.webp',
    alt: 'Living luminoso con cajas de mudanza y muebles embalados con film alveolar.',
    ctaText: 'Cotizar Mudanza de Hogar'
  },
  {
    id: 'oficina',
    title: 'Mudanzas de Oficinas',
    shortTitle: 'Oficinas',
    description: 'Planificamos mudanzas corporativas para reducir interrupciones y facilitar la puesta en marcha del nuevo espacio. Trasladamos mobiliario, puestos de trabajo, servidores, equipos informáticos, archivos y otros elementos de oficina con coordinación y cuidado.',
    icon: 'Building',
    image: '/img/mudanza-oficina-800.webp',
    alt: 'Mobiliario de oficina y cajas organizadas listas para el traslado corporativo.',
    ctaText: 'Planificar Mudanza Comercial'
  },
  {
    id: 'combinada',
    title: 'Mudanzas Combinadas y Grupales',
    shortTitle: 'Combinadas',
    description: 'Para determinados trayectos nacionales o provinciales, ofrecemos la posibilidad de compartir espacio de carga con otras mudanzas compatibles. La modalidad permite optimizar el traslado manteniendo la separación, identificación y cuidado de cada pertenencia.',
    icon: 'Users',
    image: '/img/mudanza-combinada-800.webp',
    alt: 'Camión de mudanzas circulando por rutas mendocinas para un traslado compartido.',
    ctaText: 'Consultar Rutas Combinadas'
  },
  {
    id: 'embalaje',
    title: 'Embalaje Profesional',
    shortTitle: 'Embalaje',
    description: 'Preparamos tus pertenencias para el traslado utilizando materiales adecuados según cada objeto: plástico de burbujas, cajas de cartón reforzadas, film stretch, mantas acolchadas y cintas de alta adherencia. El objetivo es reducir riesgos y facilitar una carga ordenada.',
    icon: 'Package',
    image: '/img/mudanza-embalaje-800.webp',
    alt: 'Vajilla y copas embaladas individualmente en una caja rotulada.',
    ctaText: 'Contratar Embalaje Profesional'
  },
  {
    id: 'guardamuebles',
    title: 'Servicio de Guardamuebles',
    shortTitle: 'Guardamuebles',
    description: 'Ofrecemos almacenamiento temporal o de largo plazo para situaciones como contratos de alquiler, mudanzas demoradas o refacciones. Disponemos de depósitos secos, limpios e individuales con monitoreo, alarma y vigilancia presencial las 24 horas.',
    icon: 'Warehouse',
    image: '/img/mudanza-guardamuebles-800.webp',
    alt: 'Depósito de guardamuebles limpio con unidades de almacenamiento seguras.',
    ctaText: 'Consultar disponibilidad'
  },
  {
    id: 'logistica',
    title: 'Logística Integral',
    shortTitle: 'Logística',
    description: 'Brindamos soporte logístico para comercios y pymes en Mendoza, con distribución programada, almacenamiento de mercaderías, entregas directas a locales y gestión de inventarios según las necesidades de cada operación.',
    icon: 'Truck',
    image: '/img/mudanza-logistica-800.webp',
    alt: 'Operaciones de distribución y logística integral para empresas en Mendoza.',
    ctaText: 'Consultar Solución Logística'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Con cuánta antelación debo reservar mi mudanza?',
    answer: 'Recomendamos reservar con una o dos semanas de antelación para asegurar disponibilidad en el día y horario que necesitás. En temporada alta, especialmente entre diciembre y marzo, sugerimos hacerlo con unas tres semanas de anticipación.'
  },
  {
    id: 'faq-2',
    question: '¿Qué incluye el servicio básico de Mudanzas Miranda?',
    answer: 'El servicio básico incluye camión adaptado al volumen de la carga, combustible, chofer profesional habilitado, personal para carga y descarga en origen y destino, y mantas protectoras profesionales para muebles grandes.'
  },
  {
    id: 'faq-3',
    question: '¿Cómo protegen los muebles y objetos frágiles?',
    answer: 'Utilizamos mantas de lana pesadas, sogas con sistema de traba y carretillas para facilitar la manipulación. Si contratás Embalaje Profesional, protegemos vajilla, copas, muebles, colchones y sillones con materiales adecuados para cada pieza.'
  },
  {
    id: 'faq-4',
    question: '¿Las mudanzas cuentan con seguro de carga?',
    answer: 'Sí. Las mudanzas cuentan con seguro de carga de tránsito para respaldar el traslado de tus bienes ante los imprevistos contemplados por la cobertura correspondiente.'
  },
  {
    id: 'faq-5',
    question: '¿Realizan mudanzas interprovinciales o de larga distancia?',
    answer: 'Sí. Realizamos mudanzas desde Mendoza hacia Buenos Aires, Córdoba, San Luis, San Juan, Neuquén, Bariloche y otros destinos del país. Según el trayecto y la disponibilidad, podemos ofrecer modalidad Exclusiva o Combinada.'
  },
  {
    id: 'faq-6',
    question: '¿Ofrecen presupuestos cerrados o cobran por hora?',
    answer: 'Trabajamos con presupuestos de precio cerrado definidos a partir de la distancia, los accesos, el volumen y los servicios contratados. Así conocés el importe acordado antes de realizar la mudanza.'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mariana Galdame',
    role: 'Mudanza Residencial (Ciudad de Mendoza)',
    rating: 5,
    content: 'Excelente servicio de principio a fin. Llegaron puntuales, embalaron todo el living con mucho cuidado y subieron todo por escalera sin un solo raspón. Muy educados y eficientes.',
    date: 'Hace 2 semanas'
  },
  {
    id: 'test-2',
    author: 'Esteban Corvalán',
    role: 'Mudanza de Oficina (Godoy Cruz a Chacras)',
    rating: 5,
    content: 'Teníamos que mudar una oficina de desarrollo con monitores y servidores delicados. Hicieron un embalaje impecable, rotularon todo y cumplieron los tiempos acordados.',
    date: 'Hace 1 mes'
  },
  {
    id: 'test-3',
    author: 'Florencia Benítez',
    role: 'Mudanza de Larga Distancia (San Rafael a Córdoba)',
    rating: 5,
    content: 'Elegí el servicio de mudanza combinada a Córdoba y la experiencia fue muy buena. Me mantuvieron informada durante el viaje y todo llegó en la fecha acordada.',
    date: 'Hace 3 meses'
  },
  {
    id: 'test-4',
    author: 'Andrés Manzano',
    role: 'Mudanza de Casa (Maipú)',
    rating: 5,
    content: 'Un equipo muy profesional. Armaron y desarmaron las camas y un placard grande con rapidez. Tienen las herramientas adecuadas y un trato excelente.',
    date: 'Hace 2 meses'
  }
];