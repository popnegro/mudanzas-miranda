import { Service } from '../types';
import QuoteForm from '../components/QuoteForm';

interface ServicePageProps {
  service: Service;
}

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative bg-[#111111] py-24 sm:py-32 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-amber-500">Servicio Especializado</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            {service.description}
          </p>
        </div>
      </div>

      {/* Main Content & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Service Details */}
          <div className="prose prose-invert prose-lg text-slate-300">
            <h2 className="text-white">Detalles de nuestro servicio de {service.shortTitle}</h2>
            <p>
              En Mudanzas Miranda, nuestro servicio de {service.shortTitle.toLowerCase()} está diseñado para ofrecerte la máxima tranquilidad y eficiencia. Contamos con un equipo altamente capacitado y las herramientas adecuadas para manejar cada aspecto de tu traslado con el mayor cuidado.
            </p>
            <img src={service.image} alt={service.alt} className="rounded-xl shadow-lg" />
            <p>
              Ya sea que necesites un traslado completo o solo el embalaje de tus pertenencias más delicadas, nos adaptamos a tus necesidades. Nuestro compromiso es garantizar que tus bienes lleguen a su destino en perfectas condiciones y en el tiempo acordado.
            </p>
            <ul>
              <li>Personal calificado y de confianza.</li>
              <li>Flota de camiones modernos y equipados.</li>
              <li>Materiales de embalaje de alta calidad.</li>
              <li>Seguro de carga completo para tu tranquilidad.</li>
            </ul>
          </div>

          {/* Quote Form */}
          <div className="lg:sticky lg:top-24">
            <QuoteForm initialService={service.id} />
          </div>
        </div>
      </div>
    </div>
  );
}