# Proposal

## Why

El TPI frontend de la librería (Programación III, UTN) parte de cero: `index.html` está vacío
(0 bytes, verificado el 2026-10-16) y no existe ninguna estructura HTML sobre la que construir.
La consigna (`docs/Primer Parcial.pdf`, p. 2, "Ejercicio 1 · 1. Estructura y pantallas HTML",
20 puntos) exige como base de todo el TPI 5 vistas navegables con HTML semántico, formularios
asociados y estados visibles. Especificar primero esta base evita implementar a ciegas y fija
la estructura y los `id` estables que consumirán los Ejercicios 2–6.

## What Changes

- Crea un único `index.html` como punto de entrada, con 5 vistas navegables:
  1. **Catálogo**: título de la librería, buscador por título y listado de libros de ejemplo.
  2. **Libros**: formulario de alta + listado en tabla + mensaje de lista vacía.
  3. **Clientes**: formulario de alta + listado en tabla + mensaje de lista vacía.
  4. **Ventas**: selección de cliente, composición de renglones, resumen con total y mensajes
     de operación correcta o rechazada.
  5. **Historial**: listado de ventas en tabla + zona de detalle + mensajes de lista vacía y de detalle.
- Estructura semántica transversal: `header`, `nav` (`ul li a` con `aria-current`), `main`,
  `section`/`article`, `footer`; un solo `h1`; jerarquía `h2`/`h3` por vista.
- Cada control con `label for` + `id`; cada botón con texto de acción específico
  (prohibido "Aceptar"/"Enviar" genérico); cada tabla con `caption` o encabezado asociado
  + `thead` + `th scope`.
- Mensajes y estados como contenedores con `id` y `role="status"` (preparados para el JS futuro).
- Datos estáticos de ejemplo, marcados como ficticios: 2–3 libros (≥1 «Sin clasificar»),
  2 clientes, 1–2 ventas.
- Preparación futura SOLO como `id` / `data-*` / contenedores, sin comportamiento.

## Capabilities

### New Capabilities

- `libreria-estructura-html`: estructura HTML estática de la librería con 5 vistas navegables,
  formularios con etiquetas asociadas, tablas con encabezados y contenedores de mensajes/estados,
  verificable abriendo `index.html` en el navegador sin herramientas.

### Modified Capabilities

- Ninguna. No existen specs previas (`openspec list --specs` devuelve lista vacía,
  verificado el 2026-10-16).

## Impact

- **Producto (en la futura implementación, no en este change de SPEC)**: se toca únicamente
  `index.html` (y, solo si el diseño multi-página resultara elegido, sus HTML vinculados —
  ver `design.md`, donde se decide página única). `css/` y `js/` quedan intactos y vacíos.
- **Sin dependencias nuevas**: solo HTML estático; sin librerías, frameworks, CDNs, API,
  base de datos, servidor, build ni `npm`.
- **Alcance posterior**: los Ejercicios 2–6 consumen los `id`, `data-*` y contenedores aquí
  definidos; cambiarlos después obliga a revisar esta spec.

## Contexto verificado

| Fuente | Hecho verificado |
| --- | --- |
| `docs/Primer Parcial.pdf`, p. 2 | Ejercicio 1: estructura y pantallas HTML; 5 vistas; semántica, labels, botones descriptivos, tablas con encabezados, mensajes de lista vacía / sin resultados / operación correcta o rechazada; datos estáticos de ejemplo permitidos en la primera etapa. 20 pts (10 vistas y navegación + 10 semántica, formularios y estados). Fuente normativa ante contradicciones. |
| `index.html` | Archivo vacío, 0 bytes (lectura directa + tamaño, 2026-10-16). |
| `css/`, `js/` | Carpetas existentes y vacías (listado del 2026-10-16). |
| `openspec/config.yaml` | Esquema `spec-driven`, sin `context` ni `rules` personalizadas. |
| `docs/Prompts/prompt1.md` | Brief operativo del usuario con R-01..R-07 y CA-01..CA-04. Fuente subordinada al PDF. |
| `openspec list --specs` | Sin capabilities existentes; la capability `libreria-estructura-html` es nueva. |

## Alcance

### Incluido

1. Catálogo: título de la librería, buscador por título (`input type="search"` con `label`
   + botones "Buscar en catálogo" / "Limpiar búsqueda"), listado con título, ISBN, editorial,
   género, autores y precio; libro sin género con texto literal «Sin clasificar»;
   zona de mensaje "búsqueda sin resultados".
