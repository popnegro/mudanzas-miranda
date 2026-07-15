import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import { destinations } from './src/data/destinations';

/**
 * Genera las rutas dinámicas para el sitemap a partir de los datos de destinos.
 */
const dynamicRoutes = destinations.map((dest) => `/destinos/${dest.slug}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.mudanzasmiranda.com.ar',
      dynamicRoutes,
      // Opcional: Cambia la frecuencia de actualización y prioridad si lo necesitas
      // changefreq: 'weekly',
      // priority: 0.7,
    }),
  ],
});