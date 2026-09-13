# UX/UI Refinamiento — Mudanzas Miranda

## Alcance

Refinamiento de la experiencia existente, sin rediseñar el lenguaje visual ni eliminar contenido, servicios, CTAs o bloques informativos.

## Hallazgos verificados

1. La aplicación React mantiene una sección de servicios tabulada y renderiza una única ficha activa por vez.
2. El modelo `services` ya asigna una imagen específica en WebP a cada servicio:
   - Residencial → `/img/mudanza-residencial-800.webp`
   - Oficinas → `/img/mudanza-oficina-800.webp`
   - Combinadas → `/img/mudanza-combinada-800.webp`
   - Embalaje → `/img/mudanza-embalaje-800.webp`
   - Guardamuebles → `/img/mudanza-guardamuebles-800.webp`
   - Logística → `/img/mudanza-logistica-800.webp`
3. El componente de servicios conserva un fallback `.jpg` en el `<img>` aunque el `<source>` principal usa WebP. Esto debe normalizarse para cumplir estrictamente el criterio de "solo WebP" en el código de imágenes.
4. `PhotoCarousel.tsx` todavía contiene fallbacks y `srcSet` `.jpg` aunque su primera fuente es WebP; también debe normalizarse antes del cierre de la auditoría de assets.
5. `SEO.tsx` utilizaba una imagen social `.jpg`; ahora apunta a `/img/mudanzas-miranda-residencial.webp`, un asset existente del repositorio.
6. El menú desktop usa dropdowns de Servicios y Destinos. El menú mobile conserva Inicio, Nosotros, Servicios, Destinos y CTAs; el refinamiento debe mejorar jerarquía y área táctil sin ocultar elementos.

## Cambios realizados en esta rama

- Refinamiento responsive de la sección `#servicios`.
- Cada servicio mantiene su imagen propia y contenido existente.
- Mejora de objetivos táctiles de tabs y CTA.
- Eliminación únicamente del scrollbar visual de la navegación horizontal de servicios, manteniendo el desplazamiento táctil.
- En mobile, el bloque de imagen se prioriza visualmente antes del texto sin eliminar copy.
- Se evita el zoom de imagen en dispositivos touch.
- Refinamiento del menú desktop: áreas de interacción mínimas, dropdowns más legibles y separación visual más estable.
- Refinamiento del menú mobile: panel más cómodo para lectura y navegación táctil, conservando todos los ítems y CTAs existentes.
- Se restauró la visibilidad del contenido existente; no se oculta la insignia de valoración mediante CSS.
- La metadata social principal de SEO usa un asset WebP existente.
- No se agregaron imágenes externas ni placeholders.

## Assets

Los servicios activos usan assets locales bajo `/img/` y WebP como fuente principal. El repositorio todavía contiene referencias `.jpg` en componentes legacy/compatibilidad, por lo que la auditoría de "solo WebP" no debe marcarse como cerrada hasta normalizar esas referencias.

## Pendiente de validación

- Normalizar `App.tsx` para eliminar el fallback `.jpg` del bloque de servicios.
- Normalizar `PhotoCarousel.tsx` para eliminar `jpgSrcSet` y `defaultJpg` y usar únicamente assets WebP existentes.
- Revisar `static/index.html` y el generador de páginas estáticas para metadata `.jpg` heredada.
- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Smoke test desktop/mobile del menú y de la sección Servicios.
- Verificar cada tab y confirmar que su imagen corresponde al servicio seleccionado.
- Confirmar que el CTA de cada servicio mantiene el flujo hacia `#form`.
- Revisar visualmente en el deployment generado por Vercel antes de mergear.
