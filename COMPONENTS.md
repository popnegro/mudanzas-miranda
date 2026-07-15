w# Documentación de Componentes — Mudanzas Miranda

Este documento contiene el desglose técnico de los componentes React modulares e interactivos que componen la interfaz premium de **Mudanzas Miranda**.

---

## 🏷️ 1. `<SEO />`
Ubicación: `/src/components/SEO.tsx`

Componente utilitario sin representación visual directa. Se encarga de manipular el DOM del navegador en tiempo de ejecución para actualizar las etiquetas requeridas para motores de búsqueda y rastreadores de redes sociales.

### Propiedades (`SEOProps`):
*   `title` (`string`): Título absoluto de la página que se inyectará en `<title>`.
*   `description` (`string`): Resumen descriptivo que se inyectará en `<meta name="description">`.
*   `canonicalUrl` (`string`): Enlace canonical para evitar penalizaciones por contenido duplicado.
*   `isLocalPage` (`boolean`, opcional): Si es `true`, inyecta un esquema adicional de `Service` localizado.
*   `destinationData` (`Destination`, opcional): Datos de la región seleccionada para alimentar el esquema localizado.

---

## 🧭 2. `<Header />`
Ubicación: `/src/components/Header.tsx`

La barra de navegación principal de la aplicación, optimizada para interactividad instantánea y excelente rendimiento móvil.

### Propiedades:
*   `destinations` (`Destination[]`): Colección completa de las 19 regiones para popular el mega-menú.
*   `activePage` (`string`): Slug de la localidad activa para aplicar estilos de resalto visual.
*   `onNavigate` (`(slug: string) => void`): Callback de orquestación de ruta superior para actualizar el estado del SPA.

### Estados Internos:
*   `isMobileMenuOpen` (`boolean`): Controla la visibilidad del menú desplegable responsivo (Drawer) en pantallas táctiles.
*   `isMegaMenuOpen` (`boolean`): Controla el despliegue del panel mega-menú de 3 columnas en pantallas de escritorio.
*   `isScrolled` (`boolean`): Cambia dinámicamente el estilo del Header (agrega un fondo translúcido y sombra) cuando el usuario hace scroll hacia abajo.

---

## 📑 3. `<Footer />`
Ubicación: `/src/components/Footer.tsx`

Esqueleto de pie de página (Sitemap) robusto diseñado específicamente para fortalecer la semántica y el posicionamiento del negocio local.

### Propiedades:
*   `destinations` (`Destination[]`): Colección de localidades para renderizar los enlaces directos a las subpáginas.
*   `onNavigate` (`(slug: string) => void`): Callback para actualizar el estado de navegación de la aplicación sin recargas físicas de página.

### Características:
*   **Agrupación y Ordenamiento**: Ordena alfabéticamente las 19 localidades para mejorar el mapeo de enlaces.
*   **NAP Riguroso**: Muestra el nombre comercial, la dirección exacta conectada a Google Maps, el teléfono directo y el email de contacto oficial.

---

## 📦 4. `<QuoteForm />`
Ubicación: `/src/components/QuoteForm.tsx`

Formulario inteligente de estimaciones de mudanza en 3 fases diseñado para maximizar la tasa de conversión (CRO).

### Propiedades:
*   `initialService` (`string`, opcional): Tipo de servicio pre-seleccionado por defecto al entrar.
*   `destinationName` (`string`, opcional): Nombre de la localidad pre-rellenada automáticamente en el campo de Destino para minimizar fricciones del usuario.

### Estados Internos:
*   `step` (`number`): Paso activo en pantalla (`1`, `2` o `3`).
*   `formData` (`QuoteRequest`): Datos consolidados ingresados por el usuario.
*   `errors` (`Record<string, string>`): Mensajes de error por campo que se muestran en tiempo real.
*   `isLocating` (`boolean`): Estado de carga del localizador por GPS.
*   `isSubmitting` (`boolean`): Estado de carga en base de datos.
*   `isSuccess` (`boolean`): Controla el cambio a la vista de éxito con botón CRO para envío a WhatsApp.
