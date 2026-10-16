# libreria-estructura-html Specification

## Purpose

Define la estructura HTML estática de la librería con sus 5 vistas navegables, formularios
etiquetados, tablas con encabezados y mensajes de estado, verificable manualmente en el
navegador sin herramientas de compilación ni servidor.

## Requirements

### Requirement: Navegación a las 5 vistas sin páginas rotas

El sistema SHALL ofrecer navegación clara entre las 5 vistas (Catálogo, Libros, Clientes,
Ventas, Historial) desde `index.html` como punto de entrada, sin enlaces rotos.

#### Scenario: Navegar a cada vista desde la entrada

- **WHEN** se abre `index.html` en el navegador y se activa cada enlace de navegación
- **THEN** se accede a las vistas Catálogo, Libros, Clientes, Ventas e Historial sin errores
  de página no encontrada.

#### Scenario: La navegación indica la vista activa

- **WHEN** se observa la navegación en cualquier vista
- **THEN** el enlace de la vista visible se distingue con `aria-current="page"` o un estado
  activo documentado en `design.md`.

### Requirement: Vista Catálogo con buscador y listado de ejemplo

El sistema SHALL mostrar la vista Catálogo con el título de la librería, un buscador por
título (`input type="search"` con `label` asociado y botones "Buscar en catálogo" /
"Limpiar búsqueda") y un listado de libros de ejemplo, cada uno con título, ISBN, editorial,
género, autores y precio; el libro sin género SHALL mostrar el texto literal «Sin clasificar».

#### Scenario: Catálogo con datos de ejemplo

- **WHEN** se abre la vista Catálogo
- **THEN** se ven el título de la librería, el buscador con su etiqueta y botones, y 2–3
  libros de ejemplo con los seis datos (título, ISBN, editorial, género, autores, precio).

#### Scenario: Libro sin género muestra «Sin clasificar»

- **WHEN** se lee el libro de ejemplo sin género asignado
- **THEN** su género muestra exactamente el texto «Sin clasificar».

#### Scenario: Zona de mensaje de búsqueda sin resultados

- **WHEN** se inspecciona la vista Catálogo
- **THEN** existe un contenedor con `id="catalogo-mensaje"` y `role="status"` destinado al
  mensaje de "búsqueda sin resultados" (usado por el JS futuro; en esta entrega es un
  contenedor preparado, con o sin texto de ejemplo).

### Requirement: Vista Libros con formulario de alta y listado en tabla

El sistema SHALL mostrar la vista Libros con un formulario de alta (campos título, ISBN,
precio, editorial, género y autores, cada uno con `label for` + `id` y tipo HTML correcto;
botones "Registrar libro" y "Limpiar formulario") y un listado de libros en `table` con
`caption` o encabezado asociado, `thead` y `th` con `scope`, más un contenedor de mensaje
de lista vacía con `id` y `role="status"`.

#### Scenario: Formulario de alta de libros etiquetado

- **WHEN** se recorre el formulario con `id="libros-form"`
- **THEN** cada campo tiene `label for` asociado a su `id`, el precio usa tipo numérico y los
  botones se llaman "Registrar libro" y "Limpiar formulario" (ningún botón dice
  "Aceptar" ni "Enviar" a secas).

#### Scenario: Listado de libros en tabla accesible

- **WHEN** se inspecciona el listado (`id="libros-tabla"`)
- **THEN** es una `table` con `caption` o encabezado asociado, `thead` y `th` con `scope`,
  y existe el contenedor `id="libros-mensaje"` con `role="status"` para lista vacía.

### Requirement: Vista Clientes con formulario de alta y listado en tabla

El sistema SHALL mostrar la vista Clientes con un formulario de alta (nombre completo y
email, cada uno con `label for` + `id`; email con `type="email"`; botones "Registrar cliente"
y "Limpiar formulario") y un listado de clientes en `table` con `caption` o encabezado
asociado, `thead` y `th` con `scope`, más un contenedor de mensaje de lista vacía con `id`
y `role="status"`.

#### Scenario: Formulario de alta de clientes etiquetado

- **WHEN** se recorre el formulario con `id="clientes-form"`
- **THEN** nombre completo y email tienen `label for` + `id`, el email es `type="email"` y los
  botones se llaman "Registrar cliente" y "Limpiar formulario".

#### Scenario: Listado de clientes en tabla accesible

- **WHEN** se inspecciona el listado (`id="clientes-tabla"`)
- **THEN** es una `table` con `caption` o encabezado asociado, `thead` y `th` con `scope`,
  muestra 2 clientes de ejemplo (marcados como ficticios) y existe el contenedor
  `id="clientes-mensaje"` con `role="status"` para lista vacía.

### Requirement: Vista Ventas con cliente, renglones y resumen

El sistema SHALL mostrar la vista Ventas con selección de cliente (`select` con `label`),
composición de renglones (selector de libro + cantidad + botón "Agregar renglón", y tabla
de renglones con columnas libro, cantidad, precio unitario, subtotal y acciones) y resumen
(total + botones "Confirmar venta" / "Cancelar venta" + zona de mensajes de operación
correcta o rechazada con `id` y `role="status"`).

#### Scenario: Composición de la venta presente

- **WHEN** se abre la vista Ventas
- **THEN** existen el `select` de cliente con `label` (`id="venta-cliente"`), el selector de
  libro (`id="venta-libro"`), la cantidad (`id="venta-cantidad"`), el botón "Agregar renglón"
  y la tabla de renglones (`id="ventas-renglones"`) con las cinco columnas.

#### Scenario: Resumen y mensajes de resultado

