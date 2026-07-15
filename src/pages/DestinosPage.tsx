import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { ArrowRight } from 'lucide-react';
import PageLayout from './PageLayout';

// Agrupa dinámicamente los destinos por su departamento.
const groupDestinationsByDepartment = () => {
  return destinations.reduce((acc, destination) => {
    const { region } = destination; // 'region' ahora funciona como 'departamento'
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<string, typeof destinations>);
};

const DestinosPage: React.FC = () => {
  const destinationsByDepartment = groupDestinationsByDepartment();

  return (
    <PageLayout
      title="Destinos de Mudanza"
      description="Ofrecemos servicios de mudanza en todo Mendoza. Conocé nuestras áreas de cobertura y encontrá información específica para tu localidad."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Nuestros Destinos</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Servicio especializado en cada rincón de Mendoza.
            </p>
          </div>
        </section>

        {/* Destinations List Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            {Object.entries(destinationsByDepartment).map(([department, districts]) => (
              <div key={department} className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-amber-500 mb-6 border-b border-white/10 pb-3">{department}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {districts.map(dest => (
                    <Link
                      key={dest.slug}
                      to={`/destinos/${dest.slug}`}
                      className="block p-6 bg-[#111111] border border-white/10 rounded-lg hover:border-amber-500/50 hover:bg-[#151515] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white">{dest.name}</h3>
                        <ArrowRight className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default DestinosPage;
