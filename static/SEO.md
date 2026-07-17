# Guía de SEO Técnico y Local — Mudanzas Miranda

Este documento detalla la estrategia de **SEO Técnico y SEO Local** implementada en la refactorización de Mudanzas Miranda para garantizar la máxima visibilidad en búsquedas geo-localizadas de Mendoza y mantener el 100% de la indexación orgánica acumulada.

---

## 🎯 Arquitectura de Enrutamiento para Paridad Orgánica (100% URL Matching)

En las webs estáticas tradicionales, las páginas residen en rutas directas como `/mudanzas-mendoza/mudanzas-ciudad-mendoza.html`. Al migrar a React (SPA), si no se manejan estas URLs, los motores de búsqueda que ya tienen indexadas estas páginas recibirán errores 404, destruyendo el posicionamiento orgánico.

### Solución React SPA Implementada:
1.  **Escucha de Pathname Directo**: El componente enrutador lee `window.location.pathname` en el ciclo de vida inicial.
2.  **Extracción de Slugs**: Procesa la ruta utilizando expresiones regulares sofisticadas:
    *   `/mudanzas-mendoza/mudanzas-ciudad-mendoza.html` ➔ extrae el slug `mudanzas-ciudad-mendoza`.
3.  **Renderizado Condicional Semántico**: Mapea el slug contra nuestra base de datos local y renderiza la Landing Page geo-localizada correspondiente con **cero redirecciones**, lo que mantiene la velocidad de indexación y conserva intacto el peso orgánico de Google.

---

## 🧠 Inyección de Datos Estructurados JSON-LD (Schema.org)

La inyección de esquemas ayuda a Google a entender la naturaleza comercial del negocio físico, su ubicación geográfica y sus servicios específicos para mostrar fragmentos enriquecidos (Rich Snippets) en las búsquedas.

### 1. Esquema `MovingCompany` (Global)
Aplicado en todo el sitio, indica los datos fundamentales del negocio local (NAP: Name, Address, Phone):
*   **Nombre**: Mudanzas Miranda
*   **Dirección**: Armada Argentina 584, Mendoza, AR
*   **Teléfono**: +54 9 261 513-0910 (Habilitado para clic de marcado directo)
*   **Rating de Opiniones**: 4.9 estrellas basado en 186 reseñas para mostrar estrellas doradas en Google Search.

### 2. Esquema `Service` (Localizado por Localidad)
Cuando un usuario (o robot) ingresa a una subpágina (ej: Godoy Cruz), se inyecta dinámicamente el esquema de Servicio:
*   **serviceType**: Servicio de Mudanza Residencial y Comercial
*   **areaServed**: Representa la localidad activa (ej: "Godoy Cruz" o "San Rafael") contenida en la división administrativa superior ("Mendoza").
*   **description**: Resumen semántico optimizado con palabras clave locales.

### 3. Esquema `FAQPage`
Ayuda a que las preguntas frecuentes de la página de inicio aparezcan colapsadas directamente debajo del resultado de búsqueda de Google, maximizando el CTR (Click-Through Rate).

---

## 🏷️ Mapeo Dinámico de Meta-etiquetas

A través del componente `<SEO />`, actualizamos de forma limpia y reactiva en el ciclo del DOM:
*   `document.title`: Títulos únicos y atractivos respetando el límite de 60 caracteres.
*   `<meta name="description">`: Descripciones ricas en palabras clave persuasivas inferiores a 155 caracteres.
*   `<link rel="canonical">`: Evita contenido duplicado apuntando a la URL absoluta del recurso.
*   `og:title`, `og:description`, `og:url`: Optimizados para previsualizaciones impecables al compartir links en redes sociales (Facebook, WhatsApp, Twitter).

---

## 🗺️ Mapa del Sitio e Indexación

El archivo `/public/sitemap.xml` ha sido optimizado para reflejar la estructura exacta de la aplicación, listando las prioridades de rastreo:
*   **/** (Prioridad 1.0, Cambio diario)
*   **/mudanzas-mendoza/mudanzas-ciudad-mendoza.html** (Prioridad 0.8, Cambio mensual)
*   ...y el resto de las 18 localidades adicionales.

El archivo `/public/robots.txt` da acceso completo a todos los agentes de rastreo legítimos (`Googlebot`, `Bingbot`, `YandexBot`, etc.) y enlaza directamente al sitemap.
