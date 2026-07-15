# Guía de Despliegue en Producción — Mudanzas Miranda

Este documento contiene las instrucciones precisas para desplegar este proyecto en plataformas de nube modernas como **Vercel** o **Cloud Run** con las máximas optimizaciones de rendimiento y distribución de assets.

---

## ⚡ Despliegue en Vercel (Recomendado)

Vercel ofrece la mejor infraestructura de Edge Network y optimización de imágenes nativa para aplicaciones de React compiladas con Vite.

### Pasos para Despliegue:

1.  **Conectar repositorio en Vercel Dashboard**:
    *   Hacé clic en **"Add New"** > **"Project"** en Vercel.
    *   Importá tu repositorio de GitHub.
2.  **Configurar Ajustes de Compilación**:
    *   **Framework Preset**: Seleccioná `Vite` (o dejaló en `Other` si detecta automáticamente `package.json`).
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Install Command**: `npm install`
3.  **Configurar Variables de Entorno**:
    *   Si bien la aplicación es 100% cliente y no requiere claves de API expuestas, se recomienda definir `VITE_APP_URL` con tu dominio definitivo (ej: `https://www.mudanzasmiranda.com.ar`) para que la generación de las etiquetas canónicas dinámicas en React apunte al dominio absoluto correcto.
4.  **Desplegar**:
    *   Hacé clic en **"Deploy"**. El sitio estará en línea en menos de un minuto.

### Configuración de Redirecciones en Vercel (`vercel.json`)

Para asegurar que todas las rutas sean manejadas por la Single Page Application (SPA) y el enrutador de React, es necesario configurar una reescritura en Vercel. Esto previene errores 404 en recargas de página o al acceder a URLs directas. Crea un archivo `vercel.json` en la raíz con la siguiente regla:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🐳 Despliegue en Google Cloud Run (Estructura de Contenedores)

Si preferís hospedar la aplicación en Cloud Run a través de un servidor de Express integrado para máxima escalabilidad:

### Requisitos:
*   Un archivo `Dockerfile` para empaquetar la aplicación.
*   Un servidor Node.js que sirva los archivos estáticos de la carpeta `dist`.

### Dockerfile de Producción:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY server.js .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

---

## 🔒 Checklist de Post-Despliegue

1.  **Verificación de SSL/HTTPS**:
    *   Asegurarse de que el dominio cuente con certificado SSL activo (TLS 1.3). Todas las redirecciones HTTP a HTTPS deben estar forzadas (301).
2.  **Prueba del Sitemap**:
    *   Visitar `/sitemap.xml` en el navegador y verificar que cargue de forma válida e indexe las 19 subpáginas.
3.  **Auditoría de Enlaces Rotos**:
    *   Utilizar un crawler como Screaming Frog para comprobar que ningún link del menú superior ni el footer genere respuestas HTTP 404.
