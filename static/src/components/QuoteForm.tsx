import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, User, Phone, Mail, ChevronRight, ChevronLeft, Check, Locate, Loader2, MessageSquare } from 'lucide-react';
import { QuoteRequest } from '../types';

interface QuoteFormProps {
  initialService?: string;
  destinationName?: string;
}

export default function QuoteForm({ initialService = '', destinationName = '' }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<QuoteRequest>({
    origin: '',
    destination: destinationName ? `Ciudad de Mendoza` : '',
    movingDate: '',
    serviceType: initialService || '',
    name: '',
    phone: '',
    email: '',
    comments: '',
  });

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Geolocalizar Origen
  const handleGeolocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Utilizar reverse geocoding o simularlo en el área metropolitana de Mendoza
          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              origin: `Ubicación actual (Cerca de Ciudad de Mendoza, AR)`,
            }));
            setIsLocating(false);
          }, 1200);
        },
        () => {
          // Fallback elegante
          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              origin: 'Av. San Martín, Mendoza',
            }));
            setIsLocating(false);
          }, 1000);
        }
      );
    } else {
      setIsLocating(false);
      setErrors((prev) => ({ ...prev, origin: 'Geolocalización no soportada por el navegador.' }));
    }
  };

  // Validar Pasos
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.origin.trim()) newErrors.origin = 'La dirección de origen es requerida.';
      if (!formData.destination.trim()) newErrors.destination = 'La dirección de destino es requerida.';
    } else if (currentStep === 2) {
      if (!formData.movingDate) {
        newErrors.movingDate = 'La fecha de mudanza es requerida.';
      } else {
        const selectedDate = new Date(formData.movingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.movingDate = 'La fecha de mudanza debe ser futura.';
        }
      }
      if (!formData.serviceType) newErrors.serviceType = 'Debe seleccionar un tipo de servicio.';
    } else if (currentStep === 3) {
      if (!formData.name.trim()) newErrors.name = 'Tu nombre completo es requerido.';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Tu número de teléfono es requerido.';
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Formato de teléfono no válido (ej: 261 1234567).';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es requerido.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Correo electrónico inválido.';
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
      // Simular submit de lead a base de datos de fletes
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  // WhatsApp click handler con mensaje estructurado pre-relleno
  const handleWhatsAppRedirect = () => {
    const phone = '5492615130910'; // Número oficial de Mudanzas Miranda
    const text = encodeURIComponent(
      `¡Hola Mudanzas Miranda! Quisiera cotizar una mudanza:\n\n` +
      `📦 *Servicio:* ${formData.serviceType === 'residencial' ? 'Mudanza Residencial 🏠' : formData.serviceType === 'oficina' ? 'Mudanza de Oficina 🏢' : formData.serviceType === 'combinada' ? 'Mudanza Combinada 🚚' : formData.serviceType === 'embalaje' ? 'Embalaje Profesional 📦' : formData.serviceType === 'guardamuebles' ? 'Guardamuebles 🔑' : 'Logística / Flete 🚛'}\n` +
      `📍 *Origen:* ${formData.origin}\n` +
      `🏁 *Destino:* ${formData.destination}\n` +
      `📅 *Fecha Estimada:* ${formData.movingDate}\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📞 *Contacto:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📝 *Notas:* ${formData.comments || 'Ninguna'}\n\n` +
      `Solicitado a través de mudanzasmiranda.com.ar`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const stepsConfig = [
    { number: 1, label: 'Ruta' },
    { number: 2, label: 'Fecha' },
    { number: 3, label: 'Contacto' },
  ];

  return (
    <div id="quote-form-container" className="w-full max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
      {/* Progress Indicator */}
      {!isSuccess && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/5 z-0">
              <div
                className="h-full bg-amber-600 transition-all duration-300"
                style={{ width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%` }}
              />
            </div>

            {stepsConfig.map((s, index) => (
              <div key={s.number} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    step > s.number
                      ? 'bg-amber-600 text-white'
                      : step === s.number
                      ? 'bg-amber-600 text-white ring-4 ring-amber-500/20'
                      : 'bg-[#111111] text-gray-400 border border-white/10'
                  }`}
                >
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span className={`text-xs mt-2 font-medium ${step === s.number ? 'text-white font-semibold' : 'text-gray-400'}`}>
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
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Definí las direcciones</h3>
                  <p className="text-sm text-slate-400 mt-1">Indicanos desde dónde partimos y a dónde llevamos tus cosas.</p>
                </div>

                <div className="space-y-4">
                  {/* Origen */}
                  <div className="relative">
                    <label htmlFor="origin" className="block text-sm font-semibold text-slate-300 mb-1">
                      Dirección de Origen
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-gray-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="Ej: Av. Colón 450, Ciudad de Mendoza"
                        className={`w-full pl-11 pr-12 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                          errors.origin ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleGeolocate}
                        className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-white/5 transition-all"
                        title="Usar mi ubicación actual"
                      >
                        {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Locate className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.origin && <p className="text-xs text-red-500 mt-1 font-medium">{errors.origin}</p>}
                  </div>

                  {/* Destino */}
                  <div>
                    <label htmlFor="destination" className="block text-sm font-semibold text-slate-300 mb-1">
                      Dirección de Destino
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        <MapPin className="w-5 h-5 text-amber-600" />
                      </div>
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="Ej: Paso de los Andes 1500, Godoy Cruz"
                        className={`w-full pl-11 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                          errors.destination ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.destination && <p className="text-xs text-red-500 mt-1 font-medium">{errors.destination}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-amber-600/10 hover:shadow-amber-600/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Fecha y Tipo de Servicio</h3>
                  <p className="text-sm text-slate-400 mt-1">¿Cuándo querés mudarte y qué tipo de servicio necesitás?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fecha de Mudanza */}
                  <div>
                    <label htmlFor="movingDate" className="block text-sm font-semibold text-slate-300 mb-1">
                      Fecha Estimada
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        id="movingDate"
                        name="movingDate"
                        value={formData.movingDate}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-3 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                          errors.movingDate ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.movingDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.movingDate}</p>}
                  </div>

                  {/* Tipo de Servicio */}
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-semibold text-slate-300 mb-1">
                      Tipo de Servicio
                    </label>
                    <div className="relative">
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all appearance-none ${
                          errors.serviceType ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                        }`}
                      >
                        <option value="" className="bg-[#111111] text-white">Selecciona una opción...</option>
                        <option value="residencial" className="bg-[#111111] text-white">Mudanza Residencial 🏠</option>
                        <option value="oficina" className="bg-[#111111] text-white">Mudanza de Oficina 🏢</option>
                        <option value="combinada" className="bg-[#111111] text-white">Mudanza Combinada / Flete Compartido 🚚</option>
                        <option value="embalaje" className="bg-[#111111] text-white">Embalaje Profesional 📦</option>
                        <option value="guardamuebles" className="bg-[#111111] text-white">Servicio de Guardamuebles 🔑</option>
                        <option value="logistica" className="bg-[#111111] text-white">Logística y Fletes 🚛</option>
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                        <ChevronDownIcon />
                      </div>
                    </div>
                    {errors.serviceType && <p className="text-xs text-red-500 mt-1 font-medium">{errors.serviceType}</p>}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 font-semibold py-3 px-5 rounded-xl transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-amber-600/10 hover:shadow-amber-600/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Información de Contacto</h3>
                  <p className="text-sm text-slate-400 mt-1">Dejanos tus datos para coordinar el presupuesto formal.</p>
                </div>

                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-1">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Sofía Martínez"
                        className={`w-full pl-11 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                          errors.name ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Teléfono */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-1">
                        Teléfono / Celular (WhatsApp)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3.5 text-gray-400">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Ej: 261 5123456"
                          className={`w-full pl-11 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                            errors.phone ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3.5 text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Ej: sofia@gmail.com"
                          className={`w-full pl-11 py-3 border rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all ${
                            errors.email ? 'border-red-500 bg-red-500/10' : 'border-white/10'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Comentarios */}
                  <div>
                    <label htmlFor="comments" className="block text-sm font-semibold text-slate-300 mb-1">
                      Comentarios Adicionales (Opcional)
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={2}
                      value={formData.comments}
                      onChange={handleInputChange}
                      placeholder="Ej: Se requiere bajar sillón de 3 cuerpos por balcón, departamento segundo piso..."
                      className="w-full px-4 py-3 border border-white/10 rounded-xl text-white bg-[#151515] hover:bg-[#1C1C1C] focus:bg-[#1C1C1C] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 font-semibold py-3 px-5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-amber-600/10 hover:shadow-amber-600/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Solicitar Cotización
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        ) : (
          /* Success Screen - CRO Optimization Peak */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">¡Solicitud recibida con éxito!</h3>
            <p className="text-slate-300 max-w-md mx-auto mt-2">
              Hola <span className="font-semibold text-white">{formData.name}</span>, hemos registrado tu solicitud para el{' '}
              <span className="font-semibold text-amber-500">{formData.movingDate}</span>. Un asesor técnico está evaluando las direcciones.
            </p>

            <div className="my-8 bg-[#151515] rounded-2xl p-6 border border-white/10 max-w-md mx-auto text-left space-y-3">
              <h4 className="font-semibold text-amber-500 text-sm tracking-wide uppercase">Resumen de tu Ruta</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-amber-500 min-w-[60px]">Origen:</span>
                  <span>{formData.origin}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-amber-500 min-w-[60px]">Destino:</span>
                  <span>{formData.destination}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-amber-500 min-w-[60px]">Servicio:</span>
                  <span className="capitalize">{formData.serviceType}</span>
                </p>
              </div>
            </div>

            {/* High-impact conversion CTA - WhatsApp Booking */}
            <div className="space-y-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-lg"
              >
                <MessageSquare className="w-6 h-6 fill-white" />
                Enviar por WhatsApp para Presupuesto Instantáneo
              </button>
              <p className="text-xs text-gray-500">
                Al hacer clic, se abrirá WhatsApp con el mensaje estructurado para que uno de nuestros choferes te cotice al instante.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ChevronDown component
function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
