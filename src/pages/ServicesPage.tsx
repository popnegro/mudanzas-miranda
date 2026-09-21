import { ArrowRight, Home, Building2, Package, Warehouse, Truck, Boxes } from 'lucide-react';
import { servicePages } from '../data/seoPages';

const icons = [Home, Building2, Package, Warehouse, Boxes, Truck];

interface ServicesPageProps {
  handleNavigation: (slug: string) => void;
}

export default function ServicesPage({ handleNavigation }: ServicesPageProps) {
  return (
    <section className="bg-white text-slate-700">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 sm:px-6 sm:text-sm lg:px-8">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="font-semibold hover:text-slate-900">Inicio</a>
          <span className="mx-2">/</span>
          <span className="font-semibold text-orange-700">Servicios</span>
        </div>
      </div>

      <header className="bg-[#0A0A0A] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500">Soluciones de mudanza y logística</p>
          <h1 className="mt-4 text-3xl font-serif font-bold tracking-tight sm:text-5xl">Servicios de Mudanzas Miranda</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Elegí la solución que necesitás: mudanzas residenciales, oficinas, embalaje, guardamuebles, traslados combinados o logística comercial.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="services-grid-title">
          <div className="mb-8 max-w-3xl">
            <h2 id="services-grid-title" className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Encontrá el servicio adecuado para tu mudanza</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Cada servicio responde a una necesidad diferente. Conocé qué incluye cada alternativa antes de solicitar tu presupuesto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article key={service.slug} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-700"><Icon className="h-6 w-6" aria-hidden="true" /></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Servicio</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-800">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.heroSubheadline}</p>
                  <a href={`/servicios/${service.slug}.html`} onClick={(e) => { e.preventDefault(); handleNavigation(service.slug); }} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800">
                    Ver servicio <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </section>
  );
}