- **WHEN** se inspecciona el resumen de la venta
- **THEN** existen el contenedor del total (`id="ventas-total"`), los botones
  "Confirmar venta" y "Cancelar venta", y el contenedor `id="ventas-mensaje"` con
  `role="status"` para operación correcta o rechazada.

### Requirement: Vista Historial con listado, detalle y mensajes

El sistema SHALL mostrar la vista Historial con el listado de ventas en `table` (encabezados:
identificador, fecha, cliente, total, detalle), 1–2 ventas de ejemplo (marcadas como
ficticias), una zona de detalle de venta y contenedores con `id` y `role="status"` para los
mensajes de lista vacía y de detalle.

#### Scenario: Historial con ventas de ejemplo y detalle

- **WHEN** se abre la vista Historial
- **THEN** la tabla (`id="historial-tabla"`) tiene los cinco encabezados y 1–2 ventas de
  ejemplo, y existe la zona de detalle (`id="historial-detalle"`).

#### Scenario: Mensajes de lista vacía y de detalle

- **WHEN** se inspeccionan los estados del Historial
- **THEN** existen los contenedores `id="historial-mensaje"` (lista vacía) y
  `id="historial-detalle-mensaje"` (estado del detalle), ambos con `role="status"`.

### Requirement: Estructura semántica y jerarquía de encabezados

El sistema SHALL usar `header`, `nav`, `main`, `section`/`article` y `footer`; la navegación
SHALL ser `ul li a`; la página SHALL tener un solo `h1` (título de la librería) y cada vista
SHALL tener su `h2` (con `h3` donde la vista tenga subsecciones).

#### Scenario: Esqueleto semántico verificable

- **WHEN** se inspecciona el documento con las herramientas del navegador o un validador HTML
- **THEN** existen `header`, `nav` (con lista de enlaces), `main`, una `section` por vista,
  `footer`, exactamente un `h1` y un `h2` por cada una de las 5 vistas.

### Requirement: Controles etiquetados y botones descriptivos

Cada `input`, `select` y `textarea` del documento SHALL tener un `label` con atributo `for`
asociado a su `id`, y cada `button` SHALL tener un texto que describa su acción específica
(prohibido "Aceptar" o "Enviar" genéricos).

#### Scenario: Etiquetas y botones sin genéricos

- **WHEN** se revisan todos los controles y botones del documento
- **THEN** ningún control carece de `label for` + `id` y ningún botón usa un texto genérico;
  el validador HTML no reporta errores en labels ni botones.

### Requirement: Tablas con encabezados asociados

Cada `table` del documento SHALL tener `caption` o encabezado asociado, `thead` y celdas
`th` con atributo `scope`.

#### Scenario: Tablas válidas en el validador

- **WHEN** se validan las tablas (libros, clientes, renglones de venta, historial)
- **THEN** cada una tiene `caption` o encabezado asociado, `thead` y `th scope`, sin errores
  del validador.

### Requirement: Accesibilidad HTML básica

El documento SHALL cumplir accesibilidad básica: imágenes informativas con `alt` descriptivo
y decorativas con `alt=""`; foco por teclado sin trampas y sin `tabindex` positivo; mensajes
de estado como contenedores con `id` y `role="status"`.

#### Scenario: Recorrido por teclado y atributos

- **WHEN** se recorre la página solo con el teclado (Tab / Shift+Tab) y se inspeccionan
  imágenes y mensajes
- **THEN** el foco avanza sin quedar atrapado, no hay `tabindex` positivo, cada imagen
  cumple su regla de `alt` y cada mensaje/estado tiene `id` con `role="status"`.

#### Scenario: Caso límite de imágenes ausentes

- **WHEN** la entrega no incluye ninguna imagen
- **THEN** el requisito de `alt` se considera cumplido por vacuidad y se registra como tal
  en la verificación (no se agregan imágenes solo para cumplirlo).

### Requirement: Datos de ejemplo ficticios y casos límite visibles

Los listados y el historial SHALL mostrar datos estáticos de ejemplo —2–3 libros (≥1 con
«Sin clasificar»), 2 clientes y 1–2 ventas— identificados como ejemplos ficticios, y el
documento SHALL incluir los contenedores de lista vacía, búsqueda sin resultados, operación
correcta y operación rechazada (aunque en esta entrega sean contenedores preparados sin
lógica que los active).

#### Scenario: Mínimos de ejemplo y marcado ficticio

- **WHEN** se cuentan los datos estáticos y se leen sus marcas
- **THEN** hay 2–3 libros (≥1 «Sin clasificar»), 2 clientes y 1–2 ventas, y cada conjunto
  se identifica como ejemplo ficticio (nota o `data-*`, según `design.md`).

### Requirement: Verificable sin herramientas y solo con tecnologías permitidas

El resultado SHALL verificarse abriendo `index.html` en el navegador, sin `npm`, sin
servidor y sin build; el documento SHALL usar únicamente HTML (los `id` / `data-*` /
contenedores preparan el CSS y JS futuro pero no implementan comportamiento ni estilos
completos, y no SHALL incluir librerías, frameworks ni CDNs).

#### Scenario: Apertura directa del archivo

- **WHEN** se abre `index.html` con doble clic (protocolo `file://`) sin instalar nada
- **THEN** las 5 vistas, los formularios, las tablas y los mensajes se muestran y la
  navegación funciona.

#### Scenario: Ausencia de trabajo excluido

- **WHEN** se inspeccionan las fuentes del documento entregado
- **THEN** no hay `<link>` a CSS externos salvo el propio proyecto (vacío en esta entrega),
  no hay `<script>` con lógica funcional, ni referencias a CDNs, API o backend.
