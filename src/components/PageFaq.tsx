import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../types';

interface PageFaqProps {
  title?: string;
  items: FAQItem[];
}

export default function PageFaq({ title = 'Preguntas frecuentes', items }: PageFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  if (!items.length) return null;

  return (
    <section className="space-y-4" aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" className="text-xl font-bold text-ink tracking-tight">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id} className="border border-line rounded-2xl overflow-hidden bg-surface">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : faq.id)}
                className="w-full text-left py-4 px-5 flex items-center justify-between gap-3 font-semibold text-ink hover:bg-background-soft transition-colors cursor-pointer"
                aria-expanded={open}
              >
                <span className="text-sm sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-ink-subtle flex-shrink-0 transition-transform ${open ? 'rotate-180 text-brand' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm text-ink-secondary leading-relaxed border-t border-line-soft pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
