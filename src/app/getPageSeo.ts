import { destinations } from '../data/destinations';
import { servicePages } from '../data/seoPages';

type Destination = (typeof destinations)[number];
type ServicePage = (typeof servicePages)[number];

const HOME_TITLE = 'Mudanzas en Mendoza - Profesionales y Seguras | Mudanzas Miranda';
const HOME_DESCRIPTION = 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Rápido, seguro y sin estrés. ¡Cotizá tu mudanza online en minutos!';
const SITE_URL = 'https://www.mudanzasmiranda.com.ar';

export function getPageSeo(
  activePage: string,
  currentDestination?: Destination,
  currentService?: ServicePage,
) {
  if (activePage === 'nosotros') {
    return {
      title: 'Sobre Nosotros - Historia, Misión y Valores | Mudanzas Miranda',
      description: 'Conocé la historia, misión y valores de Mudanzas Miranda. Más de 20 años de trayectoria brindando tranquilidad y confianza en mudanzas en Mendoza.',
      canonicalUrl: `${SITE_URL}/nosotros.html`,
    };
  }

  if (currentDestination) {
    return {
      title: currentDestination.title,
      description: currentDestination.description,
      canonicalUrl: `${SITE_URL}/mudanzas-mendoza/${currentDestination.slug}.html`,
    };
  }

  if (currentService) {
    return {
      title: currentService.title,
      description: currentService.description,
      canonicalUrl: `${SITE_URL}/servicios/${currentService.slug}.html`,
    };
  }

  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonicalUrl: SITE_URL,
  };
}
