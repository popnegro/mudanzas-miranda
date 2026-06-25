module.exports = {
  // 1. Archivos que debe analizar para encontrar los selectores en uso.
  content: [
    './*.html',
    './mudanzas-mendoza/*.html'
  ],

  // 2. El archivo CSS que quieres limpiar.
  css: [
    './css/main.min.css'
  ],

  // 3. El nombre del archivo CSS limpio que se generará.
  output: './css/main.purged.css',

  // 4. (Importante) Lista de selectores a proteger.
  // PurgeCSS no puede ver las clases que se añaden con JavaScript.
  // Aquí le decimos que no elimine estas clases aunque no las encuentre en el HTML.
  safelist: {
    standard: [
      'active',
      'nav-open',
      'mobile-toggle',
      'toggle-sub',
      'whatsapp',
      'whatsapp-icon',
      'active-link', // <-- Añadido: Para el scrollspy del menú.
      'fa-spin',     // <-- Añadido: Para la animación del ícono de geolocalización.
    ],
    // Protege también las clases que terminan con 'active' (ej. 'slide-active')
    // y todas las clases que comienzan con 'leaflet-' para el mapa.
    deep: [
      /active$/, 
      /^leaflet-/, // <-- Añadido: Protege todas las clases del mapa.
      /^fa-/       // <-- Añadido: Protege las clases de Font Awesome.
    ],
  }
};
