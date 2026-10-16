# Design

## Context

Ver `proposal.md` (Why, Contexto verificado, Alcance) para la motivación y las fuentes.
Estado de partida verificado el 2026-10-16: `index.html` vacío (0 bytes), `css/` y `js/`
vacías, sin specs previas, esquema `spec-driven` sin reglas personalizadas. La spec del
change (`specs/libreria-estructura-html/spec.md`) fija QUÉ debe existir; este documento fija
CÓMO se organiza: una sola decisión de página, mapa de vistas, esqueleto semántico y la
convención de `id` completa que la implementación deberá respetar literalmente.

## Goals / Non-Goals

**Goals:**

- Una sola opción de organización (página única por secciones) decidida y justificada.
- Mapa de las 5 vistas con sus anclas y su correspondencia con la spec.
- Esqueleto semántico de referencia para `index.html`.
- Convención de `id` completa y cerrada: todo `id` que la implementación cree está en la
  tabla de este documento; ningún `id` fuera de ella.

**Non-Goals:**

- Contenido visual (CSS del Ejercicio 2), comportamiento (JS de Ejercicios 3–6) y textos
  finales de los datos de ejemplo (se definen en la implementación, dentro de los mínimos
  de la spec). No se diseña API, persistencia ni arquitectura de scripts.

## Decisiones

### D1 — Página única por secciones con navegación por anclas (decisión principal)

**Decisión**: un solo archivo `index.html` con las 5 vistas como `section` con `id`, y un
`nav` con enlaces de ancla (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`,
`#vista-ventas`, `#vista-historial`). El enlace de la vista visible lleva
`aria-current="page"` (estado inicial: Catálogo; el resto es estático en esta entrega y lo
gestionará el JS futuro).

**Justificación**:

1. La consigna organiza el proyecto "con `index.html` como entrada" y permite expresamente
   "varias páginas o secciones de una misma página, siempre que exista navegación clara".
2. Con página única es imposible por construcción tener "páginas rotas" (CA-01): no hay
   archivos vinculados que puedan faltar o moverse.
3. La verificación `file://` sin servidor funciona idéntica en cualquier máquina y carpeta,
   sin depender de rutas relativas entre páginas.
4. Un solo DOM deja todos los `id` estables en un único ámbito, que es exactamente lo que
   necesitarán el render dinámico (Ej. 3), los formularios (Ej. 4) y la venta (Ej. 5).
5. Evita duplicar `header`/`nav`/`footer` en 5 archivos, que es la principal fuente de
   inconsistencias (un solo `h1`, una sola `nav`) en la opción multi-página.

**Alternativa considerada (multi-página: `index.html` + 4 HTML)**: se descarta porque
multiplica por 5 el riesgo de enlaces rotos y de divergencia entre copias del
`header`/`nav`/`footer`, sin aportar ningún requisito del Ejercicio 1 (no hay URLs
compartibles ni carga diferida que lo justifique en HTML estático).

### D2 — Campos de editorial/género/autores como controles simples en esta entrega

**Decisión**: en el formulario de Libros, título e ISBN son `input type="text"`, precio es
`input type="number"` (`min="0.01"`, `step="0.01"`), y editorial, género y autores son
controles con `label for` + `id` cuyos tipos exactos (texto o `select`) elige la
implementación, con la restricción de que el género incluya la opción «Sin clasificar».
En Ventas, cliente y libro SON `select` con opciones estáticas de ejemplo (2 clientes,
2–3 libros), y cantidad es `input type="number"` (`min="1"`, `step="1"`).

**Justificación**: los catálogos reales de editoriales/géneros/autores los definen los
Ejercicios 3–4 (arrays locales + `select` generados); inventar ahora listas de opciones
fijas crearía datos que el Ej. 4 tendría que contradecir. En Ventas los `select` son
inevitables porque la spec exige "selección de cliente" y "selector de libro", y sus
opciones de ejemplo coinciden con los datos de ejemplo ya exigidos.

**Alternativa considerada** (`select` estáticos para todo): descartada por lo anterior;
fijar opciones ahora anticipa decisiones del Ej. 4.

### D3 — Mensajes como contenedores `role="status"` siempre presentes

**Decisión**: cada mensaje/estado existe en el HTML inicial como contenedor con su `id`
y `role="status"` (que implica `aria-live="polite"`), aunque su texto sea un ejemplo
estático o esté vacío a la espera del JS futuro. Ningún mensaje se crea dinámicamente
en esta entrega.

### D4 — Datos de ejemplo mínimos y marcados como ficticios

**Decisión**: 2–3 libros (≥1 «Sin clasificar»), 2 clientes, 1–2 ventas, cada conjunto
precedido o anotado como ejemplo ficticio (nota visible o atributo `data-ejemplo="true"`).
Los valores concretos (títulos, ISBN, precios) los elige la implementación; este diseño
solo fija cantidades y el marcado.

## Mapa de vistas

| # | Vista | Ancla (`section id`) | Enlace en `nav` | Artefactos principales (spec) |
| --- | --- | --- | --- | --- |
| 1 | Catálogo | `#vista-catalogo` | "Catálogo" (`aria-current="page"` inicial) | `catalogo-busqueda`, `catalogo-buscar`, `catalogo-limpiar`, `catalogo-lista`, `catalogo-mensaje` |
| 2 | Libros | `#vista-libros` | "Libros" | `libros-form` (+ 6 campos), `libros-tabla`, `libros-mensaje` |
| 3 | Clientes | `#vista-clientes` | "Clientes" | `clientes-form` (+ 2 campos), `clientes-tabla`, `clientes-mensaje` |
| 4 | Ventas | `#vista-ventas` | "Ventas" | `venta-cliente`, `venta-libro`, `venta-cantidad`, `venta-agregar`, `ventas-renglones`, `ventas-total`, `ventas-confirmar`, `ventas-cancelar`, `ventas-mensaje` |
| 5 | Historial | `#vista-historial` | "Historial" | `historial-tabla`, `historial-detalle`, `historial-mensaje`, `historial-detalle-mensaje` |

Orden en el documento: el de la tabla (Catálogo primero: es la vista inicial y la que
lleva el `aria-current` estático).

## Esqueleto semántico de referencia

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{DATO_PENDIENTE: nombre de la librería}} — Catálogo y gestión</title>
</head>
<body>
  <header id="sitio-encabezado">
    <h1 id="sitio-titulo">{{DATO_PENDIENTE: nombre de la librería}}</h1>
    <nav id="nav-principal" aria-label="Navegación principal">
      <ul>
        <li><a href="#vista-catalogo" aria-current="page">Catálogo</a></li>
        <li><a href="#vista-libros">Libros</a></li>
        <li><a href="#vista-clientes">Clientes</a></li>
        <li><a href="#vista-ventas">Ventas</a></li>
        <li><a href="#vista-historial">Historial</a></li>
      </ul>
    </nav>
  </header>
  <main id="contenido-principal">
    <section id="vista-catalogo" aria-labelledby="catalogo-titulo">
      <h2 id="catalogo-titulo">Catálogo</h2>
      <!-- buscador (h3 + form simple), lista (h3 + article/div por libro), mensaje -->
    </section>
    <section id="vista-libros" aria-labelledby="libros-titulo">
      <h2 id="libros-titulo">Libros</h2>
      <!-- h3 Alta de libro + form#libros-form; h3 Listado + table#libros-tabla + mensaje -->
    </section>
    <section id="vista-clientes" aria-labelledby="clientes-titulo">
      <h2 id="clientes-titulo">Clientes</h2>
      <!-- h3 Alta de cliente + form#clientes-form; h3 Listado + table#clientes-tabla + mensaje -->
    </section>
    <section id="vista-ventas" aria-labelledby="ventas-titulo">
      <h2 id="ventas-titulo">Ventas</h2>
      <!-- h3 Cliente + select; h3 Renglones + controles + table#ventas-renglones;
           h3 Resumen + div#ventas-total + botones + mensaje -->
    </section>
    <section id="vista-historial" aria-labelledby="historial-titulo">
      <h2 id="historial-titulo">Historial</h2>
      <!-- table#historial-tabla + mensaje; h3 Detalle + div#historial-detalle + mensaje -->
    </section>
  </main>
  <footer id="sitio-pie">
    <p>Trabajo práctico — datos de ejemplo ficticios.</p>
  </footer>
