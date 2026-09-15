# Ecosistema Mudanzas — Arquitectura estratégica

## Rol del proyecto

**Mudanzas Miranda = QUIÉN / PROVEEDOR**

Este dominio funciona como capa comercial y de conversión. Su objetivo es demostrar quién presta el servicio, por qué confiar, qué servicios ofrece y cómo solicitar presupuesto.

## Principios

1. No competir con Mudanzas en Mendoza como portal editorial.
2. No competir con MudanzaPro como herramienta.
3. Priorizar confianza, evidencia, servicios, cobertura y contacto.
4. Una CTA comercial primaria debe permanecer clara.
5. Todo dato comercial publicado debe corresponder a la entidad real.

## Arquitectura de información objetivo

- Inicio
- Empresa
- Servicios
- Zonas de cobertura
- Cómo trabajamos
- Experiencia/confianza
- Preguntas frecuentes
- Contacto
- Solicitar presupuesto

## Journey principal

Necesidad → servicio → evidencia/confianza → cobertura → contacto/presupuesto.

## Clusters SEO/GEO

- empresa de mudanzas
- mudanzas profesionales
- mudanzas particulares
- mudanzas de oficina
- mudanzas por zona
- presupuesto de mudanza
- búsquedas comerciales locales

## Transferencias del ecosistema

- MudanzaPro → Mudanzas Miranda cuando el usuario necesita contratar.
- Mudanzas en Mendoza → Mudanzas Miranda únicamente cuando la intención pasa de informativa a comercial.
- Evitar enlaces internos que confundan a la empresa con el producto MudanzaPro.

## UX/UI

La interfaz debe comunicar proveedor real: propuesta de valor inmediata, prueba/evidencia, servicios, cobertura, proceso y CTA de presupuesto. Compartir tokens y componentes base con el ecosistema, pero mantener una expresión comercial propia.

## SEO/GEO

Priorizar entidad empresarial real, datos locales consistentes, `Organization`, `LocalBusiness`/`MovingCompany`, `Service`, `BreadcrumbList` y FAQ cuando corresponda. Reviews y ratings solo deben publicarse cuando sean verificables.

## QA

Baseline visual antes de cambios globales: 375×812, 768×1024 y 1440×900. Validar especialmente cards de servicios, CTA, header, formularios y responsive.
