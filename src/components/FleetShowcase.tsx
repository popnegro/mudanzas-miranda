/**
 * "Nuestra Flota de Camiones" — editorial, image-led section used on both the
 * Servicios and Destinos detail pages. The photo is the background of the
 * section (not an <img> inside a card), with a gradient overlay carrying the
 * text for legibility. Shared here so both pages stay in sync and there is
 * no duplicated markup to drift out of sync.
 */
export default function FleetShowcase() {
  return (
    <section
      className="relative isolate flex min-h-[440px] items-end overflow-hidden border-b border-white/5 bg-neutral-900 bg-cover bg-center sm:min-h-[520px] sm:bg-[position:center_40%] lg:min-h-[600px]"
      style={{ backgroundImage: "url('/img/mudanzas-miranda-flota.webp')" }}
    >
      {/* Gradient overlay: strong from the bottom on mobile, from the left on larger screens, so the photo stays the protagonist while the copy stays legible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/5 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/45 sm:to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="max-w-xl space-y-4 sm:space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.12)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
            Nuestra Flota de Camiones
          </span>

          <h2 className="text-3xl font-serif font-bold leading-tight tracking-tight text-white/95 sm:text-4xl lg:text-5xl">
            Equipados para Traslados de Alta Exigencia
          </h2>

          <p className="max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Unidades habilitadas por la CNRT, acondicionadas con sistemas de amarre, mantas protectoras y seguimiento satelital constante para asegurar que cada bulto viaje con máxima protección en el Gran Mendoza y toda la provincia.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.12)] px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Unidades Listas en Ruta
            </div>
            <span className="font-mono text-xs text-white/70">Seguimiento GPS 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
