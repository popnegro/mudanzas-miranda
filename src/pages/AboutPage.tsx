import { motion } from 'motion/react';
import { Heart, History, Target, Users, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import FormSection from '../components/FormSection';

interface AboutPageProps {
  handleNavigation: (slug: string) => void;
}

interface InstitutionalCardProps {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

const cardClassName =
  'flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-[#111111] p-7 transition-all duration-300 hover:border-amber-500/30 sm:p-8';

function InstitutionalCard({ eyebrow, title, icon: Icon, children }: InstitutionalCardProps) {
  return (
    <article className={cardClassName}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-500">
        <Icon className="h-6 w-6" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80">
          {eyebrow}
        </span>
        <h2 className="text-xl font-serif font-bold leading-snug text-white">{title}</h2>
      </div>

      {children}
    </article>
  );
}

export default function AboutPage({ handleNavigation }: AboutPageProps) {
  return (
    <motion.div
      key="nosotrospage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0A0A0A]"
    >
      {/* Breadcrumbs */}
      <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handleNavigation('');
            }}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
          >
            Inicio
          </a>
          <span>/</span>
          <span className="text-amber-500 font-medium font-semibold">Nosotros</span>
        </div>
      </div>

      {/* Nosotros Hero Section */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515_0%,#0A0A0A_100%)] z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            Trayectoria y Compromiso Institucional
          </div>

          <h1 className="mx-auto max-w-4xl text-center text-4xl font-serif font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nuestra Identidad y Compromiso con Mendoza
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Conocé la historia, la misión y los valores de <strong>Mudanzas Miranda</strong>. Más de 20 años de experiencia transformando los traslados en experiencias tranquilas, profesionales y seguras.
          </p>
        </div>
      </section>

      {/* Institutional Sections */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <InstitutionalCard eyebrow="Trayectoria" title="Nuestra Historia" icon={History}>
              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  Mudanzas Miranda nació hace más de dos décadas en la provincia de Mendoza como un emprendimiento familiar enfocado en brindar un servicio de transporte personalizado, cuidadoso y cercano.
                </p>
                <p>
                  Con esfuerzo y constancia, incorporamos camiones modernos equipados con sistemas de fijación avanzados y capacitamos a un equipo técnico especializado en el embalaje de objetos de alto valor y montajes complejos. Hoy, nos enorgullece ser la empresa referente elegida por miles de familias y oficinas mendocinas.
                </p>
              </div>
            </InstitutionalCard>

            <InstitutionalCard eyebrow="Propósito" title="Nuestra Misión" icon={Target}>
              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  Nuestra misión fundamental es redefinir la experiencia de mudarse, eliminando el estrés y la incertidumbre que comúnmente acompañan a los traslados y transportes residenciales o corporativos.
                </p>
                <p>
                  Trabajamos incansablemente para proveer soluciones logísticas eficientes, transparentes y de altísima calidad, respaldadas por un equipo humano comprometido con el cuidado absoluto de cada objeto y la puntualidad inquebrantable en cada entrega.
                </p>
              </div>
            </InstitutionalCard>

            <InstitutionalCard eyebrow="Principios" title="Nuestros Valores" icon={Heart}>
              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-slate-300">
                  Los pilares éticos y operativos que guían cada uno de nuestros servicios diarios.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-3 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-500">Confianza y Respeto</h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Tratamos tu hogar y tus pertenencias con la máxima delicadeza, reconociendo el valor sentimental de cada pieza.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-500">Seguridad Total</h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Implementamos protocolos rigurosos de embalaje y transporte junto con coberturas viales completas de tránsito.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-500">Puntualidad Absoluta</h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Planificamos detalladamente los horarios de carga y descarga para cumplir estrictamente con los tiempos pactados.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-500">Transparencia</h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Ofrecemos presupuestos cerrados, honestos y claros desde el primer momento, sin sorpresas ni cargos ocultos.
                  </p>
                </div>
              </div>
            </InstitutionalCard>
          </div>
        </div>
      </section>

      <FormSection title="Tu mudanza en 2 pasos" />
    </motion.div>
  );
}
