# Arquitectura de la Aplicación — Mudanzas Miranda

Este documento describe la arquitectura de software, los flujos de datos y las decisiones de diseño estructural implementadas en esta aplicación web.

---

## 🏛️ Principios de Diseño

1.  **Separación de Responsabilidades (SoC)**: El código se divide rigurosamente en tipos de datos, almacenes de datos semánticos estáticos, componentes de UI interactivos reutilizables y el nodo del enrutador principal en `App.tsx`.
2.  **Arquitectura Basada en Datos**: La información clave (servicios, testimonios, FAQs) se gestiona desde almacenes de datos estructurados para facilitar el mantenimiento y la coherencia, evitando la duplicación de contenido.
3.  **Reactividad y Control de Estado**: El estado se mantiene en la capa superior de la vista requerida, inyectando propiedades de forma limpia hacia los componentes de presentación independientes.

---

## 🔗 Diagrama de Flujo y Navegación

```text
        +----------------------------------+
        |  Ingreso de Usuario (HTTP Request)|
        +-----------------+----------------+
                          |
                          v
        +-----------------+----------------+
        |      Cargar Vista Principal      |
        |      (Home, Servicios, etc.)     |
        +-----------------+----------------+
                          |
                          v
        +-----------------+----------------+
        |  Inyectar metatags y schemas    |
        |  dinámicos mediante <SEO />     |
        +-----------------+----------------+
                          |
                          v
        +-----------------+----------------+
        | Renderizar Header, Layout y     |
        | Footer (SPA React instantánea)  |
        +----------------------------------+
```

---

## 📂 Separación de Capas (Estructura de Directorios)

### 1. Capa de Modelado de Datos (`/src/types.ts`)
Define contratos estáticos estrictos para:
*   `Destination`: Propiedades de SEO y texto localizado de las 19 regiones.
*   `Service`: Propiedades de los servicios (título, descripción, imagen, etc.).
*   `Testimonial`: Campos de opinión de clientes y calificaciones.
*   `QuoteRequest`: Campos obligatorios del formulario de cotizaciones.

### 2. Capa de Datos Estáticos (`/src/data/`)
*   `destinations.ts`: Contiene la base de datos de las 19 regiones de Mendoza con descripciones únicas y títulos enfocados en SEO de negocio local.
*   `staticData.ts`: Centraliza la información de FAQs, los 6 servicios clave y los testimonios de clientes verificados.

### 3. Capa de Presentación de UI (`/src/components/`)
*   `SEO.tsx`: Inyecta etiquetas de metadatos en la cabecera y estructuración JSON-LD en tiempo de ejecución.
*   `Header.tsx`: Navbar responsivo con mega-menú de destinos agrupados por zona.
*   `Footer.tsx`: Enlaces directos a las 19 subpáginas agrupadas y NAP del negocio local.
*   `QuoteForm.tsx`: Lógica aislada de estimación de mudanzas en 3 pasos con soporte de geolocalización nativa HTML5 y generación dinámica de mensajes de WhatsApp.

### 4. Capa de Orquestación (`/src/App.tsx`)
*   Inicializa la escucha del estado de URL de navegación (`history.pushState`).
*   Controla el enrutamiento y cambio de vistas con transiciones y animaciones suaves.
*   Sirve como el esqueleto del layout principal.
