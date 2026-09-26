# Mudanzas Miranda

Sitio web comercial de **Mudanzas Miranda**, empresa de mudanzas con base en Godoy Cruz, Mendoza.

## Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- Vercel
- Generación de entry points estáticos para SEO

## Requisitos

- Node.js 22+
- npm

## Desarrollo

```bash
npm install
npm run dev
```

## Validaciones

```bash
npm run typecheck
npm run audit:static-seo
npm run validate:app-composition
npm run build
```

`npm run build` genera primero las páginas SEO estáticas y luego compila la aplicación Vite.

## Datos comerciales validados

- Más de 20 años de trayectoria
- Flota propia
- Seguro de carga incluido
- Habilitación CNRT
- Seguimiento satelital
- Camiones alfombrados
- Seguro completo
- Salidas semanales
- Servicios: mudanzas residenciales, oficinas, combinadas/grupales, embalaje profesional, guardamuebles y logística integral
- WhatsApp: +54 261 513-0910
- Email: info@mudanzasmiranda.com.ar

## Producción

El deploy de producción debe configurarse con las variables de entorno necesarias para la disponibilidad mediante Google Calendar. Nunca incorporar credenciales de Google al repositorio.

## SEO Local

Los datos variables del Perfil de Empresa de Google, como la cantidad de reseñas, no se hardcodean en Schema.org. El sitio mantiene la entidad, dirección, teléfono, horarios y servicios consistentes con los datos comerciales validados y evita el uso de `AggregateRating` autocontrolado.
