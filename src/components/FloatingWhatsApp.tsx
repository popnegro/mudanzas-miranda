import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda!%20Quisiera%20consultar%20por%20un%20servicio%20de%20mudanza%20para%20Mendoza."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed z-40 flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-2xl ring-4 ring-green-500/10 transition-all hover:scale-110 hover:bg-[#20ba56] active:scale-95 sm:p-4"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
      aria-label="Contactar a Mudanzas Miranda por WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-7 sm:w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-xs group-hover:ml-2 sm:inline-block">
        ¿En qué te ayudamos?
      </span>
    </a>
  );
}
