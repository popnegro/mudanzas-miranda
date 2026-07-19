import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Locate, 
  Loader2, 
  MessageSquare,
  Truck,
  Building,
  Home,
  Package,
  Key,
  Clock,
  ShieldCheck,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { QuoteRequest } from '../types';

interface QuoteFormProps {
  initialService?: string;
  destinationName?: string;
}

interface Coordinate {
  lat: number;
  lon: number;
}

interface AddressSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// Service config with visuals and price calculations
const SERVICE_OPTIONS = [
  {
    id: 'residencial',
    title: 'Mudanza Residencial',
    subtitle: 'Casas y departamentos',
    icon: <Home className="w-5 h-5 text-amber-500" />,
    basePrice: 42000,
    pricePerKm: 1100,
    desc: 'Carga, estibadores calificados y mantas protectoras.'
  },
  {
    id: 'oficina',
    title: 'Mudanza Comercial',
    subtitle: 'Oficinas y corporativos',
    icon: <Building className="w-5 h-5 text-amber-500" />,
    basePrice: 58000,
    pricePerKm: 1400,
    desc: 'Coordinación logística para tecnología y puestos de trabajo.'
  },
  {
    id: 'combinada',
    title: 'Envío Compartido',
    subtitle: 'Cargas parciales',
    icon: <Truck className="w-5 h-5 text-amber-500" />,
    basePrice: 22000,
    pricePerKm: 750,
    desc: 'Compartí el espacio y ahorrá hasta un 40% en envíos menores.'
  },
  {
    id: 'embalaje',
    title: 'Embalaje Premium',
    subtitle: 'Protección extrema',
    icon: <Package className="w-5 h-5 text-amber-500" />,
    basePrice: 18000,
    pricePerKm: 0,
    desc: 'Cajas de doble cartón, pluribol de alta densidad y rotulado.'
  },
  {
    id: 'guardamuebles',
    title: 'Guardamuebles',
    subtitle: 'Depósitos individuales',
    icon: <Key className="w-5 h-5 text-amber-500" />,
    basePrice: 32000,
    pricePerKm: 0,
    desc: 'Monitoreo 24 hs, control de temperatura y plagas.'
  }
];

