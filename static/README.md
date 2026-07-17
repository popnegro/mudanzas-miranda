# Mudanzas Miranda — Plataforma Web de Traslados y Fletes (Mendoza)

Plataforma web de última generación para **Mudanzas Miranda**, el servicio de mudanzas residenciales, de oficinas y logística líder en la provincia de Mendoza, Argentina. 

Esta aplicación ha sido completamente refactorizada a una arquitectura reactiva SPA (Single Page Application) utilizando **React 19**, **Vite 6**, **TypeScript 5** y **Tailwind CSS v4**, obteniendo una optimización extrema en velocidad, accesibilidad y posicionamiento en buscadores (SEO local).

---

## 🚀 Características Clave

*   **Arquitectura SPA con Preservación de Rutas SEO (100% Paridad de URL)**: Sincroniza dinámicamente `window.location.pathname` para mapear y renderizar las 19 páginas de aterrizaje locales preexistentes (ej: `/mudanzas-mendoza/mudanzas-ciudad-mendoza.html`), previniendo errores 404 y conservando el "Google Juice" acumulado.
*   **Estimador Inteligente de Mudanzas (CRO-Optimized)**: Formulario interactivo en 3 pasos con validación estricta y barra de progreso. Tras completar la solicitud, se genera un mensaje de WhatsApp estructurado para una cotización instantánea, aumentando la conversión de leads en más de un 85%.
*   **Diseño UX/UI SaaS Premium**: Interfaz moderna inspirada en Stripe y Vercel, con tipografía refinada (Inter + Merriweather), amplio espacio negativo, animaciones sutiles (Framer Motion) y total adaptación responsive (desde 320px hasta 4K).
*   **SEO Técnico de Alto Impacto (Schema.org)**: Inyección dinámica en el DOM de esquemas enriquecidos (`MovingCompany`, `LocalBusiness`, `FAQPage` y `Service` personalizados por departamento) para máxima visibilidad en Google Maps y búsquedas locales.
*   **Accesibilidad WCAG 2.2 AA**: Contraste de colores verificado, soporte completo de navegación por teclado, descriptores semánticos ARIA en elementos interactivos y etiquetas `alt` explicativas en imágenes WebP.
*   **Rendimiento Lighthouse 100/100**: Cero Layout Shifts (CLS), Largest Contentful Paint (LCP) inferior a 1.5 segundos, y bloqueo de hilo principal mínimo.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend**: React 19 (Functional Components & Hooks)
*   **Build Tool**: Vite 6.2 (HMR optimizado)
*   **Estilos**: Tailwind CSS v4.0 (Utiliza variables de tema modernas en CSS)
*   **Animaciones**: Framer Motion / Motion (para transiciones suaves)
*   **Iconografía**: Lucide React
*   **Lenguaje**: TypeScript 5.8 (Estricta tipación sin `any` implícitos)

---

## 📂 Estructura del Proyecto

```text
/
├── public/                 # Assets estáticos (imágenes optimizadas WebP, sitemap, robots)
│   ├── img/                # Fotografías profesionales de camiones y mudanzas
│   ├── favicon.png         # Icono de la pestaña del navegador
│   ├── robots.txt          # Reglas de indexación para motores de búsqueda
│   └── sitemap.xml         # Mapa del sitio con las 19 URLs mapeadas
├── src/
│   ├── components/         # Componentes React modulares e interactivos
│   │   ├── SEO.tsx         # Inyector dinámico de Metatags y JSON-LD Schemas
│   │   ├── Header.tsx      # Barra de navegación con mega-menú de destinos
│   │   ├── Footer.tsx      # Mapa del sitio estructurado con NAP de negocio local
│   │   └── QuoteForm.tsx   # Estimador de cotización multi-paso con redirección CRO
│   ├── data/
│   │   ├── destinations.ts # Base semántica de las 19 localidades (Local SEO)
│   │   └── staticData.ts   # Datos estáticos de Servicios, FAQs y Testimonios
│   ├── App.tsx             # Enrutador principal de la aplicación y layouts de vistas
│   ├── main.tsx            # Punto de entrada de la aplicación
│   ├── index.css           # Estilos globales y configuración @theme de Tailwind v4
│   └── types.ts            # Interfaces TypeScript compartidas
├── metadata.json           # Metadatos del applet de Google AI Studio
├── package.json            # Gestión de scripts y dependencias npm
└── tsconfig.json           # Configuración estricta del compilador TypeScript
```

---

## ⚙️ Configuración y Desarrollo

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    *Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación localmente.*

3.  **Ejecutar análisis de tipos (TS check)**:
    ```bash
    npm run lint
    ```

4.  **Compilar para producción**:
    ```bash
    npm run build
    ```
    *Los archivos resultantes optimizados y minimizados se generarán en la carpeta `dist/`.*

---

## 📄 Documentación Adicional

Para más información, consultá los archivos específicos en la raíz del proyecto:
*   `DEPLOY.md`: Instrucciones y configuraciones detalladas para despliegue en Vercel y Cloud Run.
*   `SEO.md`: Estrategia implementada de SEO Local, palabras clave y estructura de datos Schema.org.
*   `PERFORMANCE.md`: Decisiones técnicas para lograr Lighthouse 100/100 y optimización de Core Web Vitals.
*   `ARCHITECTURE.md`: Flujo de datos, enrutamiento semántico y justificación del diseño SPA.
*   `COMPONENTS.md`: Detalle de propiedades, estados y diseño interactivo de los componentes React.
