import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { destinations } from './src/data/destinations';
import { servicePages } from './src/data/seoPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seoEntryPointPaths = [
  'index.html',
  'nosotros.html',
  'destinos.html',
  'servicios.html',
  ...servicePages.map((service) => `servicios/${service.slug}.html`),
  ...destinations.map((destination) => `mudanzas-mendoza/${destination.slug}.html`),
];

const seoEntryPoints = seoEntryPointPaths.reduce<Record<string, string>>((entries, entry) => {
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
