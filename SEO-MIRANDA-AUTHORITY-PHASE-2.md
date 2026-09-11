# SEO-MIRANDA-AUTHORITY-PHASE-2

## Estado

- Repositorio: `popnegro/mudanzas-miranda`
- Rama: `seo/authority-phase-2`
- Base auditada: aplicación Vite/React en `static/`
- Rama ya existente al iniciar la fase; no se creó una segunda rama duplicada.
- Último estado remoto auditado antes de estos cambios: commit `1ee4e0d061037675d639ae31e64cbbe3a3bc5363`.
- La rama venía de una corrección de Fase 1 relacionada con sitemap/robots.

## 1. Estado inicial

La aplicación de `static/` es una SPA React/Vite con rutas virtuales gestionadas desde `src/App.tsx`. La entrada HTML ya contenía title, description, canonical, Open Graph, Twitter/Google verification y preload de imagen. El componente `SEO.tsx` generaba metadatos y Schema dinámicamente.

También existen artefactos heredados/duplicados en el repositorio, incluyendo una aplicación raíz y un árbol `static/legacy/`. Esto requiere mantener separación entre el producto actual y material histórico para no volver a publicar rutas antiguas por accidente.

## 2. Auditoría

### Hallazgos críticos

Se detectaron datos comerciales que no pueden considerarse verificados solamente porque estén presentes en código:

- `4.9 / 5.0` y `186 opiniones` en la Home.
- `ratingValue: 4.9` y `reviewCount: 496` en Schema.
- Testimonios nominales con puntuación 5.
- Teléfono y correo concretos.
- Dirección y coordenadas geográficas.
- Horarios de atención.
- Afirmación de más de 20 años de experiencia.
- Seguro de carga.
- Flota propia.
- Personal permanente/capacitado.
- Guardamuebles vigilado 24 horas.
- Logística integral.
- Mudanzas combinadas y ahorro de hasta 50%.
- Rutas y cobertura provincial/nacional.
- Certificaciones/habilitaciones y condiciones operativas.

La existencia de estos datos en el repositorio no constituye evidencia de veracidad.

### Inconsistencia detectada

La Home muestra `4.9 / 5.0` y `186 opiniones`, mientras el Schema declaraba `4.9` y `496` reseñas. Esto es una señal clara de que el dato de reputación no debe publicarse hasta contar con una fuente verificable.

## 3. Keyword ownership

### Mudanzas Miranda

Ownership principal:

- `mudanzas Mendoza`
- `mudanzas en Mendoza`
- `empresa de mudanzas Mendoza`
- `mudanzas Mendoza empresa`
- `mudanzas residenciales Mendoza`
- `mudanzas de oficinas Mendoza` — solo después de verificar el servicio.
- `mudanzas locales Mendoza` — solo después de verificar cobertura.
- `mudanzas de larga distancia Mendoza` — solo después de verificar cobertura.
- `traslado de muebles Mendoza` — solo después de verificar el servicio.
- `embalaje para mudanzas Mendoza` — solo después de verificar el servicio.

### Mudanzas Mendoza

Debe conservar la intención informativa/temática:

- cómo organizar una mudanza;
- cómo embalar;
- cuánto cuesta una mudanza;
- precio de mudanza;
- guías y preguntas informativas.

### Mudanza Pro

Debe conservar la intención comercial/conversión según la estrategia definida.

## 4. Arquitectura

Arquitectura objetivo aprobada:

```text
/
├── mudanzas-en-mendoza
├── mudanzas-residenciales
├── mudanzas-de-oficinas
├── embalaje
├── traslado-de-muebles
├── mudanzas-larga-distancia
├── zonas/
│   ├── ciudad-mendoza
│   ├── godoy-cruz
│   ├── guaymallen
│   ├── las-heras
│   ├── maipu
│   └── lujan-de-cuyo
├── nosotros
├── opiniones
└── contacto
```

No se crearon automáticamente todas las URLs. La publicación de cada una queda condicionada a intención real, contenido diferencial, servicio real y cobertura verificada.

## 5. URLs

Las URLs locales existentes se mantienen como material auditado, no como URLs aprobadas automáticamente para indexación.

Estado provisional:

- KEEP: Home.
- AUDIT PENDING: páginas locales existentes.
- AUDIT PENDING: páginas de servicios existentes.
- AUDIT PENDING: `nosotros`.
- AUDIT PENDING: cualquier ruta heredada de `static/legacy`.
- NOINDEX temporal: páginas dinámicas no verificadas mediante el componente SEO.

No se ejecutaron 301 ni borrados históricos automáticamente.

## 6. Canibalización

Se mantiene el principio:

