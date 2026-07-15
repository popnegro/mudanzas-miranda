import React, { useState } from 'react';
import {
  Star,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { testimonials } from '../../data/staticData';

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-slate-400 text-sm">
            La satisfacción de quienes ya confiaron en Mudanzas Miranda.
          </p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute top-6 right-8 text-amber-500/10 text-7xl font-serif select-none pointer-events-none">
            “
          </div>

          <div className="min-h-[180px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
              <div>
                <p className="font-bold text-white">{testimonials[activeTestimonial].author}</p>
                <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="text-xs text-slate-400">{testimonials[activeTestimonial].date}</div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handlePrev}
              className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-slate-300 transition-colors cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-slate-300 transition-colors cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
