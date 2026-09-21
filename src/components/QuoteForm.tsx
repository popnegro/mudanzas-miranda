import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { checkAvailability } from '../availability/client';
import type { AvailabilityResult } from '../availability/types';
import { ArrowRight, ArrowLeft, Navigation, CheckCircle2, Phone, User, Calendar, MapPin, Briefcase, ChevronDown } from 'lucide-react';

interface QuoteFormProps {
  destinationName?: string;
  initialService?: string;
}

interface FormData {
  origin: string;
  destination: string;
  service: string;
  name: string;
  phone: string;
  date: string;
}

interface FormErrors {
  origin?: string;
  destination?: string;
  service?: string;
  name?: string;
  phone?: string;
  date?: string;
}

export default function QuoteForm({ destinationName, initialService }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: destinationName || '',
    service: initialService || 'residencial',
    name: '',
    phone: '',
    date: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  useEffect(() => {
    if (destinationName) setFormData((prev) => ({ ...prev, destination: destinationName }));
    if (initialService) setFormData((prev) => ({ ...prev, service: initialService }));
  }, [destinationName, initialService]);

  const handleGeolocate = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setFormData((prev) => ({ ...prev, origin: 'Mi ubicación actual' }));
        setErrors((prev) => ({ ...prev, origin: undefined }));
      },
      () => alert('No se pudo obtener la ubicación. Por favor, ingrésela manualmente.'),
    );
  };

  useEffect(() => {
    let cancelled = false;

    if (!formData.date) {
      setAvailability(null);
      return;
    }

    setIsCheckingAvailability(true);

    checkAvailability({ date: formData.date, service: formData.service })
      .then((result) => {
        if (!cancelled) setAvailability(result);
      })
      .finally(() => {
        if (!cancelled) setIsCheckingAvailability(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.date, formData.service]);

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return digits;
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'origin': return !value.trim() ? 'El origen es obligatorio.' : undefined;
      case 'destination': return !value.trim() ? 'El destino es obligatorio.' : undefined;
      case 'service': return !value ? 'Debe seleccionar un tipo de servicio.' : undefined;
      case 'name': return !value.trim() ? 'El nombre es obligatorio.' : undefined;
      case 'phone':
        if (!value.trim()) return 'El teléfono es obligatorio.';
        if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) return 'Ingrese un número de teléfono válido.';
        return undefined;
      case 'date': return !value ? 'La fecha es obligatoria.' : undefined;
      default: return undefined;
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.origin.trim()) newErrors.origin = 'El origen es obligatorio.';
    if (!formData.destination.trim()) newErrors.destination = 'El destino es obligatorio.';
    if (!formData.service) newErrors.service = 'Debe seleccionar un tipo de servicio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio.';
    else if (!/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Ingrese un número de teléfono válido.';
    if (!formData.date) newErrors.date = 'La fecha es obligatoria.';
    else if (availability?.status === 'unavailable') newErrors.date = 'La fecha seleccionada no presenta disponibilidad en la agenda.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const serviceMap: Record<string, string> = {
      residencial: 'Mudanza Residencial', oficina: 'Mudanza de Oficina', embalaje: 'Embalaje Profesional',
      guardamuebles: 'Guardamuebles', logistica: 'Logística y Distribución', otro: 'Otro',
    };
    const message = `Hola! Quisiera cotizar una mudanza con los siguientes datos:\n*Origen:* ${formData.origin}\n*Destino:* ${formData.destination}\n*Servicio:* ${serviceMap[formData.service] || 'No especificado'}\n*Fecha:* ${new Date(formData.date.replace(/-/g, '/')).toLocaleDateString('es-AR')}\n*Nombre:* ${formData.name}\n*Teléfono:* ${formData.phone}`;
    window.open(`https://wa.me/5492615130910?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    const nextValue = name === 'phone' ? formatPhoneNumber(value) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    const error = validateField(name, name === 'phone' ? value.replace(/\D/g, '') : value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <section aria-live="polite" className="text-center bg-[#111111] border border-white/10 rounded-3xl p-12 max-w-2xl mx-auto">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud en camino!</h3>
        <p className="text-slate-300 mb-6">Tu mensaje se está abriendo en WhatsApp. En breve, un asesor se pondrá en contacto contigo.</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">
          Crear una nueva cotización
        </button>
      </section>
    );
  }

  const fieldClass = (error?: string) => `w-full bg-[#0A0A0A] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`;

  return (
    <form id="booking-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6" noValidate aria-label="Solicitud de cotización de mudanza">
      <div aria-label={`Paso ${step} de 2`} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span className={step === 1 ? 'text-amber-500' : 'text-slate-500'}>1. Ruta y servicio</span>
        <span aria-hidden="true">/</span>
        <span className={step === 2 ? 'text-amber-500' : 'text-slate-500'}>2. Contacto y fecha</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.fieldset key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
            <legend className="text-xl font-bold text-white mb-6">Paso 1: Ruta y Servicio</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-origin" className="sr-only">Dirección de origen</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <input id="quote-origin" type="text" name="origin" autoComplete="street-address" placeholder="Dirección de Origen" value={formData.origin} onChange={handleChange} aria-invalid={Boolean(errors.origin)} aria-describedby={errors.origin ? 'quote-origin-error' : undefined} className={`${fieldClass(errors.origin)} pl-10 pr-12`} />
                  <button type="button" onClick={handleGeolocate} aria-label="Usar mi ubicación actual como origen" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 p-1">
                    <Navigation className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                {errors.origin && <p id="quote-origin-error" role="alert" className="text-red-500 text-xs mt-1">{errors.origin}</p>}
              </div>
              <div>
                <label htmlFor="quote-destination" className="sr-only">Dirección de destino</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <input id="quote-destination" type="text" name="destination" autoComplete="street-address" placeholder="Dirección de Destino" value={formData.destination} onChange={handleChange} aria-invalid={Boolean(errors.destination)} aria-describedby={errors.destination ? 'quote-destination-error' : undefined} className={`${fieldClass(errors.destination)} pl-10`} />
                </div>
                {errors.destination && <p id="quote-destination-error" role="alert" className="text-red-500 text-xs mt-1">{errors.destination}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="quote-service" className="sr-only">Tipo de servicio</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                <select id="quote-service" name="service" value={formData.service} onChange={handleChange} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'quote-service-error' : undefined} className={`${fieldClass(errors.service)} pl-10 pr-10 appearance-none`}>
                  <option value="residencial">Mudanza Residencial</option><option value="oficina">Mudanza de Oficina</option><option value="embalaje">Embalaje Profesional</option><option value="guardamuebles">Guardamuebles</option><option value="logistica">Logística y Distribución</option><option value="otro">Otro</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              </div>
              {errors.service && <p id="quote-service-error" role="alert" className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => validateStep1() && setStep(2)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-all">Siguiente <ArrowRight className="w-5 h-5" aria-hidden="true" /></button>
            </div>
          </motion.fieldset>
        )}

        {step === 2 && (
          <motion.fieldset key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
            <legend className="text-xl font-bold text-white mb-6">Paso 2: Contacto y Fecha</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-name" className="sr-only">Nombre completo</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" /><input id="quote-name" type="text" name="name" autoComplete="name" placeholder="Nombre Completo" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'quote-name-error' : undefined} className={`${fieldClass(errors.name)} pl-10`} /></div>
                {errors.name && <p id="quote-name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="quote-phone" className="sr-only">Teléfono</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" /><input id="quote-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Teléfono (ej: 261...)" value={formData.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'quote-phone-error' : undefined} className={`${fieldClass(errors.phone)} pl-10`} /></div>
                {errors.phone && <p id="quote-phone-error" role="alert" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="quote-date" className="sr-only">Fecha estimada de mudanza</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" /><input id="quote-date" type="date" name="date" autoComplete="off" value={formData.date} onChange={handleChange} min={today} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'quote-date-error' : undefined} className={`${fieldClass(errors.date)} pl-10`} /></div>
              {errors.date && <p id="quote-date-error" role="alert" className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="flex justify-between items-center">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all"><ArrowLeft className="w-5 h-5" aria-hidden="true" /> Anterior</button>
              <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all">Enviar Solicitud <CheckCircle2 className="w-5 h-5" aria-hidden="true" /></button>
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>
    </form>
  );
}