2. Libros: formulario de alta (título, ISBN, precio, editorial, género, autores; `label for`,
   tipos HTML correctos; botones "Registrar libro" / "Limpiar formulario") + listado en
   `table` con `thead`/`th` + mensaje de lista vacía.
3. Clientes: formulario de alta (nombre completo, email; `label for`; botones
   "Registrar cliente" / "Limpiar formulario") + listado en `table` con `thead`/`th`
   + mensaje de lista vacía.
4. Ventas: selección de cliente (`select` con `label`); renglones (selector de libro +
   cantidad + botón "Agregar renglón"; tabla libro/cantidad/precio unitario/subtotal/acciones);
   resumen (total + botones "Confirmar venta" / "Cancelar venta" + zona de mensajes
   de operación correcta o rechazada).
5. Historial: ventas en `table` (`thead`: identificador, fecha, cliente, total, detalle)
   + zona de detalle de venta + mensajes de lista vacía y de detalle.
6. Transversales: `header`, `nav` (`ul li a` + `aria-current`/estado activo), `main`,
   `section`/`article`, `footer`; un `h1`; `h2`/`h3` por vista; `label for`+`id` por control;
   botones descriptivos; tablas con `caption` o encabezado asociado + `thead` + `th scope`;
   mensajes como contenedores con `id` y `role="status"`/`aria-live`; accesibilidad básica
   (`alt` informativo vs `alt=""` decorativo, foco por teclado sin trampas, sin `tabindex` positivo).

### Excluido (explícito)

- Ejercicio 2: CSS visual completo, responsive, Flexbox/Grid.
- Ejercicio 3: arrays/objetos JS, render dinámico, filtro funcional.
- Ejercicio 4: `preventDefault`, validaciones funcionales, actualización sin recarga.
- Ejercicio 5: cálculo de subtotales/totales, confirmación real, historial inmutable.
- Ejercicio 6: `localStorage`, README, casos manuales.
- Siempre excluidos: API, base de datos, servidor, backend, login real, librerías/frameworks/CDNs.

## Criterios de aceptación

- [ ] CA-01 — `index.html` es la entrada y navega a las 5 vistas sin páginas rotas (cubre R-01, R-05).
- [ ] CA-02 — Cada vista contiene los campos/listados/tablas descritos; tablas con
      `caption`/encabezado + `thead` + `th scope`; labels y botones descriptivos correctos
      (cubre R-01, R-02, R-04, R-06).
- [ ] CA-03 — Existen mensajes/contenedores para lista vacía, sin resultados, éxito y error
      con `id` y `role="status"`/`aria-live`; datos estáticos de ejemplo presentes incluyendo
      «Sin clasificar» (cubre R-03).
- [ ] CA-04 — Validador HTML sin errores en semántica, labels, botones y tablas; accesibilidad
      básica (`alt`, foco sin trampas) y verificación manual en navegador sin `npm`
      (cubre R-04, R-05).
- [ ] No se incorpora trabajo excluido; se respetan las tecnologías permitidas (cubre R-05, R-07).

## Supuestos

1. La verificación se hace abriendo el archivo con `file://` en un navegador moderno;
   no se requiere servidor local.
2. "Validador HTML sin errores" significa 0 errores de semántica, labels, botones y tablas;
   los avisos (warnings) se informan pero no bloquean salvo que revelen una mala práctica.
3. Los textos exactos de los datos de ejemplo se definen en la implementación, siempre
   señalados como ejemplos ficticios.
4. Ante contradicción entre el brief (`prompt1.md`) y el PDF, prevalece el PDF.

## Información pendiente (no bloqueante)

- `{{DATO_PENDIENTE: nombre oficial de la librería para el `h1` y el `title`}}` —
  placeholder propuesto: «Librería de ejemplo» (marcado como ficticio hasta confirmación).
- `{{DATO_PENDIENTE: textos exactos de libros, clientes y ventas de ejemplo}}` —
  a definir en la implementación dentro de los mínimos fijados en la spec.

## Decisiones que requieren respuesta

Sin preguntas bloqueantes: el PDF p. 2 y el brief cubren todo lo esencial del alcance.
Antes de pasar a PLAN se solicita ratificar:

1. ¿Se ratifica la opción **página única por secciones** decidida en `design.md`?
   (Si se prefiere multi-página, indicarlo ahora: cambia la spec y las tareas.)
2. ¿Cuál es el **nombre de la librería** (o se mantiene el placeholder ficticio)?
3. ¿Los mínimos de ejemplo (2–3 libros, 2 clientes, 1–2 ventas) son suficientes o se
   amplían dentro del Ejercicio 1?
