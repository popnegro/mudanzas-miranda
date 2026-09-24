import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Home, Building, Package, Warehouse, Truck, Users } from 'lucide-react';
import { services } from '../data/staticData';
import { servicePages } from '../data/seoPages';
import FormSection from '../components/FormSection';

interface ServicesPageProps {
  handleNavigation: (slug: string) => void;
}

const IconMap: Record<string, typeof Home> = { Home: Home, Building: Building, Package: Package, Warehouse: Warehouse, Truck: Truck, Users: Users };

export default function ServicesPage({ handleNavigation }: ServicesPageProps) {
  return (
    <motion.div
      key="serviciospage"
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
          <span className="text-brand font-semibold">Servicios</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-surface text-ink overflow-hidden py-16 lg:py-20 border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F6F7F8_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            Soluciones Profesionales
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight max-w-4xl mx-auto">
            Servicios de Mudanzas y Traslados en Mendoza
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl mx-auto">
            Diseñamos cada servicio a la medida de tu necesidad. Desde mudanzas residenciales hasta logística corporativa, con más de 20 años de experiencia respaldando cada traslado.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((svc) => {
              const Icon = IconMap[svc.icon] || Truck;
              const seoPage = servicePages.find((sp) => sp.serviceId === svc.id);

              return (
                <div
                  key={svc.id}
                  className="group flex flex-col h-full gap-6 rounded-3xl border border-line bg-surface overflow-hidden transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-ink/5"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-background-soft border-b border-line">
                    <img
                      src={svc.image}
                      alt={svc.alt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="450"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 gap-4 p-6 sm:p-8 pt-0 -mt-6 bg-surface relative z-10 rounded-t-3xl">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-serif font-bold text-ink leading-snug">{svc.title}</h2>
                    </div>

                    <p className="text-sm text-ink-secondary leading-relaxed">{svc.description}</p>

                    {/* Features */}
                    {seoPage && (
                      <ul className="space-y-2">
                        {seoPage.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-ink-tertiary leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-2 flex items-center gap-3">
                      <a
                        href="#form"
                        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand/10 hover:shadow-brand/20 active:scale-[0.98]"
                      >
                        {svc.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      {seoPage && (
                        <a
                          href={`/servicios/${seoPage.slug}.html`}
                          onClick={(e) => { e.preventDefault(); handleNavigation(seoPage.slug); }}
                          className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer"
                        >
                          Ver detalle
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FormSection
        title="Cotizá el servicio que necesitás"
        subtitle="Completá el formulario inteligente para recibir tu presupuesto adaptado sin compromisos."
      />
    </motion.div>
  );
}