| Intención | Miranda | Mudanzas Mendoza |
|---|---|---|
| mudanzas Mendoza | Principal | Secundaria |
| mudanzas en Mendoza | Principal | Secundaria |
| empresa de mudanzas Mendoza | Principal | Secundaria |
| mudanza en Mendoza | Secundaria | Principal |
| precio mudanza Mendoza | Secundaria | Principal |
| cuánto cuesta una mudanza | — | Principal |
| cómo organizar una mudanza | — | Principal |
| cómo embalar | — | Principal |

No se incorporó contenido informativo genérico a Miranda para evitar duplicación temática.

## 7. SEO local

Prioridad estratégica:

- Tier 1: Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo.
- Tier 2: San Martín, Rivadavia, Junín.
- Tier 3: resto de localidades únicamente con cobertura y contenido diferencial comprobables.

La existencia de una página histórica para una localidad no se toma como prueba de cobertura.

## 8. Entity SEO

Se reemplazó el Schema comercial sobrecargado por una entidad mínima y verificable:

- `Organization`
- `WebSite`
- `BreadcrumbList` únicamente cuando corresponde a una página secundaria.

Se eliminaron del Schema dinámico, hasta verificación:

- `telephone`
- `email`
- `address`
- `geo`
- `openingHoursSpecification`
- `aggregateRating`
- `reviewCount`
- `ratingValue`
- `sameAs`
- `priceRange`
- claims de experiencia
- claims de cobertura

`MovingCompany`/`LocalBusiness` queda pendiente de HUMAN GATE.

## 9. GEO / Search + AI

La fase prepara una entidad limpia y consistente, pero no introduce respuestas artificiales basadas en datos no verificados.

Las preguntas objetivo son:

- ¿Quién es Mudanzas Miranda?
- ¿Dónde realiza mudanzas?
- ¿Qué servicios ofrece?
- ¿Realiza mudanzas en Ciudad de Mendoza?
- ¿Trabaja en Godoy Cruz?
- ¿Realiza mudanzas de oficinas?
- ¿Realiza embalaje?
- ¿Cómo pedir un presupuesto?
- ¿Qué datos necesita para cotizar?
- ¿Qué diferencia hay entre flete y mudanza?

Las respuestas definitivas deben completarse después de la verificación del propietario.

## 10. Schema

El Schema actual de Fase 2 evita datos comerciales ficticios.

`FAQPage` fue retirado del componente SEO hasta que las respuestas visibles sean verificadas y coincidan exactamente con el contenido publicado.

`Service`, `LocalBusiness` y `MovingCompany` quedan pendientes de verificación de servicio, cobertura e identidad comercial.

## 11. Servicios

Servicios detectados en código que requieren verificación antes de publicación como hechos:

- Mudanzas residenciales.
- Mudanzas de oficinas.
- Mudanzas combinadas/grupales.
- Embalaje profesional.
- Guardamuebles.
- Logística integral.

No se asumió que un servicio es real por estar definido en `staticData.ts` o `seoPages.ts`.

## 12. Zonas

Se detectaron múltiples páginas de localidades, incluyendo Gran Mendoza, Zona Este/Valle de Uco y Sur de Mendoza.

No se declara cobertura real para ninguna localidad adicional sin confirmación del propietario.

## 13. Internal linking

Estructura objetivo:

```text
HOME
 ↓
MUDANZAS EN MENDOZA
 ↓
SERVICIOS
 ↓
ZONAS
 ↓
CONTACTO
```

Y:

```text
SERVICIO
 ↓
ZONA
 ↓
CONTACTO
```

La implementación completa del hub `/mudanzas-en-mendoza` y la matriz definitiva de enlaces queda pendiente de la verificación de servicios y cobertura.

## 14. E-E-A-T / confianza

Se prioriza:

- identidad de marca;
- descripción clara del servicio;
- contacto verificable;
- cobertura verificable;
- fotografías ya existentes en el repositorio;
- proceso de trabajo verificable;
- reseñas únicamente cuando exista fuente real.

Se evita publicar estadísticas, premios, rankings, cantidad de clientes, años de experiencia o porcentajes no comprobados.

## 15. Conversión

Jerarquía objetivo:

1. Solicitar presupuesto.
2. Contactar por WhatsApp.

No se incorporaron nuevos CTAs ni se rediseñó la interfaz en esta etapa.

## 16. Mobile

No se realizó un rediseño mobile en esta fase remota. Debe verificarse en navegador antes de cerrar la fase, especialmente header, navegación, CTAs, formulario, FAQ, imágenes y WhatsApp.

## 17. Imágenes

Se mantienen las imágenes existentes del repositorio. No se agregaron imágenes externas ni generadas.

La aplicación ya referencia imágenes locales bajo `/img/`.

## 18. Metadata

La entrada `static/index.html` fue actualizada para utilizar:

- Title único de marca.
- Description única.
- Canonical absoluto.
- Robots `index,follow` para Home.
- Open Graph.
- Twitter Card.
- Imagen existente del repositorio.

El componente `SEO.tsx` ahora evita publicar metadatos sociales y Schema con datos comerciales no verificados.

