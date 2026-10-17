# Proposal — ejercicio-3-datos-catalogo (Fase 1: SOLO-SPEC)

## Why

El Ejercicio 3 del Primer Parcial (15 pts: modelo+ejemplos 5, renderizado 5, filtro+estados 5) exige datos locales en JS y catálogo filtrable por título. Hoy `index.html` muestra solo 3 libros estáticos de ejemplo y no existe `js/` ni `<script>` de datos, por lo que el catálogo no se genera desde un modelo ni filtra. Esta propuesta especifica (sin implementar) el modelo de datos, el renderizado y el filtro para que la Fase 2 (tasks + código) tenga un contrato verificable manualmente.

## What Changes

- **Modelo de datos locales (nuevo):** arrays `libros` / `editoriales` / `generos` / `autores` / `clientes` con id estables (`ed1`, `gen1`, `aut1`, `lib1`, `cli1` como ejemplos de formato), con mínimos >=6 libros, >=2 editoriales, >=2 géneros, >=3 autores, >=3 clientes ficticios; cada libro referencia 1 editorial existente + >=1 autor existente; género asignado debe existir; >=1 libro sin género.
- **Renderizado de catálogo desde datos (nuevo):** el contenido de `catalogo-lista` se genera desde el array; cada item muestra título, ISBN, editorial (nombre resuelto), género (nombre o literal "Sin clasificar"), autores (nombres), precio; ejemplos marcados como ficticios.
- **Filtro por título con estados (nuevo):** la búsqueda (`catalogo-busqueda` + botones `catalogo-buscar` / `catalogo-limpiar`) filtra con funciones separadas; vacía o solo-espacios muestra todo; sin coincidencias vacía la lista y muestra mensaje claro en `catalogo-mensaje` (`role=status`); normalización trim + minúsculas + includes; inserción de texto variable solo con `textContent` (prohibido `innerHTML` con datos).
- **Organización y verificación (nuevo):** archivos en `js/` (p. ej. `js/datos.js` + `js/catalogo.js`) usando id existentes sin renombrar salvo justificación; separación HTML/JS; verificable abriendo `index.html` vía `file://` sin npm/servidor/build, sin librerías/CDNs/fetch/ABM auxiliares.

## Capabilities

### New Capabilities

- `libreria-datos-catalogo`: modelo de datos locales en JS (R-01), renderizado del catálogo desde el array (R-02 parcial), filtro por título con normalización y estados vacío/sin-coincidencias (R-02–R-04), organización en `js/` y verificación manual sin tooling (R-05/R-06), puntos de extensión como id y funciones reutilizables sin implementar altas/ventas/persistencia (R-07).

### Modified Capabilities

- Ninguna. Las specs archivadas `libreria-estructura-html` y `libreria-presentacion-css` se leen como contexto (ids `catalogo-busqueda`/`catalogo-buscar`/`catalogo-limpiar`/`catalogo-lista`/`catalogo-mensaje`, clases `.tarjeta-libro`/`.grilla-catalogo`/`.mensaje`, literal "Sin clasificar") y no cambian sus REQUIREMENTS.

## Impact

- **Afectado (en Fase 2, no en esta fase):** `index.html` (solo agregado de `<script>` al final del `body`; sin renombrar id; los 3 artículos estáticos de ejemplo se reemplazan por render JS manteniendo clases y marcas ficticias); nuevo `js/` (`js/datos.js` + `js/catalogo.js` según `design.md`); sin cambios en `css/`.
- **No afectado:** `css/base.css`, `css/layout.css`, `css/componentes.css`; vistas Libros/Clientes/Ventas/Historial (solo puntos de extensión reutilizables, sin lógica nueva).
- **Exclusiones explícitas (no son parte de este change):** ABM de libros/clientes, ventas, historial, persistencia (localStorage u otra), fetch/API/BD/servidor/backend/login, npm/build/servidor, librerías/frameworks/CDNs CSS-JS, cambios visuales CSS, renombrado de id existentes.
- **Contexto verificado en sitio (hechos):**
  - `index.html` (leído completo, 267 líneas): 5 vistas SPA por anclas (`#vista-catalogo` etc.), `header#sitio-encabezado`/`nav#nav-principal`/`main#contenido-principal`/`section`/`footer`; vista catálogo con `catalogo-busqueda` (type=search) + `catalogo-buscar`/`catalogo-limpiar`, `catalogo-lista.grilla-catalogo` con 3 `article.tarjeta-libro[data-ejemplo=true]` (uno con "Sin clasificar"), `catalogo-mensaje[role=status].mensaje` vacío; sin `<script>` de datos.
  - `css/` contiene `base.css`/`layout.css`/`componentes.css`; `js/` no existe (`dir js` → "No se encuentra el archivo").
  - Specs previas leídas completas: `openspec/specs/libreria-estructura-html/spec.md` (12 requirements) y `openspec/specs/libreria-presentacion-css/spec.md` (7 requirements).
  - `docs/Primer Parcial.pdf` existe (348.050 bytes); requisitos Ej.3 tomados del brief del usuario (pág.3, 15 pts) sin re-interpretar el PDF en esta fase.
  - `openspec/config.yaml`: schema `spec-driven`, sin `context` ni `rules` de proyecto.
- **Criterios de aceptación de esta fase SPEC (solo artefactos):**
  - CA-01: existen `proposal.md`, `specs/libreria-datos-catalogo/spec.md` (delta) y `design.md`; no existe `tasks.md` ni código producto nuevo (`js/` ausente, `index.html` intacto salvo verificación de lectura).
  - CA-02: el delta cubre R-01–R-07 del usuario con requerimientos SHALL verificables manualmente y los 6 casos límite (vacía, solo-espacios, mayúsculas/minúsculas, parcial, sin coincidencias, libro sin género).
  - CA-03: `design.md` fija forma de objetos e id, resolución de relaciones por id, organización `js/`, mapa funciones/eventos y estrategia de mensajes/estados, sin contradecir id/clases literales verificados.
  - CA-04: hechos vs. supuestos vs. propuestas están distinguidos; todo dato no bloqueante usa `{{DATO_PENDIENTE: ...}}`; decisiones esenciales faltantes quedan como preguntas abiertas.
- **Supuestos:** los id `ed1/gen1/aut1/lib1/cli1` son formato de ejemplo, no valores obligatorios; los nombres concretos de funciones (`normalizarBusqueda`, `filtrarPorTitulo`, `renderCatalogo`, `mostrarMensajeCatalogo`) son propuesta de `design.md`, no contrato del PDF; el texto exacto del mensaje "sin coincidencias" se fija en spec como requisito de claridad, no como cadena literal del PDF.
- **Pendientes / Preguntas abiertas:**
  - P-01: ¿El docente exige que los >=6 libros conserven los 3 títulos de ejemplo actuales o pueden reemplazarse por completo? Propuesta actual: conservarlos como base y agregar 3+ nuevos (ver spec). Si el docente pide reemplazo total, ajustar en Fase 2.
  - P-02: ¿El mensaje "sin coincidencias" tiene un texto literal exigido por la cátedra o basta con que sea claro? Propuesta actual: texto claro con la frase buscada, sin literal obligatorio.
  - P-03: ¿La división `js/datos.js` + `js/catalogo.js` es aceptable o se exige un solo archivo / nombres distintos? Propuesta actual: dos archivos por separación modelo/vista; confirmar antes de Fase 2.
