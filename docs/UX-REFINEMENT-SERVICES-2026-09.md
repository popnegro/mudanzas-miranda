# UX/UI Refinamiento — Mudanzas Miranda

## Alcance

Refinamiento de la experiencia existente, sin cambio de lenguaje visual, arquitectura de navegación ni estrategia de contenidos.

## Hallazgos verificados

1. La aplicación React mantiene una sección de servicios tabulada y renderiza una única ficha activa por vez.
2. El modelo `services` ya asigna una imagen específica a cada servicio:
   - Residencial → `/img/mudanza-residencial-800.webp`
   - Oficinas → `/img/mudanza-oficina-800.webp`
   - Combinadas → `/img/mudanza-combinada-800.webp`
   - Embalaje → `/img/mudanza-embalaje-800.webp`
   - Guardamuebles → `/img/mudanza-guardamuebles-800.webp`
   - Logística → `/img/mudanza-logistica-800.webp`
3. El fallback visual del componente de servicios usa una imagen genérica (`mudanzas-miranda-800.jpg`), por lo que navegadores sin WebP podían mostrar una imagen que no correspondiera al servicio activo.
4. En mobile, la lista de servicios es horizontal y necesita controles táctiles con un área de interacción cómoda.
5. El cambio de servicio anima el panel completo; el refinamiento conserva la interacción pero mejora la estabilidad del bloque de imagen.
6. El hero contenía una insignia con valoración agregada hard-codeada. Como no se verificó en esta auditoría que el dato sea una fuente viva, se evita mostrar ese claim como prueba social en la interfaz.

## Cambios realizados en esta rama

- Refinamiento responsive de la sección `#servicios`.
- Imagen de cada servicio tratada como medio principal del panel, con `object-fit: cover`, dimensiones mínimas y contenedor estable.
- Mejora de objetivos táctiles de tabs y CTA.
- Eliminación del scrollbar visual de la navegación horizontal de servicios sin eliminar su desplazamiento táctil.
- En mobile, el bloque de imagen se prioriza visualmente antes del texto.
- Se evita el zoom de imagen en dispositivos touch.
- Se conserva la paleta, tipografía, componentes y jerarquía visual existentes.
- Se oculta la insignia de valoración hard-codeada para no presentar una cifra potencialmente stale como evidencia de confianza.

## Assets

La rama usa exclusivamente imágenes ya presentes en `static/public/img`; no se agregan imágenes externas ni placeholders.

## Pendiente de validación

- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Smoke test desktop/mobile de la sección Servicios.
- Verificar cada tab y confirmar que su imagen corresponde al servicio seleccionado.
- Confirmar que el CTA de cada servicio mantiene el flujo hacia `#form`.
- Revisar visualmente en el deployment generado por Vercel antes de mergear.
