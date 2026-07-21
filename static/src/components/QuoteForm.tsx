import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Navigation, CheckCircle2, Phone, User, Calendar, MapPin, Briefcase } from 'lucide-react';

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

  useEffect(() => {
    if (destinationName) {
      setFormData((prev) => ({ ...prev, destination: destinationName }));
    }
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [destinationName, initialService]);

  const handleGeolocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // NOTE: In a real app, you'd use a reverse geocoding API here.
        // For this demo, we'll just use coordinates as a placeholder.
        setFormData({ ...formData, origin: 'Mi ubicación actual' });
        setErrors({ ...errors, origin: undefined });
      },
      () => {
        alert('No se pudo obtener la ubicación. Por favor, ingrésela manualmente.');
      }
    );
  };

  const formatPhoneNumber = (value: string): string => {
    // 1. Limpiar cualquier caracter que no sea un dígito
    const digits = value.replace(/\D/g, '');

    // 2. Limitar a un máximo de 10 dígitos para el formato local (ej: 261 123 4567)
    const trimmedDigits = digits.slice(0, 10);

    // 3. Aplicar el formato con espacios
    if (trimmedDigits.length > 6) {
      return `${trimmedDigits.slice(0, 3)} ${trimmedDigits.slice(3, 6)} ${trimmedDigits.slice(6)}`;
    }
    if (trimmedDigits.length > 3) {
      return `${trimmedDigits.slice(0, 3)} ${trimmedDigits.slice(3)}`;
    }

    // 4. Devolver los dígitos si son muy pocos para formatear
    return trimmedDigits;
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'origin':
        return !value.trim() ? 'El origen es obligatorio.' : undefined;
      case 'destination':
        return !value.trim() ? 'El destino es obligatorio.' : undefined;
      case 'service':
        return !value ? 'Debe seleccionar un tipo de servicio.' : undefined;
      case 'name':
        return !value.trim() ? 'El nombre es obligatorio.' : undefined;
      case 'phone':
        if (!value.trim()) return 'El teléfono es obligatorio.';
        if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) return 'Ingrese un número de teléfono válido.';
        return undefined;
      case 'date':
        return !value ? 'La fecha es obligatoria.' : undefined;
      default:
        return undefined;
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
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio.';
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Ingrese un número de teléfono válido.';
    }
    if (!formData.date) newErrors.date = 'La fecha es obligatoria.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      const serviceMap: Record<string, string> = {
        residencial: 'Mudanza Residencial',
        oficina: 'Mudanza de Oficina',
        embalaje: 'Embalaje Profesional',
        guardamuebles: 'Guardamuebles',
        logistica: 'Logística y Distribución',
        otro: 'Otro',
      };

      const message = `Hola! Quisiera cotizar una mudanza con los siguientes datos:
*Origen:* ${formData.origin}
*Destino:* ${formData.destination}
*Servicio:* ${serviceMap[formData.service] || 'No especificado'}
*Fecha:* ${
  // Reemplazar guiones con barras para que JS lo interprete como fecha local y no UTC, evitando el error de un día menos.
  new Date(formData.date.replace(/-/g, '/')).toLocaleDateString('es-AR')
}
*Nombre:* ${formData.name}
*Teléfono:* ${formData.phone}`;

      const whatsappUrl = `https://wa.me/5492615130910?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof FormData, value: string };

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
      // Validar usando los dígitos puros para que la regex funcione correctamente
      const rawPhone = value.replace(/\D/g, '');
      const error = validateField(name, rawPhone);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-[#111111] border border-white/10 rounded-3xl p-12 max-w-2xl mx-auto">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud en camino!</h3>
        <p className="text-slate-300 mb-6">Tu mensaje se está abriendo en WhatsApp. En breve, un asesor se pondrá en contacto contigo.</p>
        <button onClick={() => setIsSubmitted(false)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">
          Crear una nueva cotización
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6" noValidate>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white">Paso 1: Ruta y Servicio</h3>
            {/* Origen y Destino en la misma fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" name="origin" placeholder="Dirección de Origen" value={formData.origin} onChange={handleChange} className={`w-full bg-[#0A0A0A] border ${errors.origin ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`} />
                <button type="button" onClick={handleGeolocate} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500"><Navigation className="w-5 h-5" /></button>
                {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" name="destination" placeholder="Dirección de Destino" value={formData.destination} onChange={handleChange} className={`w-full bg-[#0A0A0A] border ${errors.destination ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`} />
                </div>
                {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
              </div>
            </div>
            <div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select name="service" value={formData.service} onChange={handleChange} className={`w-full bg-[#0A0A0A] border ${errors.service ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none appearance-none`}>
                  <option value="residencial">Mudanza Residencial</option>
                  <option value="oficina">Mudanza de Oficina</option>
                  <option value="embalaje">Embalaje Profesional</option>
                  <option value="guardamuebles">Guardamuebles</option>
                  <option value="logistica">Logística y Distribución</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleNext} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Siguiente <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white">Paso 2: Contacto y Fecha</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" name="name" placeholder="Nombre Completo" value={formData.name} onChange={handleChange} className={`w-full bg-[#0A0A0A] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`} />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="tel" name="phone" placeholder="Teléfono (ej: 261...)" value={formData.phone} onChange={handleChange} className={`w-full bg-[#0A0A0A] border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`} />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} min={today} className={`w-full bg-[#0A0A0A] border ${errors.date ? 'border-red-500' : 'border-white/10'} rounded-xl pl-10 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 focus:outline-none`} />
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="flex justify-between items-center">
              <button type="button" onClick={handleBack} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all">
                <ArrowLeft className="w-5 h-5" /> Anterior
              </button>
              <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Enviar Solicitud <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}