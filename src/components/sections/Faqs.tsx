import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/staticData';

export function Faqs() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-slate-400 text-sm">
            Resolvemos tus dudas más comunes para que planifiques tu mudanza con total tranquilidad.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-white/10 rounded-2xl overflow-hidden transition-all duration-200 bg-[#111111]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full text-left py-5 px-6 flex items-center justify-between font-bold text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
                aria-expanded={openFaq === faq.id}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openFaq === faq.id ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-[#111111] border-t border-white/5"
                  >
                    <div className="p-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
