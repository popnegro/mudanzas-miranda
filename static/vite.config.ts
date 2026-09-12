import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seoEntryPoints = [
  'index.html',
  'nosotros.html',
  'servicios/mudanzas-residenciales.html',
  'servicios/mudanzas-oficinas.html',
  'servicios/mudanzas-combinadas.html',
  'servicios/embalaje-profesional.html',
  'servicios/guardamuebles.html',
  'servicios/logistica-integral.html',
  'mudanzas-mendoza/mudanzas-ciudad-mendoza.html',
  'mudanzas-mendoza/mudanzas-godoy-cruz.html',
  'mudanzas-mendoza/mudanzas-guaymallen.html',
  'mudanzas-mendoza/mudanzas-las-heras.html',
  'mudanzas-mendoza/mudanzas-maipu.html',
  'mudanzas-mendoza/mudanzas-lujan-de-cuyo.html',
].reduce<Record<string, string>>((entries, entry) => {
  entries[entry] = path.resolve(__dirname, entry);
  return entries;
}, {});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: seoEntryPoints,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
