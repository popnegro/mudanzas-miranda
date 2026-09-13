import QuoteForm from './QuoteForm';

interface FormSectionProps {
  title: string;
  subtitle: string;
  destinationName?: string;
  initialService?: string;
  compact?: boolean;
}

/**
 * Shared "Cotizá tu mudanza" section. Reused across the homepage, Nosotros,
 * Servicios and Destinos detail pages so the quote form only has one visual
 * treatment to maintain. Uses the site's existing primary brand color
 * (--miranda-primary) as the section background, with the form itself
 * floating as a light card on top for contrast.
 */
export default function FormSection({ title, subtitle, destinationName, initialService, compact = false }: FormSectionProps) {
  return (
    <section id="form" className={`quote-section relative border-t border-[rgba(255,255,255,0.12)] ${compact ? 'py-16' : 'py-20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quote-section-intro mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white/95">{title}</h2>
          <p className="text-sm text-white/75">{subtitle}</p>
        </div>

        <QuoteForm destinationName={destinationName} initialService={initialService} />
      </div>
    </section>
  );
}