## 19. Sitemap

Se redujo temporalmente el sitemap a la única URL actualmente segura para indexación:

```text
https://www.mudanzasmiranda.com.ar/
```

Se sincronizaron:

- `sitemap.xml` raíz.
- `static/public/sitemap.xml`.

Esto evita indexar URLs de servicios/localidades cuyos datos todavía requieren verificación.

## 20. Robots

`static/public/robots.txt` mantiene `Allow: /` y referencia el sitemap canónico.

No se utilizó robots.txt como sustituto de `noindex`.

## 21. Seguridad

Búsqueda inicial de términos asociados a secretos (`password`, `API_KEY`, `SECRET`, `SMTP`, `token`, `private_key`) sin resultados en el índice disponible.

Esto no sustituye una revisión local completa de `.env`, historial Git, logs y secretos de plataforma.

**HUMAN GATE P0 si se detecta cualquier secreto real.**

## 22. Cambios visuales

No se realizó rediseño visual en esta ejecución.

Se modificó únicamente la capa de metadata/SEO y la indexación segura.

## 23. Confirmación de paleta

No se modificó la paleta existente.

## 24. Confirmación del logo

Se mantuvieron las referencias al logo existente del repositorio.

## 25. Confirmación de imágenes repo-only

Confirmado para esta ejecución: no se agregaron imágenes externas ni nuevas.

## 26. Build

`package.json` de `static/` define:

```text
npm run build -> vite build
```

El build no pudo ejecutarse dentro de esta auditoría remota de GitHub. Debe ejecutarse localmente antes del cierre.

## 27. TypeScript

`package.json` define:

```text
npm run lint -> tsc --noEmit
```

También debe ejecutarse localmente antes del cierre.

## 28. Tests

No se identificó un script de tests específico en el `package.json` auditado. El cierre debe incluir la comprobación de que no existen suites adicionales fuera de los scripts declarados.

## 29. HUMAN GATES

### P0 — Seguridad

- Confirmar ausencia de secretos expuestos.

### P1 — Datos empresariales

Verificar con el propietario:

- teléfono;
- email;
- dirección;
- horarios;
- redes sociales oficiales;
- ubicación/geo;
- cobertura por localidad;
- servicios realmente ofrecidos;
- seguro de carga;
- guardamuebles;
- logística;
- mudanzas de oficinas;
- mudanzas de larga distancia;
- embalaje;
- flota propia;
- experiencia/años;
- habilitaciones/certificaciones;
- precios/condiciones.

### P1 — Reputación

Verificar fuente real de:

- ratings;
- reviewCount;
- testimonios;
- nombres de clientes;
- fechas de reseñas.

### P1 — Arquitectura

Después de verificar datos, decidir para cada URL histórica:

- KEEP
- REWRITE
- MERGE
- 301
- NOINDEX
- REMOVE

No aplicar estas decisiones de forma masiva sin evidencia de indexación/backlinks/intención.

## 30. Riesgos

1. Las páginas históricas contienen numerosos claims comerciales que pueden ser falsos o desactualizados.
2. La arquitectura actual es SPA y utiliza rutas virtuales; el comportamiento de hosting/rewrites debe verificarse.
3. Existen árboles legacy y artefactos duplicados.
4. El sitemap anterior incluía URLs cuya cobertura/servicio no estaba verificada.
5. El Schema anterior contenía datos de reputación inconsistentes.
6. El cierre SEO no debe declararse por un build verde.

## 31. Próximos pasos

1. Ejecutar localmente `npm install` si corresponde.
2. Ejecutar `npm run build`.
3. Ejecutar `npm run lint`.
4. Revisar consola y navegación real de todas las rutas.
5. Completar HUMAN GATE P1 con el propietario.
6. Rehabilitar únicamente servicios y localidades verificadas.
7. Crear `/mudanzas-en-mendoza` como hub local real, no como landing keyword-stuffed.
8. Crear/reescribir páginas de servicios solo para servicios confirmados.
9. Crear/reescribir páginas locales solo para cobertura confirmada y contenido diferencial.
10. Reintroducir `MovingCompany`/`LocalBusiness` únicamente con datos verificados.
11. Reintroducir FAQPage únicamente cuando las respuestas visibles sean verificadas.
12. Regenerar sitemap con URLs canónicas, indexables y aprobadas.
13. Ejecutar auditoría final 404/broken links/broken images/canonical/metadata/Schema/mobile/forms/WhatsApp.
14. Abrir PR de Fase 2 solo después de superar los gates.

## Criterio de cierre

Fase 2 **NO se declara terminada todavía**.

La rama queda en un estado conservador: marca y Home preparadas para ownership, datos comerciales no verificables retirados del Schema, y URLs no verificadas temporalmente fuera del índice/sitemap.

El siguiente cierre depende de evidencia real del propietario y de validación local de build, TypeScript, navegación, mobile y conversión.