</body>
</html>
```

Notas: `aria-labelledby` apunta al `h2` de cada vista; cada sub-bloque (buscador, alta,
listado, renglones, resumen, detalle) lleva su `h3`. Los libros del catálogo se marcan
como `article` dentro de la lista. Sin `tabindex` positivo en todo el documento.

## Convención de `id` (cerrada)

Reglas: minúsculas, palabras con guion, prefijo de la vista (`catalogo-`, `libro-`/`libros-`,
`cliente-`/`clientes-`, `venta-`/`ventas-`, `historial-`). Los `id` de campos usan singular
(`libro-titulo`); los de formularios, tablas, listas y mensajes usan el prefijo de vista
en plural. Todo mensaje/estado termina conceptualmente en `-mensaje` y lleva
`role="status"`. Prohibido crear `id` fuera de esta tabla sin actualizar la spec.

| `id` | Elemento | Vista / rol |
| --- | --- | --- |
| `sitio-encabezado` | `header` | Sitio |
| `sitio-titulo` | `h1` (nombre ficticio hasta confirmación) | Sitio |
| `nav-principal` | `nav` (`ul li a`, `aria-label="Navegación principal"`) | Sitio |
| `contenido-principal` | `main` | Sitio |
| `sitio-pie` | `footer` | Sitio |
| `vista-catalogo` | `section` + `h2#catalogo-titulo` | Catálogo |
| `catalogo-busqueda` | `input type="search"` (+ `label for`) | Catálogo |
| `catalogo-buscar` | `button` "Buscar en catálogo" | Catálogo |
| `catalogo-limpiar` | `button` "Limpiar búsqueda" | Catálogo |
| `catalogo-lista` | contenedor del listado (`div`, `article` por libro) | Catálogo |
| `catalogo-mensaje` | contenedor `role="status"` (sin resultados) | Catálogo |
| `vista-libros` | `section` + `h2#libros-titulo` | Libros |
| `libros-form` | `form` de alta | Libros |
| `libro-titulo` | `input text` (+ `label`) | Libros |
| `libro-isbn` | `input text` (+ `label`) | Libros |
| `libro-precio` | `input number` `min="0.01"` `step="0.01"` (+ `label`) | Libros |
| `libro-editorial` | control con `label` (tipo a elección de la implementación) | Libros |
| `libro-genero` | control con `label`, incluye opción «Sin clasificar» | Libros |
| `libro-autores` | control con `label` | Libros |
| `libros-tabla` | `table` (caption + thead + `th scope`) | Libros |
| `libros-mensaje` | contenedor `role="status"` (lista vacía) | Libros |
| `vista-clientes` | `section` + `h2#clientes-titulo` | Clientes |
| `clientes-form` | `form` de alta | Clientes |
| `cliente-nombre` | `input text` "Nombre completo" (+ `label`) | Clientes |
| `cliente-email` | `input email` (+ `label`) | Clientes |
| `clientes-tabla` | `table` (caption + thead + `th scope`) | Clientes |
| `clientes-mensaje` | contenedor `role="status"` (lista vacía) | Clientes |
| `vista-ventas` | `section` + `h2#ventas-titulo` | Ventas |
| `venta-cliente` | `select` de cliente (+ `label`, 2 opciones de ejemplo) | Ventas |
| `venta-libro` | `select` de libro (+ `label`, 2–3 opciones de ejemplo) | Ventas |
| `venta-cantidad` | `input number` `min="1"` `step="1"` (+ `label` "Cantidad") | Ventas |
| `venta-agregar` | `button` "Agregar renglón" | Ventas |
| `ventas-renglones` | `table` (columnas: libro, cantidad, precio unitario, subtotal, acciones) | Ventas |
| `ventas-total` | contenedor del total del resumen | Ventas |
| `ventas-confirmar` | `button` "Confirmar venta" | Ventas |
| `ventas-cancelar` | `button` "Cancelar venta" | Ventas |
| `ventas-mensaje` | contenedor `role="status"` (correcta o rechazada) | Ventas |
| `vista-historial` | `section` + `h2#historial-titulo` | Historial |
| `historial-tabla` | `table` (identificador, fecha, cliente, total, detalle) | Historial |
| `historial-detalle` | zona de detalle de la venta seleccionada/ejemplo | Historial |
| `historial-mensaje` | contenedor `role="status"` (lista vacía) | Historial |
| `historial-detalle-mensaje` | contenedor `role="status"` (estado del detalle) | Historial |

