# Mudanzas Miranda — HUMAN GATE P1

## Estado

**P1 APROBADO por el propietario del proyecto.**

La confirmación recibida en esta sesión habilita la implementación de los datos empresariales y comerciales que habían quedado bloqueados durante la auditoría de Fase 2.

## Alcance desbloqueado

Quedan habilitados para implementación, sujetos a mantener consistencia entre UI, metadata, Schema y URLs canónicas:

- datos de contacto;
- dirección y ubicación;
- horarios de atención;
- redes sociales oficiales;
- servicios ofrecidos;
- cobertura geográfica confirmada;
- mudanzas residenciales;
- mudanzas de oficinas;
- embalaje;
- guardamuebles;
- logística;
- mudanzas combinadas y de larga distancia;
- flota y capacidades operativas verificadas;
- experiencia/antigüedad declarada;
- seguro/cobertura de carga;
- habilitaciones y certificaciones verificadas;
- reputación, ratings y testimonios cuando correspondan a una fuente real.

## Regla de implementación

La aprobación P1 no autoriza inventar ni ampliar datos fuera de lo confirmado. Cada dato debe mantenerse idéntico entre el contenido visible y sus representaciones SEO/Schema.

No se deben introducir:

- ratings sintéticos;
- reviewCount inventado;
- testimonios ficticios;
- localidades no confirmadas;
- servicios no confirmados;
- claims comerciales adicionales;
- datos de contacto distintos de los aprobados.

## Siguiente ejecución

1. Rehabilitar Entity SEO con `MovingCompany`/`LocalBusiness` usando los datos verificados.
2. Implementar el hub `/mudanzas-en-mendoza`.
3. Normalizar URLs de servicios hacia la arquitectura aprobada.
4. Normalizar URLs locales Tier 1 y mantener diferenciación real por localidad.
5. Rehabilitar únicamente las URLs aprobadas en sitemap.
6. Añadir `FAQPage` solo para preguntas/respuestas visibles y verificadas.
7. Ejecutar build, typecheck y QA final antes de declarar la Fase 2 cerrada.

## Gate restante

**P0 Seguridad:** continúa pendiente de una revisión local completa de `.env`, historial Git, logs y secretos de plataforma. Si aparece cualquier secreto real, detener ejecución y abrir HUMAN GATE P0.
