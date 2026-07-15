import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '5492615130910'; // Número oficial de Mudanzas Miranda
  const message = encodeURIComponent('¡Hola! Quisiera hacer una consulta sobre sus servicios de mudanza.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    // Muestra el widget después de 2.5 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba56] hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <MessageSquare className="w-8 h-8 fill-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppWidget;