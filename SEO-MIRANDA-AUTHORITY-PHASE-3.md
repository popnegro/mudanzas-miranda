# SEO Miranda — Authority Phase 3

## 1. Estado inicial

Branch: `seo/authority-phase-3`.

La fase parte de la consolidación de Fase 2: entidad Mudanzas Miranda, metadata dinámica, canonical, Organization/LocalBusiness/MovingCompany, rating verificado `4.9 / 496`, sitemap canónico y validación técnica automatizada.

## 2. Auditoría

### Arquitectura y routing

La SPA actual reconoce rutas históricas:

- `/`
- `/nosotros.html`
- `/servicios/{slug}.html`
- `/mudanzas-mendoza/{slug}.html`

También existe un matcher para rutas simples, pero la navegación genera las rutas históricas anteriores. No se introduce una migración masiva de URLs en esta fase sin evidencia de historial SEO.

### Entity SEO

La entidad principal debe permanecer como `Mudanzas Miranda`. El schema de Fase 2 utiliza una única identidad mediante `@id` y relaciona WebSite y Service con ella.

Datos comerciales desbloqueados por P1/Fase 2:

- Nombre: Mudanzas Miranda
- URL: https://www.mudanzasmiranda.com.ar
- Dirección: Armada Argentina 584, Mendoza, AR
- Teléfono: +54 9 261 513-0910
- Email: info@mudanzasmiranda.com.ar
- Horarios: lunes a viernes 08:00–20:00; sábados 09:00–14:00
- Rating: 4.9 / 496

Estos datos no deben duplicarse con variantes de nombre.

## 3. Keyword ownership

Miranda conserva la intención de marca/empresa:

- mudanzas Mendoza
- mudanzas en Mendoza
- empresa de mudanzas Mendoza

Secundarias: mudanzas residenciales Mendoza, mudanzas de oficinas Mendoza, mudanzas locales Mendoza, mudanzas larga distancia Mendoza, traslado de muebles Mendoza y embalaje para mudanzas Mendoza.

No se convierte Miranda en portal editorial, comparador o directorio.

## 4. Arquitectura

Se conservan las URLs históricas funcionales durante esta fase para evitar redirecciones masivas sin evidencia. Los nuevos hubs o aliases limpios requieren validación de historial antes de convertirse en canonical.

## 5. SEO local

Tier 1 mantenido:

- Ciudad de Mendoza
- Godoy Cruz
- Guaymallén
- Las Heras
- Maipú
- Luján de Cuyo

Tier 2/3 no se eleva automáticamente a canonical estratégico. Su cobertura real requiere evidencia adicional.

## 6. GEO

La estructura existente contiene preguntas frecuentes y páginas de servicio/localidad. Se prioriza responder con hechos verificables y evitar claims promocionales no demostrados.

## 7. Schema

Objetivo:

`Entity → WebSite → Service → BreadcrumbList → FAQ cuando corresponda`.

No se agregan tipos estructurados para datos que no estén visibles o verificables.

## 8. E-E-A-T

Se preservan identidad, contacto, servicios, imágenes existentes y proceso. No se deben fabricar testimonios, estadísticas, certificaciones, flota, clientes ni premios.

## 9. Servicios

El repositorio contiene seis servicios: residenciales, oficinas, combinadas, embalaje profesional, guardamuebles y logística integral. La publicación comercial de características específicas queda condicionada a verificación del propietario cuando el contenido afirma capacidades concretas.

## 10. Internal linking

La navegación actual conecta home → servicios/localidades → detalle. Se conserva para no romper rutas existentes. No se aumenta artificialmente la densidad de anchors.

## 11. Conversión

CTA principal: solicitar/cotizar mudanza.
CTA secundario: WhatsApp.

El formulario existente abre WhatsApp con los datos de cotización. No se presenta como almacenamiento persistente ni como backend de leads.

## 12. Formularios

El formulario actual valida origen, destino, servicio, nombre, teléfono y fecha, y genera un mensaje de WhatsApp. No existe persistencia de datos en el frontend.

Pendiente verificable: revisar consentimiento/privacidad y protección anti-spam si el flujo se convierte en captura persistente.

## 13. WhatsApp

El flujo de cotización usa `wa.me/5492615130910`. El número corresponde al dato desbloqueado en Fase 2.

## 14. Analytics

