import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  Camera, 
  Truck, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  webpSrcSet: string;
  jpgSrcSet: string;
  defaultJpg: string;
  alt: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'flota',
    title: 'Flota de Camiones Propia',
    description: 'Furgones modernos equipados para traslados locales y de larga distancia.',
    icon: <Truck className="w-4 h-4 text-amber-500" />,
    webpSrcSet: '/img/camiones-mudanzas-miranda.webp 1200w',
    jpgSrcSet: '/img/camiones-mudanzas-miranda.webp 1200w', // use webp directly for both sources since it is supported on all modern browsers
    defaultJpg: '/img/camiones-mudanzas-miranda.webp',
    alt: 'Flota de camiones furgonados de Mudanzas Miranda listos para el traslado en Mendoza.'
  },
  {
    id: 'residencial',
    title: 'Embalaje de Alta Calidad',
    description: 'Protección reforzada con mantas y film stretch para que todo llegue impecable.',
    icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
    webpSrcSet: '/img/mudanza-residencial-400.webp 400w, /img/mudanza-residencial-600.webp 600w, /img/mudanza-residencial-800.webp 800w, /img/mudanza-residencial-1200.webp 1200w',
    jpgSrcSet: '/img/mudanza-residencial-400.jpg 400w, /img/mudanza-residencial-600.jpg 600w, /img/mudanza-residencial-800.jpg 800w, /img/mudanza-residencial-1200.jpg 1200w',
    defaultJpg: '/img/mudanza-residencial-1200.jpg',
    alt: 'Operarios realizando embalaje cuidadoso de muebles para mudanza.'
  },
  {
    id: 'equipo',
    title: 'Personal Humano Capacitado',
    description: 'Personal propio con cobertura ART, capacitado para cargas seguras y trato amable.',
    icon: <Users className="w-4 h-4 text-amber-500" />,
    webpSrcSet: '/img/mudanzas-miranda-400.webp 400w, /img/mudanzas-miranda-600.webp 600w, /img/mudanzas-miranda-800.webp 800w, /img/mudanzas-miranda-1200.webp 1200w',
    jpgSrcSet: '/img/mudanzas-miranda-400.jpg 400w, /img/mudanzas-miranda-600.jpg 600w, /img/mudanzas-miranda-800.jpg 800w, /img/mudanzas-miranda-1200.jpg 1200w',
    defaultJpg: '/img/mudanzas-miranda-1200.jpg',
    alt: 'Personal de Mudanzas Miranda cargando muebles con cuidado.'
  }
];

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const PROGRESS_STEP = 50; // Update progress bar every 50ms

  // Navigation handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
    setProgress(0);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        return;
      }

      // Check if carousel is in viewport before taking focus
      const rect = containerRef.current?.getBoundingClientRect();
      const isInViewport = rect 
        ? rect.top < window.innerHeight && rect.bottom > 0 
        : false;

      if (isInViewport) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Autoplay Logic
  useEffect(() => {
    if (isPlaying && !isLightboxOpen) {
      // Setup the slide change timer
      timerRef.current = setTimeout(() => {
        handleNext();
      }, SLIDE_DURATION);

      // Setup the smooth visual progress bar updater
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const computedProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(computedProgress);
      }, PROGRESS_STEP);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying, isLightboxOpen, handleNext]);

  // Touch gesture state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  // Motion animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section className="py-20 bg-[#080808] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              Nuestra Galería de Fotos Real
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Equipamiento, camiones y equipo humano en acción
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              No mostramos fotos genéricas de bancos de imágenes. Estas fotos ilustran el verdadero equipamiento técnico y los colaboradores que resguardarán tus pertenencias en Mendoza.
            </p>
          </div>

          {/* Autoplay Controls */}
          <div className="flex items-center gap-2 self-start md:self-end bg-[#111111] border border-white/10 px-3.5 py-2 rounded-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              aria-label={isPlaying ? 'Pausar reproducción automática' : 'Iniciar reproducción automática'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-amber-500" />
                  <span>Autoplay Activo</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-emerald-500" />
                  <span>Autoplay Pausado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div 
          ref={containerRef}
          className="relative aspect-[1.35] xs:aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#121212] group shadow-2xl select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="photos-carousel-window"
        >
          {/* Mobile-only Foto counter badge */}
          <div className="absolute top-4 left-4 z-20 sm:hidden px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider">
            {currentIndex + 1} / {CAROUSEL_SLIDES.length}
          </div>

          {/* Animated Slide container */}
          <div className="absolute inset-0">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <picture>
                  <source srcSet={currentSlide.webpSrcSet} type="image/webp" />
                  <source srcSet={currentSlide.jpgSrcSet} type="image/jpeg" />
                  <img
                    src={currentSlide.defaultJpg}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                </picture>

                {/* Ambient vignette background overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-300 z-10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Text Content & Overlays (Desktop Only) */}
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 space-y-4 pointer-events-none">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-white text-xs font-semibold">
                {currentSlide.icon}
                <span className="font-bold tracking-wide">{currentSlide.title}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed drop-shadow max-w-2xl font-medium">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Maximizer / Lightbox Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-black/60 hover:bg-amber-600 border border-white/15 text-white hover:border-amber-500 backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-amber-500/10 opacity-100 sm:opacity-0 group-hover:opacity-100 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-amber-500"
            title="Expandir imagen en pantalla completa"
            aria-label="Abrir galería en pantalla completa"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Left Arrow Controls (Desktop Only) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-amber-600 border border-white/15 hover:border-amber-500 text-white backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Controls (Desktop Only) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-amber-600 border border-white/15 hover:border-amber-500 text-white backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Visual Progress Timer Bar */}
          {isPlaying && !isLightboxOpen && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 pointer-events-none">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Dots Pagination Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-4">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                index === currentIndex 
                  ? 'w-7 bg-amber-500' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ver diapositiva ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Mobile-only Text Content below the image container */}
        <div className="block sm:hidden mt-3 min-h-[90px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-2 text-left bg-white/[0.02] border border-white/5 p-4 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                {currentSlide.icon}
                <h3 className="text-base font-serif font-bold text-white leading-snug">
                  {currentSlide.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Full-Screen Lightbox Portal Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Visor de fotos ampliado"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-2">
                {currentSlide.icon}
                <span className="font-bold text-sm text-slate-300 uppercase tracking-wider">{currentSlide.title}</span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all cursor-pointer"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Centered Zoomed Image */}
            <div className="flex-grow flex items-center justify-center relative max-w-5xl mx-auto w-full my-6">
              {/* Previous Slide Button */}
              <button
                onClick={handlePrev}
                className="hidden sm:flex absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/5 hover:bg-amber-600 border border-white/10 hover:border-amber-500 text-white transition-all cursor-pointer shadow-xl"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="relative max-h-[70vh] w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl flex items-center justify-center">
                <picture>
                  <source srcSet={currentSlide.webpSrcSet} type="image/webp" />
                  <source srcSet={currentSlide.jpgSrcSet} type="image/jpeg" />
                  <img
                    src={currentSlide.defaultJpg}
                    alt={currentSlide.alt}
                    className="max-h-[70vh] object-contain max-w-full"
                  />
                </picture>
              </div>

              {/* Next Slide Button */}
              <button
                onClick={handleNext}
                className="hidden sm:flex absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/5 hover:bg-amber-600 border border-white/10 hover:border-amber-500 text-white transition-all cursor-pointer shadow-xl"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Lightbox Footer Captions */}
            <div className="text-center text-white border-t border-white/10 pt-4 max-w-3xl mx-auto w-full space-y-1">
              <p className="font-bold font-serif text-lg text-amber-500">{currentSlide.title}</p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{currentSlide.description}</p>
              
              {/* Pagination text */}
              <p className="text-xs font-mono text-slate-600 font-bold pt-2">
                FOTO {currentIndex + 1} DE {CAROUSEL_SLIDES.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
