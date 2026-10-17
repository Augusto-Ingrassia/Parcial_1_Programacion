# Design — ejercicio-3-datos-catalogo

## Context

Estado verificado (ver `proposal.md` — contexto verificado): `index.html` con vista `#vista-catalogo` (buscador `catalogo-busqueda` + `catalogo-buscar`/`catalogo-limpiar`, `catalogo-lista.grilla-catalogo` con 3 `article.tarjeta-libro` estáticos, `catalogo-mensaje[role=status]` vacío), `css/` con 3 hojas, sin `js/` ni `<script>` de datos. Specs archivadas `libreria-estructura-html` / `libreria-presentacion-css` fijan id, clases y el literal "Sin clasificar". Restricciones: JS nativo únicamente, `file://` sin tooling, `textContent` para texto variable, sin fetch/ABM/persistencia. Ver requisitos en `specs/libreria-datos-catalogo/spec.md` (R-01–R-07).

## Goals / Non-Goals

**Goals:**

- Fijar la forma de los objetos del modelo y el formato de id para que Fase 2 los implemente sin ambigüedad.
- Definir resolución de relaciones por id, organización `js/`, mapa funciones/eventos y estrategia de mensajes/estados.
- Dejar puntos de extensión reutilizables por Ej.4–6 sin implementarlos.

**Non-Goals:**

- No se definen estilos nuevos ni cambios de clases CSS (prohibido `style` inline como mecanismo).
- No se diseña ABM, ventas, historial, persistencia, validaciones de formularios ni migraciones de datos (no hay backend que migrar).
- No se fija el texto literal final del mensaje "sin coincidencias" más allá del requisito de claridad del spec (queda como decisión menor de Fase 2).

## Decisions

### D-01: Dos archivos `js/datos.js` + `js/catalogo.js` con `<script>` al final del `body`

- **Qué:** `js/datos.js` solo declara los 5 arrays (modelo, sin DOM); `js/catalogo.js` resuelve relaciones, renderiza y filtra (vista/controlador del catálogo). `index.html` los carga con dos `<script src="js/...">` al final del `body`, en ese orden, sin `defer`/`type=module` (máxima compatibilidad `file://`).
- **Por qué:** separación modelo/vista exigida por R-06; dos archivos pequeños son más legibles para corrección manual que uno monolítico, y evitan tooling de módulos.
- **Alternativas consideradas:** un solo `js/app.js` (descartado: mezcla modelo y vista, más difícil de reutilizar en Ej.4–6); ES modules con `import` (descartado: `file://` + CORS puede bloquear módulos en algunos navegadores; `<script>` clásico siempre funciona).

### D-02: Forma de objetos e id (formato ejemplo `ed1/gen1/aut1/lib1/cli1`)

- **Qué:** cada entidad es un objeto plano con `id: string` estable y único dentro de su colección:
  - editorial: `{ id, nombre }` — ej. `{ id: "ed1", nombre: "Sur Ejemplar" }` (formato, no valor obligatorio).
  - género: `{ id, nombre }` — ej. `{ id: "gen1", nombre: "Novela" }`.
  - autor: `{ id, nombre }` — ej. `{ id: "aut1", nombre: "A. Ejemplo" }`.
  - libro: `{ id, titulo, isbn, editorialId, generoId (o ausente/nulo si no tiene), autorIds: string[], precio }` — precio como número (p. ej. `12500`); el render lo formatea como `$12500` para coincidir con el HTML actual.
  - cliente: `{ id, nombre, email }` — ej. `{ id: "cli1", nombre: "...", email: "..." }`; ficticios.
- **Por qué:** referencias por id (no nombres duplicados) permiten resolver nombres en un solo lugar y reutilizar el modelo en Ej.4–6; precio numérico deja el formato a la vista.
- **Alternativas consideradas:** anidar objetos completos dentro de libro (descartado: duplica datos y rompe integridad referencial); precio como string formateado (descartado: impide cálculos futuros de ventas).

### D-03: Resolución de relaciones por id con mapas en memoria

- **Qué:** al iniciar, `catalogo.js` construye `Map` (o búsqueda lineal documentada) `editorialPorId`, `generoPorId`, `autorPorId`; cada libro resuelve `editorialId → nombre`, `generoId → nombre` (ausente/nulo → literal exacto `"Sin clasificar"`), `autorIds → nombres unidos por ", "`. Si un id no existe, el libro se omite del render y se informa por consola (nunca se muestra un id crudo al usuario).
- **Por qué:** cumple R-02/R-01 sin acoplar el modelo a la vista; el literal "Sin clasificar" queda en un único punto de la vista.
- **Alternativas consideradas:** resolver con `find` inline en cada render (descartado como patrón principal por costo repetido, aunque aceptable para 6–10 libros; los `Map` son triviales y más claros).

### D-04: Mapa funciones/eventos (nombres propuestos, no exigidos por el PDF)

- **Qué:** cuatro funciones separadas, cada una con una sola responsabilidad:
  - `normalizarBusqueda(texto): string` — `String(texto ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")` (JS nativo, sin librerías). Decisión tomada (actualización aprobada): se pliegan tildes/diacríticos, de modo que "jardin" = "jardín" = "JARDIN". `filtrarPorTitulo` normaliza ambos lados (consulta y título) antes del `includes`.
  - `filtrarPorTitulo(libros, consulta): libro[]` — pura, sin DOM: vacía/solo-espacios → copia completa; si no, `includes` sobre título normalizado.
  - `renderCatalogo(libros): void` — vacía `catalogo-lista` y crea por libro un `article.tarjeta-libro` con `h4` + 5 `p` (título, ISBN, editorial, género, autores, precio), todo con `textContent` + `createElement`; marca cada tarjeta `data-ejemplo="true"`.
  - `mostrarMensajeCatalogo(texto): void` — escribe en `catalogo-mensaje` vía `textContent` (`""` para limpiar); el estado "sin coincidencias" = `renderCatalogo([])` + mensaje claro que incluye la consulta original.
  - Eventos: `click` en `catalogo-buscar` → leer + `filtrarPorTitulo` + `renderCatalogo` + mensaje según resultado; `click` en `catalogo-limpiar` → vaciar input + mostrar todo + limpiar mensaje; `Enter` en `catalogo-busqueda` replica buscar (mejora accesible, sin cambiar spec). Render inicial con catálogo completo al cargar.
- **Por qué:** funciones separadas y una pura (`filtrarPorTitulo`) hacen el filtro testeable a ojo y reutilizable en Ej.4–6.
- **Alternativas consideradas:** un único handler monolítico (descartado: viola R-02/R-04 de funciones separadas y acotadas); filtrar sobre el DOM ya renderizado en vez del modelo (descartado: el modelo debe ser fuente de verdad).

### D-05: Estrategia de mensajes/estados

- **Qué:** tres estados, un solo contenedor `catalogo-mensaje[role=status]` + clases `.mensaje` existentes (sin inventar estilos):
  - catálogo completo (incluye vacía/solo-espacios): lista llena, mensaje `""`.
  - con resultados parciales: lista filtrada, mensaje `""` (o conteo opcional como mejora, no exigido).
  - sin coincidencias: lista vacía + mensaje claro con la consulta (p. ej. `Sin coincidencias para "<consulta>".`) — el literal exacto se cierra en Fase 2 dentro del requisito de claridad del spec.
- **Por qué:** respeta R-03 y la convención CSS de estados por texto (no solo color) de la spec `libreria-presentacion-css`.

### D-06: Conservación de HTML/CSS y reemplazo del estático por render

- **Qué:** en Fase 2 se eliminan los 3 `article` estáticos de `catalogo-lista` (se generan por JS con idénticas clases/estructura `h4`+`p`s) y se agregan solo los dos `<script>`; ningún id/clase se renombra; `data-ejemplo="true"` y la nota "datos ficticios" se conservan en las tarjetas generadas.
- **Por qué:** minimiza el diff y evita romper las specs archivadas de HTML/CSS.

## Risks / Trade-offs

- [Riesgo] Divergencia entre los 3 libros estáticos actuales y los >=6 del modelo → Mitigación: Fase 2 conserva los 3 títulos/ISBN/premios actuales como base y agrega 3+ nuevos; si P-01 (proposal) responde "reemplazo total", se ajusta sin cambiar spec (los mínimos ya lo permiten).
- [Riesgo] Tildes en búsqueda ("jardin" vs "jardín") → Mitigación: spec exige trim+minúsculas+plegado de tildes+includes (decisión tomada); `normalizarBusqueda` aplica NFD + remoción de diacríticos en ambos lados.
- [Riesgo] `file://` y orden de `<script>` → Mitigación: scripts clásicos al final del `body` en orden `datos.js` → `catalogo.js`; sin módulos ni fetch, verificado por apertura directa.
- [Trade-off] `Map` vs `find` lineal: se propone `Map` por claridad; con 6–10 libros el rendimiento es irrelevante, la legibilidad manda.

## Migration Plan

No hay migración (frontend estático sin backend ni datos persistidos). Despliegue Fase 2: agregar `js/datos.js` + `js/catalogo.js`, quitar los 3 `article` estáticos, agregar los dos `<script>`; rollback: revertir `index.html` y borrar `js/`. Verificación: abrir `index.html` (`file://`), probar los 6 casos límite del spec y confirmar ausencia de `innerHTML`/`fetch`/CDNs por inspección de fuentes.

## Open Questions

- O-01 (deferrable): texto literal exacto del mensaje sin coincidencias — el spec solo exige claridad con la consulta incluida; se cierra en Fase 2 sin cambiar spec.
- O-02 (resuelta): plegado de tildes en `normalizarBusqueda` — decisión tomada aprobada por el usuario: se pliegan tildes ("jardin" = "jardín") con `normalize("NFD")` + remoción de diacríticos; el spec (R-04) fija trim+minúsculas+plegado+includes.
- Las preguntas P-01–P-03 de `proposal.md` (alcance de libros base, literal de mensaje, división de archivos) se responden antes de Fase 2 pero tampoco cambian este diseño salvo el ajuste documentado en D-06.
