# Guía de SEO Técnico y Local — Mudanzas Miranda

Este documento detalla la estrategia de **SEO Técnico y SEO Local** implementada en el sitio de Mudanzas Miranda para garantizar la máxima visibilidad en búsquedas locales de Mendoza y construir una fuerte presencia de marca basada en E-E-A-T (Experiencia, Expertise, Autoridad y Confianza).

---

## 🎯 Arquitectura de Contenido Orientada al Usuario

La arquitectura del sitio se centra en páginas que aportan valor real y responden a las intenciones de búsqueda del usuario, evitando la creación de páginas "doorway" o contenido duplicado. La estructura se basa en un sitio corporativo claro y profesional: Inicio, Servicios, Sobre Nosotros, Contacto, etc.

## 🧠 Inyección de Datos Estructurados JSON-LD (Schema.org)

La inyección de esquemas ayuda a Google a entender la naturaleza comercial del negocio físico, su ubicación geográfica y sus servicios específicos para mostrar fragmentos enriquecidos (Rich Snippets) en las búsquedas.

### 1. Esquema `MovingCompany` (Global)
Aplicado en todo el sitio, indica los datos fundamentales del negocio local (NAP: Name, Address, Phone):

Este schema se enriquece con propiedades heredadas de `LocalBusiness` para maximizar la visibilidad en el Local Pack de Google y en Google Maps.

*   **@type**: `MovingCompany` (Hereda de `LocalBusiness`, es la opción más específica y correcta).
*   **name**: Mudanzas Miranda
*   **address**:
    *   **@type**: `PostalAddress`
    *   **streetAddress**: Armada Argentina 584
    *   **addressLocality**: Mendoza
    *   **postalCode**: 5501
    *   **addressCountry**: AR
*   **telephone**: +5492615130910
*   **url**: URL canónica del sitio.
*   **geo**:
    *   **@type**: `GeoCoordinates`
    *   **latitude**: -32.92845 (Coordenadas exactas del negocio)
    *   **longitude**: -68.83541
*   **openingHours**: `Mo-Sa 09:00-18:00` (Horario de atención).
*   **aggregateRating**:
    *   **@type**: `AggregateRating`
    *   **ratingValue**: 4.9
    *   **reviewCount**: 186

### 2. Esquema `Service` (Localizado por Localidad)
Cuando un usuario (o robot) ingresa a una página de servicio, se inyecta dinámicamente el esquema de Servicio:
*   **serviceType**: Servicio de Mudanza Residencial y Comercial
*   **areaServed**: Representa el área de servicio principal ("Mendoza").
*   **description**: Resumen semántico optimizado con palabras clave locales.

### 3. Esquema `FAQPage` (Global y por Página)
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