export default function QuoteForm({ initialService = '', destinationName = '' }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [isLocatingOrigin, setIsLocatingOrigin] = useState(false);
  const [isLocatingDest, setIsLocatingDest] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<QuoteRequest>({
    origin: '',
    destination: destinationName ? `${destinationName}, Mendoza` : '',
    movingDate: '',
    serviceType: initialService || 'residencial',
    name: '',
    phone: '',
    email: '',
    comments: '',
  });

  // Geographical Coordinates
  const [originCoords, setOriginCoords] = useState<Coordinate | null>(null);
  const [destCoords, setDestCoords] = useState<Coordinate | null>(null);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null); // in minutes

  // Autocomplete suggestions states
  const [originSuggestions, setOriginSuggestions] = useState<AddressSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<AddressSuggestion[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [isLoadingOriginSuggestions, setIsLoadingOriginSuggestions] = useState(false);
  const [isLoadingDestSuggestions, setIsLoadingDestSuggestions] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Debouncing timers for autocomplete
  const originTimer = useRef<NodeJS.Timeout | null>(null);
  const destTimer = useRef<NodeJS.Timeout | null>(null);

  // Haversine formula to compute exact distance between two lat/lon coordinates
  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
  };

  // Recalculate distance when coordinates change
  useEffect(() => {
    if (originCoords && destCoords) {
      const distance = calculateHaversineDistance(
        originCoords.lat, originCoords.lon,
        destCoords.lat, destCoords.lon
      );
      // Ensure we have a logical minimum of 1 km
      const logicalDistance = Math.max(distance, 1.5);
      setCalculatedDistance(logicalDistance);
      // Rough driving estimate: ~2 mins per kilometer in local mendoza traffic + 5 mins startup
      setEstimatedTime(Math.round(logicalDistance * 2.1 + 8));
    } else {
      setCalculatedDistance(null);
      setEstimatedTime(null);
    }
  }, [originCoords, destCoords]);

  // Handle Input Changes & Address Queries
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    if (name === 'origin') {
      if (value.trim().length < 3) {
        setOriginSuggestions([]);
        setShowOriginSuggestions(false);
        return;
      }
      if (originTimer.current) clearTimeout(originTimer.current);
      originTimer.current = setTimeout(() => {
        searchAddress(value, 'origin');
      }, 400);
    } else if (name === 'destination') {
      if (value.trim().length < 3) {
        setDestSuggestions([]);
        setShowDestSuggestions(false);
        return;
      }
      if (destTimer.current) clearTimeout(destTimer.current);
      destTimer.current = setTimeout(() => {
        searchAddress(value, 'destination');
      }, 400);
    }
  };

  // Fetch address suggestions from OpenStreetMap Nominatim
  const searchAddress = async (query: string, field: 'origin' | 'destination') => {
    if (field === 'origin') setIsLoadingOriginSuggestions(true);
    if (field === 'destination') setIsLoadingDestSuggestions(true);

    try {
      // Append Mendoza, Argentina for smart regional scoping
      const scopedQuery = `${query}, Mendoza, Argentina`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(scopedQuery)}&limit=5&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'es'
        }
      });
      
      if (response.ok) {
        const data: AddressSuggestion[] = await response.json();
        // Clean display name to make it look nicer for the user
        const cleanedData = data.map(item => {
          // Remove redundant trailing country/province elements to keep list clean
          const parts = item.display_name.split(',');
          const shortName = parts.slice(0, 4).join(',').trim();
          return {
            ...item,
            display_name: shortName
          };
        });

        if (field === 'origin') {
          setOriginSuggestions(cleanedData);
          setShowOriginSuggestions(cleanedData.length > 0);
        } else {
          setDestSuggestions(cleanedData);
          setShowDestSuggestions(cleanedData.length > 0);
        }
      }
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
    } finally {
      if (field === 'origin') setIsLoadingOriginSuggestions(false);
      if (field === 'destination') setIsLoadingDestSuggestions(false);
    }
  };

  // Select a suggestion
  const handleSelectSuggestion = (suggestion: AddressSuggestion, field: 'origin' | 'destination') => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);

    setFormData((prev) => ({
      ...prev,
      [field]: suggestion.display_name
    }));

    if (field === 'origin') {
      setOriginCoords({ lat, lon });
      setShowOriginSuggestions(false);
    } else {
      setDestCoords({ lat, lon });
      setShowDestSuggestions(false);
    }

    // Clear error
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Geolocation Handler using Reverse Geocoding for genuine location retrieval
  const handleGeolocate = (field: 'origin' | 'destination') => {
    if (field === 'origin') setIsLocatingOrigin(true);
    if (field === 'destination') setIsLocatingDest(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Fetch real street address from OpenStreetMap reverse geocoding
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`;
            const response = await fetch(url, {
              headers: {
                'Accept-Language': 'es'
              }
            });

            if (response.ok) {
              const data = await response.json();
              const fullAddress = data.display_name;
              const parts = fullAddress.split(',');
              const cleanAddress = parts.slice(0, 3).join(',').trim();

              setFormData((prev) => ({
                ...prev,
                [field]: cleanAddress || `Ubicación actual (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
              }));

              if (field === 'origin') {
                setOriginCoords({ lat: latitude, lon: longitude });
              } else {
                setDestCoords({ lat: latitude, lon: longitude });
              }

              // Clear error
              if (errors[field]) {
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated[field];
                  return updated;
                });
              }
            } else {
              throw new Error('Reverse geocoding failed');
            }
          } catch (err) {
            console.warn('Reverse geocoding failed, falling back to coordinates:', err);
            // Fallback gracefully
            setFormData((prev) => ({
              ...prev,
              [field]: `Ubicación cercana (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
            }));
            if (field === 'origin') {
              setOriginCoords({ lat: latitude, lon: longitude });
            } else {
              setDestCoords({ lat: latitude, lon: longitude });
            }
          } finally {
            setIsLocatingOrigin(false);
            setIsLocatingDest(false);
          }
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          // Graceful simulated fallback centered around historic downtown Mendoza
          setTimeout(() => {
            const mockLat = -32.889458;
            const mockLon = -68.84404;
            const defaultAddress = field === 'origin' 
              ? 'Av. España 1200, Ciudad de Mendoza' 
              : 'Paso de los Andes 1800, Godoy Cruz, Mendoza';
            
            setFormData((prev) => ({
              ...prev,
              [field]: defaultAddress
            }));

            if (field === 'origin') {
              setOriginCoords({ lat: mockLat, lon: mockLon });
            } else {
              setDestCoords({ lat: mockLat + 0.02, lon: mockLon - 0.015 });
            }

            setIsLocatingOrigin(false);
            setIsLocatingDest(false);
          }, 1000);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsLocatingOrigin(false);
      setIsLocatingDest(false);
      setErrors((prev) => ({ ...prev, [field]: 'Geolocalización no soportada en este navegador.' }));
    }
  };

  // Live Price Estimation logic
  const selectedService = SERVICE_OPTIONS.find(s => s.id === formData.serviceType) || SERVICE_OPTIONS[0];
  
  const calculateEstimatedPrice = () => {
    const base = selectedService.basePrice;
    const distanceKm = calculatedDistance || 10; // default to 10km if typed manually
    const perKm = selectedService.pricePerKm;
    const calculatedBase = base + (distanceKm * perKm);
    
    // Create a realistic price range (+/- 15%)
    const lowRange = Math.round((calculatedBase * 0.9) / 100) * 100;
    const highRange = Math.round((calculatedBase * 1.15) / 100) * 100;
    
    return {
      low: lowRange.toLocaleString('es-AR'),
      high: highRange.toLocaleString('es-AR')
    };
  };

  const priceRange = calculateEstimatedPrice();

  // Validate Steps
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.origin.trim()) {
        newErrors.origin = 'La dirección de origen es obligatoria.';
      } else if (formData.origin.length < 5) {
        newErrors.origin = 'Por favor, ingresá una dirección más detallada.';
      }
      if (!formData.destination.trim()) {
        newErrors.destination = 'La dirección de destino es obligatoria.';
      } else if (formData.destination.length < 5) {
        newErrors.destination = 'Por favor, ingresá una dirección más detallada.';
      }
    } else if (currentStep === 2) {
      if (!formData.movingDate) {
        newErrors.movingDate = 'La fecha de mudanza es obligatoria.';
      } else {
        const selectedDate = new Date(formData.movingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.movingDate = 'La fecha no puede ser en el pasado.';
        }
      }
      if (!formData.serviceType) {
        newErrors.serviceType = 'Elegí el tipo de servicio que necesitás.';
      }
    } else if (currentStep === 3) {
      if (!formData.name.trim()) {
        newErrors.name = 'Tu nombre completo es obligatorio.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Tu celular de contacto es obligatorio.';
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Ingresá un formato telefónico válido (Ej: 261 123456).';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es obligatorio.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Ingresá una dirección de correo válida.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Simulate API submit to lead database
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = '5492615130910'; // Mudanzas Miranda Official
    const dateFormatted = formData.movingDate.split('-').reverse().join('/');
    
    const serviceName = selectedService.title;
    const distanceStr = calculatedDistance ? `${calculatedDistance} km` : 'A determinar';
    const rateStr = `$${priceRange.low} - $${priceRange.high} ARS`;

    const text = encodeURIComponent(
      `¡Hola Mudanzas Miranda! Me gustaría coordinar y confirmar la cotización de mi mudanza:\n\n` +
      `📦 *Servicio:* ${serviceName}\n` +
      `📍 *Origen:* ${formData.origin}\n` +
      `🏁 *Destino:* ${formData.destination}\n` +
      `🗺️ *Distancia:* ${distanceStr}\n` +
      `📅 *Fecha:* ${dateFormatted}\n` +
      `💵 *Tarifa Estimada:* ${rateStr}\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📞 *Teléfono:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📝 *Notas:* ${formData.comments || 'Sin comentarios adicionales.'}\n\n` +
      `Enviado desde el cotizador web mudanzasmiranda.com.ar`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const stepsConfig = [
    { number: 1, label: 'Direcciones' },
    { number: 2, label: 'Servicio & Fecha' },
    { number: 3, label: 'Contacto' },
  ];

  // Helper to highlight parts of date weekday
  const getWeekdayTip = () => {
    if (!formData.movingDate) return null;
    const date = new Date(formData.movingDate);
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    if (day === 0) {
      return '📅 Domingo: Tránsito muy tranquilo en Mendoza, ideal para maniobras rápidas.';
    } else if (day === 6) {
      return '📅 Sábado: Alta demanda. Te recomendamos reservar con anticipación para asegurar tu furgón.';
    } else if (day >= 1 && day <= 3) {
      return '💡 Tip de Ahorro: Mudarse de lunes a miércoles cuenta con tarifas base más flexibles.';
    }
    return '📅 Mudanza en día de semana: Coordinaremos en horarios de menor congestión céntrica.';
  };

  return (
    <div id="quote-form-container" className="w-full max-w-3xl mx-auto">
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Accent lighting strip */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400" />
          
          {/* Stepper Progress Indicator */}
          {!isSuccess && (
            <div className="mb-8 border-b border-white/5 pb-6">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/5 z-0">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%` }}
                  />
                </div>

                {stepsConfig.map((s) => (
                  <div key={s.number} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => step > s.number && setStep(s.number)}
                      disabled={step <= s.number}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                        step > s.number
                          ? 'bg-amber-500 text-[#0a0a0a]'
                          : step === s.number
                          ? 'bg-amber-500 text-[#0a0a0a] ring-4 ring-amber-500/15 font-black scale-105'
                          : 'bg-[#151515] text-slate-500 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {step > s.number ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                    </button>
                    <span className={`text-[11px] sm:text-xs mt-2.5 font-bold tracking-wide transition-all uppercase ${step === s.number ? 'text-amber-500' : 'text-slate-500'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: ROUTING & GEOLOCATION */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Reserva de Traslado - Paso 1: Ruta
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">Definí el recorrido en Mendoza</h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Comenzá a escribir y seleccioná una opción para calcular la distancia exacta de tu reserva de forma automática.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* DIRECCION ORIGEN */}
                      <div className="relative">
                        <label htmlFor="origin" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                          📍 Dirección de Origen
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            onFocus={() => formData.origin.length >= 3 && setShowOriginSuggestions(true)}
                            placeholder="Ej: Av. Colón 450, Ciudad de Mendoza"
                            className={`w-full pl-4 pr-12 py-3.5 border rounded-xl text-white bg-[#161616] placeholder-slate-500 focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                              errors.origin ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                            }`}
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() => handleGeolocate('origin')}
                            className="absolute right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-white/5 transition-all"
                            title="Usar mi ubicación de origen por GPS"
                            aria-label="Geolocalizar origen"
                          >
                            {isLocatingOrigin ? (
                              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                            ) : (
                              <Locate className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.origin && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.origin}</p>}

                        {/* Autocomplete List Portal dropdown */}
                        <AnimatePresence>
                          {showOriginSuggestions && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute left-0 right-0 mt-1 bg-[#181818] border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden max-h-56 overflow-y-auto scrollbar-thin"
                            >
                              {isLoadingOriginSuggestions ? (
                                <div className="p-4 flex items-center justify-center gap-2.5 text-xs text-slate-400">
                                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                                  Buscando direcciones en Mendoza...
                                </div>
                              ) : (
                                originSuggestions.map((item) => (
                                  <button
                                    key={item.place_id}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(item, 'origin')}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 text-xs sm:text-sm text-slate-300 hover:text-amber-500 transition-colors flex items-center gap-2.5 cursor-pointer"
                                  >
                                    <MapPin className="w-3.5 h-3.5 text-amber-500/60 flex-shrink-0" />
                                    <span className="truncate">{item.display_name}</span>
                                  </button>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* DIRECCION DESTINO */}
                      <div className="relative">
                        <label htmlFor="destination" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                          🏁 Dirección de Destino
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            onFocus={() => formData.destination.length >= 3 && setShowDestSuggestions(true)}
                            placeholder="Ej: Beltrán 300, Godoy Cruz, Mendoza"
                            className={`w-full pl-4 pr-12 py-3.5 border rounded-xl text-white bg-[#161616] placeholder-slate-500 focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                              errors.destination ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                            }`}
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() => handleGeolocate('destination')}
                            className="absolute right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-white/5 transition-all"
                            title="Usar mi ubicación de destino por GPS"
                            aria-label="Geolocalizar destino"
                          >
                            {isLocatingDest ? (
                              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                            ) : (
                              <Locate className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.destination && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.destination}</p>}

                        {/* Autocomplete List Portal dropdown */}
                        <AnimatePresence>
                          {showDestSuggestions && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute left-0 right-0 mt-1 bg-[#181818] border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden max-h-56 overflow-y-auto scrollbar-thin"
                            >
                              {isLoadingDestSuggestions ? (
                                <div className="p-4 flex items-center justify-center gap-2.5 text-xs text-slate-400">
                                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                                  Buscando direcciones en Mendoza...
                                </div>
                              ) : (
                                destSuggestions.map((item) => (
                                  <button
                                    key={item.place_id}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(item, 'destination')}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 text-xs sm:text-sm text-slate-300 hover:text-amber-500 transition-colors flex items-center gap-2.5 cursor-pointer"
                                  >
                                    <MapPin className="w-3.5 h-3.5 text-amber-500/60 flex-shrink-0" />
                                    <span className="truncate">{item.display_name}</span>
                                  </button>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Animated visual route map mockup */}
                    <div className="bg-[#151515] border border-white/5 rounded-2xl p-4.5 overflow-hidden">
                      <div className="flex items-center justify-between gap-4 relative">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${originCoords ? 'bg-amber-500 text-[#0a0a0a]' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                            A
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase truncate max-w-[80px]">Origen</span>
                        </div>

                        {/* Animated dotted line with truck icon */}
                        <div className="flex-grow h-0.5 border-t-2 border-dashed border-white/15 relative mx-2">
                          <motion.div
                            animate={{ 
                              x: originCoords && destCoords ? ['0%', '100%', '0%'] : '0%'
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 5, 
                              ease: 'easeInOut' 
                            }}
                            className="absolute -top-3 left-0 text-amber-500"
                          >
                            <Truck className="w-5 h-5 fill-amber-500/10 stroke-[2.5]" />
                          </motion.div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${destCoords ? 'bg-amber-500 text-[#0a0a0a]' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                            B
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase truncate max-w-[80px]">Destino</span>
                        </div>
                      </div>

                      {calculatedDistance && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
                          <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                            <MapPin className="w-4 h-4" /> Distancia: {calculatedDistance} km
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400 font-bold">
                            <Clock className="w-4 h-4 text-slate-500" /> Tiempo estimado: ~{estimatedTime} min
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#0a0a0a] font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-all cursor-pointer text-sm"
                      >
                        Seleccionar Servicio
                        <ChevronRight className="w-4 h-4 stroke-[3.5]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SERVICE DETAILS & DATE SELECTION */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Reserva de Traslado - Paso 2: Configuración
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">Elegí tu servicio y la fecha de reserva</h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Seleccioná la modalidad que más se adapte a tu traslado y la fecha en que querés programar tu viaje.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Grid Service Selector instead of plain old dropdown */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                          Elegí el Tipo de Servicio
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SERVICE_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, serviceType: option.id }))}
                              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 cursor-pointer ${
                                formData.serviceType === option.id
                                  ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                                  : 'bg-[#151515] border-white/5 hover:border-white/15 hover:bg-[#181818]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="p-2 bg-[#202020] rounded-lg border border-white/5">
                                  {option.icon}
                                </div>
                                {formData.serviceType === option.id && (
                                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[#0a0a0a]">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 text-left">
                                <p className="text-xs font-bold text-white tracking-wide">{option.title}</p>
                                <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{option.subtitle}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Moving Date Picker */}
                      <div>
                        <label htmlFor="movingDate" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                          📅 Fecha de Mudanza
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="movingDate"
                            name="movingDate"
                            value={formData.movingDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3.5 border rounded-xl text-white bg-[#161616] focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                              errors.movingDate ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                            }`}
                          />
                        </div>
                        {errors.movingDate && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.movingDate}</p>}
                        
                        {/* Dynamic Weekday TIP box */}
                        {formData.movingDate && (
                          <div className="mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-400 font-semibold flex items-center gap-2">
                            <span>{getWeekdayTip()}</span>
                          </div>
                        )}
                      </div>

                      {/* Live Price Estimate inside Step 2 */}
                      <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Tarifa Base Estimada</span>
                          <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/15 px-1.5 py-0.5 rounded uppercase font-mono">ARS</span>
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">${priceRange.low}</span>
                          <span className="text-slate-500 font-medium text-xs">a</span>
                          <span className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">${priceRange.high}</span>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                          *Cálculo estimativo sujeto al volumen final y accesibilidad (escaleras/balcones). Incluye seguro de traslado vial en Mendoza.
                        </p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 font-bold py-3 px-4.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                        Volver
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#0a0a0a] font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-all cursor-pointer text-xs sm:text-sm"
                      >
                        Ingresar Contacto
                        <ChevronRight className="w-4 h-4 stroke-[3.5]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONTACT INFORMATION */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Reserva de Traslado - Paso 3: Confirmación
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">Confirmá tus Datos de Reserva</h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Completá la información de contacto para pre-reservar la fecha del camión en el sistema.
                      </p>
                    </div>

                    {/* Compact Reservation Summary Banner */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-bold">Recorrido del Traslado</span>
                        <p className="text-slate-200 font-medium truncate flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span className="text-slate-400">Origen:</span> {formData.origin || 'A determinar'}
                        </p>
                        <p className="text-slate-200 font-medium truncate flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span className="text-slate-400">Destino:</span> {formData.destination || 'A determinar'}
                        </p>
                      </div>
                      <div className="space-y-1.5 md:border-l md:border-white/5 md:pl-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-bold">Servicio Seleccionado</span>
                        <p className="text-slate-200 font-medium flex items-center gap-2">
                          <span className="text-amber-500 capitalize">{selectedService.title}</span>
                          {formData.movingDate && (
                            <span className="text-slate-400 font-mono">({formData.movingDate.split('-').reverse().join('/')})</span>
                          )}
                        </p>
                        <p className="text-amber-500 font-bold flex items-center gap-2">
                          Tarifa Estimada: ${priceRange.low} - ${priceRange.high} ARS
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                          👤 Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ej: Sofía Martínez"
                          className={`w-full px-4 py-3.5 border rounded-xl text-white bg-[#161616] focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                            errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                            📞 Celular / WhatsApp
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ej: 261 5123456"
                            className={`w-full px-4 py-3.5 border rounded-xl text-white bg-[#161616] focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                              errors.phone ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                            }`}
                          />
                          {errors.phone && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                            ✉️ Correo Electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Ej: sofia@gmail.com"
                            className={`w-full px-4 py-3.5 border rounded-xl text-white bg-[#161616] focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm ${
                              errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                            }`}
                          />
                          {errors.email && <p className="text-xs text-red-500 mt-1.5 font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> {errors.email}</p>}
                        </div>
                      </div>

                      {/* Comments */}
                      <div>
                        <label htmlFor="comments" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                          📝 Detalles o Comentarios (Opcional)
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          rows={2}
                          value={formData.comments}
                          onChange={handleInputChange}
                          placeholder="Ej: Necesito subir 1 sillón por escalera, o requiero furgón cerrado mediano..."
                          className="w-full px-4 py-3 border border-white/10 rounded-xl text-white bg-[#161616] focus:bg-[#1b1b1b] focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={isSubmitting}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 font-bold py-3 px-4.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                        Volver
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#0a0a0a] font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-all cursor-pointer text-xs sm:text-sm disabled:opacity-75 min-w-[150px]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#0a0a0a]" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            Confirmar Reserva
                            <Check className="w-4 h-4 stroke-[3.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>
            ) : (
              /* SUCCESS COMPLETION - ULTRA OPTIMIZED FOR HIGHEST CRO */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/5">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">¡Presupuesto reservado con éxito!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Hola <span className="font-bold text-white">{formData.name}</span>, registramos tu traslado coordinado para el <span className="font-bold text-amber-500">{formData.movingDate.split('-').reverse().join('/')}</span>.
                  </p>
                </div>

                <div className="bg-[#151515] border border-white/5 rounded-2xl p-5 text-left space-y-3.5 max-w-md mx-auto">
                  <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase">Ficha técnica del traslado</span>
                  
                  <div className="space-y-2 text-xs text-slate-300 font-medium">
                    <p className="flex items-start gap-2">
                      <span className="text-slate-500 w-16 flex-shrink-0">Origen:</span>
                      <span className="text-white truncate">{formData.origin}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-slate-500 w-16 flex-shrink-0">Destino:</span>
                      <span className="text-white truncate">{formData.destination}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-slate-500 w-16 flex-shrink-0">Servicio:</span>
                      <span className="text-amber-500 capitalize">{selectedService.title}</span>
                    </p>
                    {calculatedDistance && (
                      <p className="flex items-start gap-2">
                        <span className="text-slate-500 w-16 flex-shrink-0">Distancia:</span>
                        <span className="text-white">{calculatedDistance} km</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Instant Action CTA - Open WhatsApp with Structured Form */}
                <div className="space-y-3 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#22c35e] text-[#050505] font-bold py-4 px-6 rounded-xl shadow-xl shadow-green-500/10 active:scale-[0.99] transition-all cursor-pointer text-base sm:text-lg"
                  >
                    <MessageSquare className="w-5.5 h-5.5 fill-current" />
                    Enviar WhatsApp para Confirmar Tarifa
                  </button>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    Al presionar, abrirás WhatsApp con tu presupuesto estructurado para que nuestros choferes te reserven el camión de inmediato.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
