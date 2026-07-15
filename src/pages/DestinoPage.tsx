import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import PageLayout from './PageLayout';

const DestinoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Destino no encontrado</h1>
        <Link to="/destinos" className="text-amber-500 hover:underline mt-4 inline-block">Volver a Destinos</Link>
      </div>
    );
  }

  return (
    <PageLayout
      title={destination.title.replace(' - Mudanzas Miranda', '')}
      description={destination.description}
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Breadcrumbs */}
        <div className="bg-[#0D0D0D] border-b border-white/10 py-3 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/destinos" className="text-amber-500 hover:text-amber-400 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Volver a todos los destinos
                </Link>
            </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <p className="text-amber-500 font-bold uppercase tracking-wider">{destination.region}</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mt-2">{destination.heroHeadline}</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">{destination.heroSubheadline}</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
            <div className="max-w-3xl mx-auto px-4 space-y-6 text-slate-300 leading-relaxed">
                <p className="font-semibold text-lg">{destination.leadText}</p>
                <p>{destination.detailText}</p>
            </div>
        </section>

         {/* Quote Form Section */}
        <section id="form" className="py-20 bg-[#111111] border-t border-white/10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Cotizá tu mudanza a {destination.name}</h2>
                    <p className="text-slate-400 text-sm mt-2">
                      Obtené un presupuesto a medida para tu traslado.
                    </p>
                </div>
                <QuoteForm />
            </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default DestinoPage;
