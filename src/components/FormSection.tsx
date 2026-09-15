import QuoteForm from './QuoteForm';

interface FormSectionProps {
  title: string;
  destinationName?: string;
  initialService?: string;
  compact?: boolean;
}

/** Shared quote section used across the public pages. */
export default function FormSection({ title, destinationName, initialService, compact = false }: FormSectionProps) {
  const titleId = 'quote-section-title';

  return (
    <section
      id="form"
      aria-labelledby={titleId}
      className={`quote-section relative border-t border-[rgba(255,255,255,0.12)] ${compact ? 'py-16' : 'py-20'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="quote-section-intro mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <h2 id={titleId} className="text-3xl font-serif font-bold tracking-tight text-white/95">{title}</h2>
        </header>

        <QuoteForm destinationName={destinationName} initialService={initialService} />
      </div>
    </section>
  );
}
