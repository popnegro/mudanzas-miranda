import { ArrowRight, MapPin } from 'lucide-react';
import { Destination } from '../types';

interface DestinationsPageProps {
  destinations: Destination[];
  handleNavigation: (slug: string) => void;
}

const REGION_ORDER = ['Gran Mendoza', 'Zona Este y Valle de Uco', 'Sur de Mendoza'];

export default function DestinationsPage({ destinations, handleNavigation }: DestinationsPageProps) {
  const regions = REGION_ORDER
    .map((region) => ({
      region,
      items: destinations.filter((destination) => destination.region === region),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <section className="bg-white text-slate-700">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 sm:px-6 sm:text-sm lg:px-8">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation(''); }} className="font-semibold hover:text-slate-900">Inicio</a>
          <span className="mx-2">/</span>
          <span className="font-semibold text-orange-700">Destinos</span>
        </div>
      </div>
      <header className="bg-[#0A0A0A] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500">Cobertura local</p>
          <h1 className="mt-4 text-3xl font-serif font-bold tracking-tight sm:text-5xl">Destinos de Mudanzas en Mendoza</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">Encontrá tu localidad y consultá la cobertura disponible para tu mudanza.</p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {regions.map(({ region, items }) => (
          <section key={region} className="mb-12 last:mb-0" aria-labelledby={region.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}>
            <div className="mb-6">
              <h2 id={region.replace(/[^a-z0-9]+/gi, '-').toLowerCase()} className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">{region}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((destination) => (
                <a key={destination.slug} href={`/mudanzas-mendoza/${destination.slug}.html`} onClick={(e) => { e.preventDefault(); handleNavigation(destination.slug); }} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-700"><MapPin className="h-6 w-6" aria-hidden="true" /></div>
                    <ArrowRight className="mt-2 h-4 w-4 text-orange-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-800 group-hover:text-orange-800">Mudanzas en {destination.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{destination.heroSubheadline}</p>
                  <span className="mt-auto pt-5 text-sm font-bold text-orange-700">Ver destino</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
    </section>
  );
}
