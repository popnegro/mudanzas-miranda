import { motion } from 'motion/react';
import { MapPin, ArrowRight, Navigation, Truck, Building, Mountain } from 'lucide-react';
import { destinations } from '../data/destinations';
import FormSection from '../components/FormSection';

interface DestinationsPageProps {
  handleNavigation: (slug: string) => void;
}

const REGION_META: Record<string, { icon: typeof MapPin; description: string }> = {
  'Gran Mendoza': { icon: Building, description: 'Cobertura capilar en los seis departamentos del oasis metropolitano, con tiempos de respuesta inmediatos.' },
  'Zona Este y Valle de Uco': { icon: Mountain, description: 'Traslados coordinados a San Martín, Junín, Rivadavia y todo el Valle de Uco con embalaje reforzado para rutas.' },
  'Sur de Mendoza': { icon: Truck, description: 'Conectamos San Rafael, General Alvear y Malargüe con el resto del país mediante flota preparada para larga distancia.' },
};

export default function DestinationsPage({ handleNavigation }: DestinationsPageProps) {
  const regions = Array.from(new Set(destinations.map((d) => d.region)));

  return (
    <motion.div
      key="destinospage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background"
    >
      {/* Breadcrumbs */}
      <div className="bg-background-soft border-b border-line text-ink-subtle py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="hover:text-ink transition-colors cursor-pointer font-semibold">Inicio</a>
          <span>/</span>
          <span className="text-brand font-semibold">Destinos</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-surface text-ink overflow-hidden py-16 lg:py-20 border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F6F7F8_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4" />
            Cobertura Provincial
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight max-w-4xl mx-auto">
            Zonas de Cobertura y Destinos
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl mx-auto">
            Llegamos a cada rincón de la provincia de Mendoza y conectamos la región con traslados interprovinciales a todo el país. Conocé nuestras zonas prioritarias de atención.
          </p>
        </div>
      </section>

      {/* Coverage Regions Grid */}
      <section className="py-20 bg-background-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {regions.map((regionName) => {
            const regionDests = destinations.filter((d) => d.region === regionName);
            const meta = REGION_META[regionName] || { icon: MapPin, description: '' };
            const RegionIcon = meta.icon;

            return (
              <div key={regionName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand flex-shrink-0">
                    <RegionIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-bold text-ink tracking-tight">{regionName}</h2>
                    <p className="text-sm text-ink-secondary leading-relaxed max-w-2xl">{meta.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionDests.map((dest) => (
                    <div
                      key={dest.slug}
                      className="group flex flex-col h-full gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-md hover:shadow-ink/5 hover:-translate-y-1"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand flex-shrink-0" />
                          <h3 className="text-lg font-bold text-ink">{dest.name}</h3>
                        </div>
                        <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3">{dest.leadText}</p>
                      </div>
                      <div className="mt-auto pt-2">
                        <a
                          href={`/mudanzas-mendoza/${dest.slug}.html`}
                          onClick={(e) => { e.preventDefault(); handleNavigation(dest.slug); }}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer"
                        >
                          Ver cobertura en {dest.name}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FormSection
        title="Cotizá tu mudanza a cualquier destino"
        subtitle="Completá el formulario y recibí tu presupuesto adaptado sin compromisos."
      />
    </motion.div>
  );
}
