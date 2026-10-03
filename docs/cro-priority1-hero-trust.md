# CRO Priority 1 — Hero + Trust Checkpoints

Implementación de la auditoría UX/UI (Octubre 2026).

## 1. Componente nuevo

`src/components/TrustCheckpoints.tsx` — barra de garantías above-the-fold.

## 2. Cambios en `src/pages/HomePage.tsx`

### Import

```tsx
import TrustCheckpoints from '../components/TrustCheckpoints';
```

### Hero props (reemplazar)

```tsx
<Hero
  eyebrow={<><Truck className="w-4 h-4" aria-hidden="true" />Mudanzas en Mendoza · +20 años · Flota propia</>}
  title="Mudanzas sin estrés. Tus muebles llegan intactos."
  description={<>Camiones alfombrados, seguro de carga incluido, habilitación CNRT y seguimiento satelital. Presupuesto cerrado en minutos.</>}
  // primaryAction y secondaryAction sin cambios
```

### Insertar después del cierre de `<Hero ... />`

```tsx
<TrustCheckpoints />
```

### Descripción de la sección Trust

```
La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Combinamos más de 20 años de experiencia, flota propia con camiones alfombrados, seguro de carga incluido y seguimiento satelital.
```

## 3. Archivo completo listo

Ver `HomePage.cro-priority1.tsx` en el workspace de la auditoría (artifacts).

## Objetivo CRO

Reducir ansiedad del usuario mendocino en los primeros 5–8 segundos destacando protección de pertenencias y garantías comerciales validadas.
