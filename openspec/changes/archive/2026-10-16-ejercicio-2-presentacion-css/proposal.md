# Proposal — ejercicio-2-presentacion-css

## Why

El Ejercicio 1 dejó `index.html` funcional pero sin presentación: sin `css/`, sin `<link rel="stylesheet">` y sin identidad visual (verificado: `index.html` líneas 1–256 sin `<link>`; `Test-Path css` = False). El Ejercicio 2 de `docs/Primer Parcial.pdf` p.3 exige identidad visual coherente, layout adaptable con Flexbox/Grid y accesibilidad básica, por 20 puntos (coherencia 8 + adaptación 8 + accesibilidad 4). Sin este change, la maqueta no cumple el alcance de la Etapa 1.

## What Changes

- Agrega ≥1 archivo CSS nativo externo bajo `css/` (propuesta: `css/base.css`, `css/layout.css`, `css/componentes.css`; alternativa única `css/estilos.css` decidida en `design.md`) y lo vincula con `<link rel="stylesheet">` en `index.html` — únicos hooks HTML permitidos junto a `class` y contenedores `overflow-x:auto` por tabla.
- Define identidad visual coherente (tokens: colores, tipografía, espaciado) y clases reutilizables para elementos equivalentes (ej. `.tarjeta-libro`, `.formulario`, `.boton`, `.boton--primario`, `.mensaje`, `.mensaje--error`, `.tabla-contenedor`).
- Organiza el contenido con Flexbox y/o Grid documentados; cada tabla que lo necesite queda envuelta en contenedor con `overflow-x:auto`, conservando intactos `caption`/`thead`/`th scope` del Ejercicio 1.
- Expresa estados y errores con texto además de color; conserva foco visible de teclado, recorrido sin trampas, `alt` correcto y `role="status"` existentes.
- Verificación manual: abrir `index.html` vía `file://` sin npm, a 320px y 1280px, más recorrido completo por teclado. Sin JS funcional, sin validaciones, sin backend.

## Capabilities

### New Capabilities

- `libreria-presentacion-css`: presentación CSS externa, coherente, adaptable y accesible sobre la estructura HTML existente (tokens, layout Flexbox/Grid, componentes reutilizables, tablas con scroll propio, estados por texto, foco visible). Cubre R-01..R-07 y CA-01..CA-04 del brief.

### Modified Capabilities

- Ninguna. La spec previa `libreria-estructura-html` (12 requisitos, verificada vía `openspec show`) NO cambia comportamiento: este change solo agrega presentación por encima, sin alterar semántica ni contenido del Ejercicio 1.

## Impact

- Archivos afectados: `index.html` (solo hooks mínimos: `class`, `<link>`, envolventes de tabla), nuevo(s) archivo(s) en `css/` (a crear en Fase 2 APPLY, no en esta fase SPEC).
- Sin dependencias nuevas, sin npm, sin servidor, sin build, sin CDNs, sin preprocesadores.
- Riesgo principal: tablas anchas (`libros-tabla`, `ventas-renglones`, `historial-tabla`) a 320px — mitigado con `.tabla-contenedor { overflow-x:auto }` por tabla, sin scroll horizontal del `body`.
- Exclusiones explícitas (no son parte de este change): Bootstrap/Tailwind/CDNs, cambios semánticos/contenido Ej.1, JS funcional/render/filtro (Ej.3), `preventDefault`/validaciones (Ej.4), cálculos/confirmación/historial inmutable (Ej.5), `localStorage`/README/casos manuales (Ej.6).
