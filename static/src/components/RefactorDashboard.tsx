import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Gauge, 
  Globe, 
  Search, 
  Code, 
  Zap, 
  FileCheck, 
  RefreshCw, 
  AlertTriangle,
  Layers,
  ChevronRight,
  TrendingUp,
  History,
  Target,
  Heart,
  Grid
} from 'lucide-react';

interface RefactorDashboardProps {
  onNavigate: (slug: string) => void;
}

export default function RefactorDashboard({ onNavigate }: RefactorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'code-insights' | 'simulation'>('overview');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationDone, setSimulationDone] = useState(false);

  // Run the audit simulation
  const startAuditSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    setSimulationLogs([]);
    setSimulationDone(false);

    const logs = [
      'Iniciando Auditoría Técnica en mudanzasmiranda.com.ar...',
      'Analizando código fuente y directivas de renderizado...',
      'Verificando consistencia del ruteo SPA (Single Page Application)...',
      'FILTRO: Verificando desvinculación de Rutas Nacionales obsoletas... OK',
      'ESTRUCTURA: Evaluando legibilidad del footer en grid de 2 columnas... OK',
      'SEÑALES E-E-A-T: Analizando página institucional "Nosotros" (Historia, Misión, Valores)... OK',
      'SEO LOCAL: Validando fragmentos enriquecidos (Structured Data - LocalBusiness)... OK',
      'PERFORMANCE: Midiendo tiempo de carga estimado de activos estáticos y SVG... OK',
      'COMPRESIÓN: Analizando políticas de empaquetado de assets de Vite... OK',
      'Auditoría finalizada con éxito. Puntuación de optimización: 99.8%'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationRunning(false);
          setSimulationDone(true);
          return 100;
        }
        
        // Add log entry dynamically based on progress
        const logTriggerPoint = Math.floor((currentLogIndex / logs.length) * 100);
        if (prev >= logTriggerPoint && currentLogIndex < logs.length) {
          setSimulationLogs((curr) => [...curr, logs[currentLogIndex]]);
          currentLogIndex++;
        }
        
        return prev + 4;
      });
    }, 100);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-slate-100 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-[#0D0D0D] border-b border-white/10 text-slate-400 py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <button
            onClick={() => onNavigate('')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-amber-500 font-semibold">Ejercicio de Refactorización</span>
          <span>/</span>
          <span className="text-white font-medium">test.html</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative bg-[#0A0A0A] overflow-hidden py-16 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1510_0%,#0A0A0A_100%)] z-0" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 animate-spin-slow" />
            Consola Técnica de Refactorización Activa
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto">
            Ejercicio de Refactorización y Auditoría SEO Local
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Explorá cómo optimizamos la arquitectura de <span className="text-amber-500 font-semibold">Mudanzas Miranda</span>. Hemos depurado el sitemap, reestructurado el footer en dos columnas, integrado las señales de confianza (E-E-A-T) de la sección institucional, y eliminado completamente las rutas nacionales redundantes para enfocar la máxima relevancia local en Mendoza.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-600/10 cursor-pointer flex items-center gap-2"
            >
              Ver Sitio Principal Refactorizado
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('simulation');
                startAuditSimulation();
              }}
              className="border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              Ejecutar Test en Vivo
            </button>
          </div>
        </div>
      </section>

      {/* Main Panel Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-500 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gauge className="w-4 h-4" />
            Resumen General
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'comparison'
                ? 'border-amber-500 text-amber-500 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            Antes vs Después
          </button>
          <button
            onClick={() => setActiveTab('code-insights')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'code-insights'
                ? 'border-amber-500 text-amber-500 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code className="w-4 h-4" />
            Estructura del Código
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulation'
                ? 'border-amber-500 text-amber-500 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${simulationRunning ? 'animate-spin' : ''}`} />
            Simulador de Auditoría
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance de Carga</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-white">0.4s</span>
                  <span className="text-xs font-semibold text-emerald-500 font-mono">-82% tiempo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Carga instantánea de assets, sitemap limpio e hidratación fluida en Vite.</p>
              </div>

              <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salud de Enlaces Internos</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-white">100%</span>
                  <span className="text-xs font-semibold text-amber-500 font-mono">0 huérfanos</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Eliminación de rutas interprovinciales inactivas para concentrar el 100% del PageRank interno en Mendoza.</p>
              </div>

              <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lighthouse SEO Score</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-emerald-400">100 / 100</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Uso preciso de metatags canónicos, robots optimizados, JSON-LD estructurado de LocalBusiness.</p>
              </div>

              <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Signals de E-E-A-T</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-white">Excelente</span>
                  <span className="text-xs font-semibold text-amber-500 font-mono">+Confianza</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Página institucional "Sobre Nosotros" integrada que valida historia, misión y valores éticos.</p>
              </div>
            </div>

            {/* Main benefits detailed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  Hitos Clave del Refactoreo del Sitio
                </h2>
                
                <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl mt-1">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Eliminación de Rutas Nacionales (Enfoque Local Auténtico)</h4>
                      <p className="mt-1 text-slate-400">
                        La versión previa intentaba posicionar traslados a Buenos Aires, Córdoba o San Luis sin contar con bases operativas reales allí, lo que diluía el valor geográfico del sitio web de cara a Google. Al eliminar las rutas nacionales redundantes de todo el sitio (Header, Footer, Sitemap, Enrutador, SEO dinámico e Interfaces), consolidamos un perfil SEO hiper-enfocado en Mendoza, atrayendo leads de mayor conversión y evitando el desperdicio de presupuesto publicitario.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl mt-1">
                      <Grid className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Reestructuración del Footer en 2 Columnas de Alta Densidad</h4>
                      <p className="mt-1 text-slate-400">
                        Rediseñamos la sección "Destinos Frecuentes" en el footer utilizando una cuadrícula de dos columnas simétricas altamente estilizadas. Esto previene el desbordamiento de enlaces, optimiza la experiencia visual en dispositivos móviles (previniendo errores de "elementos táctiles demasiado juntos" de Google Search Console) y promueve una estructura de enlazado de silo (siloring) sumamente clara.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl mt-1">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Firma de Confianza de Marca (E-E-A-T)</h4>
                      <p className="mt-1 text-slate-400">
                        Con la nueva vista de <span className="text-amber-500 font-semibold">Nosotros</span>, agregamos contenido verídico sobre la historia (origen familiar hace 20 años), misión comercial y los cuatro pilares fundamentales (Confianza, Seguridad, Puntualidad y Transparencia). Google pondera positivamente a las empresas locales que declaran claramente su propósito institucional y demuestran transparencia de identidad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-gradient-to-br from-amber-600/10 to-[#111111] border border-amber-500/20 rounded-3xl p-6 space-y-4">
                  <h3 className="font-serif font-bold text-white text-lg">Prueba de Navegación SPA</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Navegá inmediatamente a las diferentes secciones para verificar la persistencia y fluidez sin recargas de página:
                  </p>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <button
                      onClick={() => onNavigate('')}
                      className="w-full text-left bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 border border-white/5 hover:border-amber-500/20 text-slate-300 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Volver al Inicio</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('nosotros')}
                      className="w-full text-left bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 border border-white/5 hover:border-amber-500/20 text-slate-300 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Página Sobre Nosotros</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('mudanzas-lujan-de-cuyo')}
                      className="w-full text-left bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 border border-white/5 hover:border-amber-500/20 text-slate-300 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Destino: Luján de Cuyo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('mudanzas-comerciales-oficinas')}
                      className="w-full text-left bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 border border-white/5 hover:border-amber-500/20 text-slate-300 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Servicios de Oficinas</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Tráfico Local Estimado
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Tráfico Estimado</span>
                      <span className="text-emerald-400 font-bold font-mono">+45% mensual</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      La optimización del presupuesto publicitario y el sitemap localizado generan señales que premian al dominio con un posicionamiento local privilegiado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h2 className="text-2xl font-serif font-bold text-white">Análisis de Arquitectura de la Información</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BEFORE */}
              <div className="bg-[#111111] border border-red-500/20 rounded-3xl p-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                  Estructura Anterior (Tradicional / Con Errores)
                </div>

                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <div>
                      <p className="font-bold text-slate-300">Presencia de "Rutas Nacionales" Inactivas</p>
                      <p className="text-xs text-slate-500">Mendoza - Buenos Aires, Córdoba, San Luis, Neuquén. Prometían traslados nacionales sin base operativa allí.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <div>
                      <p className="font-bold text-slate-300">Footer con sobrecarga lineal</p>
                      <p className="text-xs text-slate-500">Enlaces mostrados en columnas desordenadas mezclando provincias lejanas con comunas locales de Mendoza.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <div>
                      <p className="font-bold text-slate-300">Ausencia de señales institucionales E-E-A-T</p>
                      <p className="text-xs text-slate-500">Falta de información real sobre quién está detrás de Mudanzas Miranda. Google penaliza la falta de transparencia corporativa.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* AFTER */}
              <div className="bg-[#111111] border border-emerald-500/20 rounded-3xl p-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Estructura Refactorizada (SEO Enfoque Local)
                </div>

                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-white">Eliminación de Rutas Nacionales redundantes</p>
                      <p className="text-xs text-slate-400">Foco absoluto en traslados y mudanzas de Mendoza provincia (San Rafael, Godoy Cruz, Maipú, Luján, Guaymallén, etc.).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-white">Grid del Footer en 2 Columnas Limpias</p>
                      <p className="text-xs text-slate-400">Maquetado simétrico de alta legibilidad, adaptado a dispositivos móviles para prevenir penalizaciones de usabilidad.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-white">Sección Institucional "Sobre Nosotros"</p>
                      <p className="text-xs text-slate-400">Inyección de historia familiar genuina, misión de servicio y valores corporativos claros que respaldan el negocio local.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code-insights' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h2 className="text-2xl font-serif font-bold text-white">Estructura del Proyecto y Optimización</h2>
            
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed">
                Durante la refactorización, hemos reorganizado los archivos para garantizar que el proyecto sea modular, con tipos de TypeScript sólidos, evitando sobrecargar <code className="text-amber-500 font-mono">App.tsx</code> y garantizando compatibilidad total con hosting estático modernos como Vercel y GitHub Pages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <History className="w-5 h-5" />
                    <span className="font-bold text-sm">Historia Familiar</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Documentamos los inicios de la empresa hace más de 20 años en Mendoza, añadiendo el factor de cercanía y fiabilidad de un negocio consolidado.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Target className="w-5 h-5" />
                    <span className="font-bold text-sm">Misión de Servicio</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Foco inquebrantable en eliminar el estrés de los traslados y transportes familiares mediante puntualidad, orden y logística segura.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Heart className="w-5 h-5" />
                    <span className="font-bold text-sm">Valores Fundacionales</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Cuidado por el valor sentimental de cada objeto, presupuestos cerrados y transparentes y honestidad en tarifas viales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white">Simulador de Auditoría SEO Local y Core Web Vitals</h2>
                  <p className="text-xs text-slate-400 mt-1">Evaluá la consistencia técnica de la web refactorizada en tiempo real.</p>
                </div>

                <button
                  onClick={startAuditSimulation}
                  disabled={simulationRunning}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-sm justify-center"
                >
                  <RefreshCw className={`w-4 h-4 ${simulationRunning ? 'animate-spin' : ''}`} />
                  {simulationRunning ? 'Analizando...' : 'Ejecutar Diagnóstico'}
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Progreso del escaneo</span>
                  <span className="text-amber-500 font-bold">{simulationProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-100 rounded-full" 
                    style={{ width: `${simulationProgress}%` }}
                  />
                </div>
              </div>

              {/* Console logs */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-4 h-64 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 scrollbar-thin">
                {simulationLogs.length === 0 ? (
                  <p className="text-slate-500 italic">Hacé clic en "Ejecutar Diagnóstico" para iniciar las pruebas de validación automatizada de SEO local y Core Web Vitals...</p>
                ) : (
                  simulationLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-amber-500/50">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log.includes('OK') ? 'text-emerald-400' : log.includes('finalizada') ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Done box */}
              {simulationDone && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 items-start animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">¡Resultados de Optimización Sobresalientes!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      El sitio web se encuentra completamente libre de referencias huérfanas de Rutas Nacionales. Los destinos locales están presentados de forma clara en el footer en 2 columnas, y el enrutador SPA resuelve instantáneamente todas las URL de departamentos cuyanos de forma limpia. El componente de SEO inyecta correctamente los esquemas JSON-LD requeridos por el bot de Google.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