No se inventan IDs de GA/GTM/Clarity/Meta. La instrumentación queda preparada como pendiente hasta disponer de un identificador externo válido.

## 15. Search Console readiness

Sitemap, canonical y robots están preparados. No se declaran métricas de Search Console sin acceso real.

## 16. Performance

No se incorporan librerías nuevas ni rediseño. Las imágenes del hero tienen dimensiones explícitas y se mantienen assets locales existentes.

## 17. Accessibility

Se mantienen labels/aria existentes y navegación de botones. La validación visual/keyboard completa requiere ejecución de navegador.

## 18. Mobile

No se rediseña. Requiere QA visual real en viewport móvil antes del cierre.

## 19. Sitemap

Solo deben quedar URLs canónicas, indexables, funcionales y estratégicas. Las URLs históricas se mantienen mientras sean funcionales y no exista evidencia suficiente para migrarlas.

## 20. Robots

`robots.txt` permite el crawl general y apunta al sitemap canónico. No bloquea CSS, JS o imágenes.

## 21. Seguridad — P0

Búsqueda de `password`, `secret` y `API_KEY` no encontró credenciales expuestas; la coincidencia de `GEMINI_API_KEY` corresponde a documentación que indica configurar `.env.local`, no a un valor secreto publicado.

**P0 no se considera cerrado solamente por búsqueda textual.** Falta auditoría completa de archivos ignorados y Git history antes del cierre definitivo.

## 22. Datos no verificables

Quedan identificados claims del contenido heredado que no deben tratarse como hechos únicamente por existir en el repositorio: seguros, flota propia, habilitaciones, vigilancia 24h, rutas específicas, ahorros porcentuales, disponibilidad, clientes, certificaciones y testimonios individuales.

## 23. HUMAN GATES

### HUMAN GATE — requiere verificación del propietario

- cobertura real Tier 2/Tier 3;
- características específicas de cada servicio;
- certificaciones/habilitaciones;
- flota/vehículos;
- clientes corporativos;
- disponibilidad y frecuencias;
- fuente verificable de testimonios individuales;
- Google Business Profile oficial;
- Analytics/GTM/Clarity IDs;
- Search Console histórico.

### HUMAN GATE P0

Debe completarse una auditoría de secretos sobre todo el repositorio y Git history antes de declarar Fase 3 cerrada.

## 24. Cambios visuales

No se cambia paleta, logo, layout ni estilo general. Se corrigió el uso del logo del footer para utilizar el asset local `/img/brand-light.png` y evitar dependencia de una imagen remota.

## 25. Identidad

Nombre canónico: `Mudanzas Miranda`.

No se crean variantes de entidad como `Mudanzas Miranda Mendoza`, `Mudanzas Miranda Oficial` o similares.

## 26. Paleta

Preservada. No se introduce nueva paleta.

## 27. Logo

Preservado y servido desde el repositorio.

## 28. Imágenes

Se mantienen imágenes existentes del repositorio. No se incorporan imágenes stock, externas o generadas por IA.

## 29. Build

Pendiente de ejecución sobre el branch de Fase 3 después de los cambios finales.

## 30. TypeScript

Pendiente de ejecución sobre el branch de Fase 3.

## 31. Tests

No existe un script de tests dedicado identificado en `static/package.json`; la validación disponible incluye typecheck/build y las comprobaciones técnicas de CI.

## 32. Riesgos

1. El router todavía conserva URLs `.html` históricas.
2. Parte del contenido heredado contiene claims comerciales que requieren evidencia.
3. Los testimonios individuales no tienen fuente verificable dentro del repositorio.
4. La auditoría P0 debe extenderse al historial Git.
5. Mobile y formularios requieren QA de navegador real para cierre.

## 33. Pendientes

- cerrar HUMAN GATE P0;
- verificar cobertura y servicios con propietario cuando corresponda;
- validar testimonios/fuentes;
- ejecutar build/typecheck/tests;
- QA browser de desktop/mobile;
- validar canonical, metadata, JSON-LD, sitemap y robots en deployment final;
- preparar instrumentación solo con IDs externos reales.

## 34. Criterio de cierre

Fase 3 no debe declararse completa hasta que los gates anteriores estén resueltos y la validación técnica y visual confirme que Mudanzas Miranda permanece como una entidad única, verificable y orientada a conversión, sin convertirse en Mudanzas Mendoza ni Mudanza Pro.
