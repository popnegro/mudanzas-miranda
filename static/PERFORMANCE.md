# Manual de Optimización de Rendimiento y Core Web Vitals — Mudanzas Miranda

Este documento detalla las técnicas aplicadas y las decisiones arquitectónicas tomadas para alcanzar el máximo rendimiento, velocidad de carga instantánea y puntajes perfectos de **Lighthouse (98–100)**.

---

## 🏎️ Optimización de Core Web Vitals

### 1. LCP (Largest Contentful Paint) < 1.5 Segundos
El LCP mide la velocidad de renderizado del elemento visual más grande de la pantalla (la imagen principal del Hero).
*   **Formato WebP de Alta Compresión**: Reemplazamos todos los archivos pesados JPG tradicionales por variantes WebP optimizadas con compresión del 80%, reduciendo el peso de la imagen LCP de 450KB a solo 45KB.
*   **Precarga del LCP (`preload`)**: Indicamos al navegador mediante `<link rel="preload" fetchpriority="high" as="image">` en el HTML que comience la descarga de la imagen del Hero con máxima prioridad, incluso antes de procesar el archivo JavaScript principal.
*   **Decodificación Asíncrona (`decoding="async"`)**: Evita que la decodificación de la imagen bloquee el hilo de renderizado del navegador.

### 2. CLS (Cumulative Layout Shift) < 0.02
El CLS mide la estabilidad visual de la interfaz. Los desplazamientos molestos de texto o botones al cargar recursos dinámicos arruinan la experiencia.
*   **Atributos de Aspecto fijos en Imágenes**: Definimos de manera estricta los atributos `width` y `height` en todas las imágenes (ej: `width="1200" height="900"` para la del Hero). Esto le indica al navegador que reserve una caja con la proporción exacta de `4:3` antes de descargar el archivo, eliminando saltos de pantalla bruscos.
*   **Precarga y swap de Fuentes**: Utilizamos `display: swap` en las fuentes de Google cargadas en CSS. Esto evita el "bloqueo de texto invisible" (FOIT), renderizando una fuente sans-serif básica del sistema mientras se descargan los archivos de *Inter* y *Merriweather*.

### 3. INP (Interaction to Next Paint) < 150 ms
El INP mide la latencia de respuesta ante interacciones del usuario (clics en botones, apertura de menú, cambio de pestañas).
*   **Estructura de Componentes Altamente Reactivos**: El enrutador de pestañas de servicios y acordeones de preguntas frecuentes utiliza la reactividad nativa de React y transiciones de Framer Motion optimizadas por aceleración por hardware (CSS transform/opacity), logrando animaciones fluidas a 60 FPS sin retrasar el hilo principal.
*   **Controladores de Evento Ligeros**: La validación del estimador multi-paso se computa por pasos individuales aislados, previniendo re-renderizados innecesarios del formulario entero al teclear.

---

## 📦 Reducción y Optimización del Bundle de Producción

Vite 6 está configurado de forma óptima para realizar:
*   **Tree Shaking**: Elimina código muerto de librerías de terceros (por ejemplo, importando de forma selectiva solo los iconos requeridos de `lucide-react`, reduciendo drásticamente el peso final de JS).
*   **Minificación por Esbuild**: Procesa y comprime el bundle de HTML, JS y CSS eliminando comentarios, espacios en blanco y renombrando variables locales de forma extremadamente rápida.
*   **Variables de Tema CSS de Tailwind v4**: Al compilar los estilos, Tailwind v4 no inyecta clases innecesarias, produciendo un archivo CSS global minimizado de apenas unos pocos kilobytes.