Tipos de botón: "Registrar …" y "Confirmar venta" son `type="submit"` de su formulario;
"Limpiar …" y "Cancelar venta" son `type="reset"`; "Buscar en catálogo", "Agregar renglón"
y los botones de detalle/acciones son `type="button"`.

## Risks / Trade-offs

- [Riesgo] El `aria-current="page"` estático miente en cuanto se navega por anclas
  (sin JS no puede moverse). → Mitigación: se documenta como estado inicial; el Ej. 3/4
  lo hará dinámico. No bloquea CA-04 (validador + foco siguen válidos).
- [Riesgo] Una sola página crece con los datos de ejemplo y puede volverse larga.
  → Mitigación: con 2–3 libros, 2 clientes y 1–2 ventas el tamaño es trivial; la
  paginación o el render dinámico llegan en el Ej. 3.
- [Trade-off] Campos editorial/género/autores sin `select` fijo (D2): la maqueta muestra
  menos "realismo" que unos desplegables, a cambio de no inventar catálogos que el Ej. 4
  contradiría.
- [Riesgo] Anclas con `file://`: funcionan en navegadores modernos, pero si alguno no
  desplazara, la navegación por `Tab` + encabezados sigue operativa. → Registrarlo en la
  verificación manual, no en código.

## Migration Plan

No aplica: no hay código previo que migrar (`index.html` vacío). La implementación
escribirá `index.html` desde cero siguiendo el esqueleto y la tabla de `id`. Rollback:
borrar el contenido agregado (el change no toca `css/`, `js/` ni ningún otro archivo).

## Open Questions

Ninguna bloqueante. Quedan como confirmaciones para la revisión del usuario
(ver `proposal.md`, Decisiones que requieren respuesta):

1. Ratificar página única vs multi-página (cambiarlo ahora invalida D1 y el mapa).
2. Nombre de la librería (`{{DATO_PENDIENTE}}` usado en `sitio-titulo` y `title`).
3. Confirmar mínimos de ejemplo (2–3 / 2 / 1–2) o ampliarlos dentro del Ejercicio 1.
