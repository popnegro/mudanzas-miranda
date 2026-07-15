import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Retrasa la aparición del banner para no ser demasiado intrusivo
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setIsVisible(false);
    // Aquí podrías inicializar tus scripts de analítica si el usuario acepta.
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[#111111] border-t border-white/10 shadow-2xl p-4"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Cookie className="w-8 h-8 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0 mt-1" />
              <p>
                Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptás nuestro uso de cookies. Leé más en nuestra{' '}
                <Link to="/politica-de-privacidad" className="font-semibold text-amber-500 hover:underline">Política de Privacidad</Link>.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button onClick={() => handleConsent('accepted')} className="w-1/2 sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors">Aceptar</button>
              <button onClick={() => handleConsent('declined')} className="w-1/2 sm:w-auto bg-white/10 hover:bg-white/20 text-slate-200 font-semibold py-2 px-5 rounded-lg transition-colors">Rechazar</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;