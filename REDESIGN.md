Para **Mudanzas Miranda**, no diseñaría un prompt que solo "genere una web". Diseñaría un **prompt de dirección editorial y técnica** para que el agente (Claude Code, Codex o Gemini CLI) construya un sitio que pueda competir en SEO local y conversión sin caer en patrones de contenido repetitivo.

El objetivo principal del prompt debe ser:

* representar una **empresa real** y no una landing SEO;
* maximizar EEAT (Experience, Expertise, Authoritativeness, Trustworthiness);
* cumplir con las políticas de Google Search y Spam Policies;
* optimizar Core Web Vitals;
* generar contenido útil, original y verificable.

El prompt sería el siguiente:

---

# PROMPT MAESTRO — MUDANZAS MIRANDA

## ROL

Actúa como un equipo multidisciplinario compuesto por:

* SEO Manager Senior
* UX/UI Designer Senior
* CRO Specialist
* Technical SEO Consultant
* Copywriter especializado en servicios locales
* Especialista en EEAT
* Arquitecto Next.js 15
* Especialista en Core Web Vitals
* Desarrollador Frontend Senior
* Especialista en Accesibilidad WCAG 2.2
* Consultor en Google Search Essentials

Tu objetivo es transformar el repositorio completo en el mejor sitio web de mudanzas de Mendoza, preparado para competir por las primeras posiciones de Google sin infringir ninguna política de Google Search.

---

## OBJETIVO DEL SITIO

Este sitio representa una empresa real llamada **Mudanzas Miranda**.

No es un portal.

No es un directorio.

No es un marketplace.

No es una landing masiva.

Debe transmitir confianza, experiencia y profesionalismo.

Todo el contenido debe demostrar que la empresa existe y presta el servicio.

---

## POLÍTICAS DE GOOGLE

Cumplir estrictamente:

* Google Search Essentials
* Spam Policies
* Helpful Content System
* EEAT
* Core Web Vitals
* Mobile First
* Structured Data Guidelines

NO generar:

* contenido duplicado
* doorway pages
* keyword stuffing
* texto repetitivo
* contenido creado únicamente para posicionar
* páginas cambiando únicamente nombres de ciudades o barrios

Cada página debe aportar valor real.

---

## IDENTIDAD DEL SITIO

El sitio debe posicionar la marca Mudanzas Miranda.

Toda la comunicación debe enfocarse en:

* confianza
* seguridad
* puntualidad
* experiencia
* protección del mobiliario
* servicio profesional
* atención personalizada

---

## EXPERIENCIA DE USUARIO

Diseñar una experiencia premium similar al nivel de empresas líderes.

Priorizar:

* navegación simple
* CTA permanentes
* WhatsApp visible
* llamada inmediata
* presupuesto rápido
* formularios cortos
* testimonios
* casos reales
* fotografías propias (usar marcadores hasta disponer del material definitivo)

---

## ARQUITECTURA

Crear únicamente páginas que representen a la empresa.

Ejemplo:

Inicio

Nosotros

Servicios

Mudanzas Residenciales

Mudanzas Corporativas

Mudanzas Nacionales

Mudanzas Locales

Embalaje Profesional

Guardamuebles

Cobertura

Preguntas Frecuentes

Casos de Éxito

Galería

Contacto

Cotización

Política de Privacidad

Términos

No crear páginas masivas para barrios o departamentos en este dominio.

---

## CONTENIDO

Todo el contenido debe ser completamente original.

Nunca reutilizar párrafos entre páginas.

Cada página debe tener:

* intención de búsqueda específica
* estructura propia
* ejemplos distintos
* FAQs exclusivas
* CTA diferentes
* enlaces internos naturales

No copiar estructuras repetitivas.

---

## SEO

Generar automáticamente:

* Title único
* Meta Description única
* H1 único
* Open Graph
* Twitter Cards
* Canonical
* Robots
* Sitemap
* Breadcrumbs
* Enlaces internos
* Anchor Text variados

---

## EEAT

Demostrar experiencia mediante:

* historia de la empresa
* años de experiencia
* equipo
* flota
* cobertura
* metodología de trabajo
* seguros
* embalajes
* testimonios
* fotografías
* casos reales
* certificaciones (si existen)
* políticas de calidad

Nunca inventar datos. Si falta información, dejar marcadores claramente identificados para completar posteriormente.

---

## SEO LOCAL

Implementar:

* LocalBusiness
* MovingCompany
* Service
* Organization
* Breadcrumb
* FAQ
* Review
* AggregateRating (solo si existen reseñas reales)

Agregar NAP consistente.

Integrar Google Maps.

Definir área de cobertura.

---

## BLOG

Crear un blog orientado a resolver problemas reales del usuario.

Cada artículo debe responder una intención diferente.

Ejemplos:

Cómo preparar una mudanza

Errores más comunes

Cómo embalar muebles

Mudanzas en edificios

Cómo calcular el volumen

Checklist descargable

Mudanzas con mascotas

Mudanzas de oficinas

Seguros para mudanzas

No generar artículos superficiales ni variaciones del mismo contenido.

---

## RENDIMIENTO

Objetivos:

Lighthouse > 95

Performance > 95

Accessibility > 100

Best Practices > 100

SEO > 100

Core Web Vitals:

LCP < 2 s

CLS < 0.05

INP < 150 ms

Optimizar:

* imágenes AVIF/WebP
* carga diferida
* fuentes
* CSS crítico
* Server Components
* caché
* prefetch
* compresión

---

## ACCESIBILIDAD

Cumplir WCAG 2.2 AA:

* navegación por teclado
* contraste adecuado
* textos alternativos
* jerarquía correcta de encabezados
* formularios accesibles
* estados de foco visibles

---

## CONVERSIÓN

Cada página debe tener un objetivo claro:

* solicitar presupuesto
* llamar
* enviar WhatsApp
* completar formulario
* guardar contacto

No incluir llamadas a la acción genéricas.

---

## CREDIBILIDAD

Generar secciones para:

* Preguntas frecuentes
* Casos de éxito
* Antes y después
* Cómo trabajamos
* Nuestro proceso
* Cobertura
* Garantías
* Seguro
* Flota
* Equipo

---

## TECNOLOGÍA

Refactorizar completamente utilizando:

* buenas prácticas de accesibilidad y rendimiento

---

## VALIDACIONES

Antes de finalizar:

* verificar que no existan contenidos duplicados;
* comprobar que cada página tenga metadatos únicos;
* validar el marcado Schema.org;
* revisar enlaces rotos;
* generar sitemap.xml y robots.txt;
* revisar canónicos;
* verificar accesibilidad;
* ejecutar auditoría Lighthouse;
* generar un informe con todas las mejoras realizadas y las tareas pendientes que requieren información real del cliente.

---

## Criterios de aceptación

El trabajo solo se considera finalizado cuando:

* no existan errores de compilación;
* el proyecto esté listo para desplegar en Vercel;
* todas las páginas sean funcionales;
* el contenido sea original y orientado al usuario;
* la arquitectura cumpla con las directrices de Google Search;
* el sitio alcance un estándar de calidad apto para competir con las principales empresas de mudanzas de Mendoza en términos de SEO, experiencia de usuario y conversión.

---

Este enfoque convierte a **Mudanzas Miranda** en el **sitio corporativo de referencia**. Luego, **Mudanzas Mendoza** debería seguir una estrategia completamente distinta (portal de contenido, guías, herramientas y recursos), de modo que ambos dominios se complementen en lugar de competir entre sí.
