import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building, Globe, Truck, Package, Warehouse } from 'lucide-react';
import PageLayout from './PageLayout';

const services = [
  { name: 'Mudanzas Residenciales', path: '/servicios/mudanzas-residenciales', icon: <Home/>, description: 'Trasladamos tu hogar con el máximo cuidado y eficiencia.' },
  { name: 'Mudanzas Corporativas', path: '/servicios/mudanzas-corporativas', icon: <Building/>, description: 'Minimizamos el tiempo de inactividad de tu oficina con una planificación experta.' },
  { name: 'Mudanzas Nacionales', path: '/servicios/mudanzas-nacionales', icon: <Globe/>, description: 'Conectamos Mendoza con todo el país, garantizando una entrega segura.' },
  { name: 'Mudanzas Locales', path: '/servicios/mudanzas-locales', icon: <Truck/>, description: 'Soluciones ágiles y rápidas para tus traslados dentro de la ciudad.' },
  { name: 'Embalaje Profesional', path: '/servicios/embalaje-profesional', icon: <Package/>, description: 'Protegemos tus pertenencias más frágiles con materiales de primera calidad.' },
  { name: 'Guardamuebles', path: '/servicios/guardamuebles', icon: <Warehouse/>, description: 'Espacios seguros y flexibles para almacenar tus bienes por el tiempo que necesites.' },
];

const ServicesPage: React.FC = () => {
  return (
    <PageLayout
      title="Nuestros Servicios"
      description="Ofrecemos una gama completa de servicios de mudanza en Mendoza, incluyendo traslados residenciales, corporativos, nacionales y embalaje profesional."
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <section className="relative bg-[#111111] py-20 md:py-32 text-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#0A0A0A_100%)]"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500">Nuestros Servicios</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Soluciones integrales y personalizadas para cada tipo de mudanza.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block p-8 bg-[#111111] border border-white/10 rounded-2xl hover:border-amber-500/50 hover:bg-[#151515] transition-all group"
                >
                  <div className="text-amber-500 mb-4">{React.cloneElement(service.icon, { className: 'w-10 h-10' })}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{service.name}</h3>
                  <p className="text-slate-400 mb-4 text-sm">{service.description}</p>
                  <span className="flex items-center text-sm font-semibold text-amber-500 group-hover:text-amber-400">
                    Ver más <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
