# Tasks — Ejercicio 1: Estructura HTML («la libre»)

> Alcance: SOLO HTML estático en `index.html`. `css/` y `js/` quedan intactos y vacíos
> (Ej. 2–6 excluidos). Decisiones ratificadas: D1 página única por secciones con anclas,
> nombre de la librería «la libre», mínimos de ejemplo 2–3 libros (≥1 «Sin clasificar») /
> 2 clientes / 1–2 ventas marcados como ficticios. Convención de `id` cerrada: solo los
> `id` de la tabla de `design.md`; prohibido crear otros sin actualizar la spec.

## 1. Esqueleto base del documento

- [x] 1.1 Crear esqueleto base en `index.html` (doctype, `html lang="es"`, `head` con `meta charset`, `meta viewport` y `title` «la libre — Catálogo y gestión», `header#sitio-encabezado` con `h1#sitio-titulo` «la libre», `nav#nav-principal` con `ul-li-a` a las 5 anclas `#vista-catalogo #vista-libros #vista-clientes #vista-ventas #vista-historial` con `aria-current="page"` inicial en Catálogo, `main#contenido-principal` con las 5 `section` vacías con sus `h2` (`catalogo-titulo`, `libros-titulo`, `clientes-titulo`, `ventas-titulo`, `historial-titulo`), `footer#sitio-pie` con nota de datos ficticios); cubre SHALL Navegación (anclas), SHALL Semántica (esqueleto + h1 único + h2×5) y R-01/R-05/CA-01 parcial; depende de nada (primera tarea); verificación: abrir `index.html` con `file://`, las 5 anclas desplazan a su sección y el inspector muestra exactamente un `h1`.

## 2. Vista Catálogo

- [x] 2.1 Implementar `section#vista-catalogo` en `index.html` (`h3` buscador + `label for="catalogo-busqueda"` + `input#catalogo-busqueda type="search"` + `button#catalogo-buscar type="button"` «Buscar en catálogo» + `button#catalogo-limpiar type="button"` «Limpiar búsqueda»; `h3` listado + `div#catalogo-lista` con 2–3 `article` de ejemplo —cada uno con título, ISBN, editorial, género, autores y precio, ≥1 con género «Sin clasificar» literal— marcados con nota visible o `data-ejemplo="true"` como ficticios; `div#catalogo-mensaje role="status"`); cubre SHALL Catálogo + SHALL Datos de ejemplo (libros) y R-01/R-03/CA-02/CA-03 parcial; depende de 1.1; verificación: abrir `file://#vista-catalogo`, se ven buscador etiquetado, 2–3 artículos con los 6 datos y el contenedor `catalogo-mensaje` en el inspector.

## 3. Vista Libros

- [x] 3.1 Implementar `section#vista-libros` en `index.html` (`h3` Alta + `form#libros-form` con 6 campos cada uno con `label for`+`id` —`libro-titulo` e `libro-isbn` `type="text"`, `libro-precio` `type="number" min="0.01" step="0.01"`, `libro-editorial`/`libro-genero`/`libro-autores` con `label` y tipo a elección incluyendo opción «Sin clasificar» en género— más `button type="submit"` «Registrar libro» y `button type="reset"` «Limpiar formulario»; `h3` Listado + `table#libros-tabla` con `caption`, `thead` y `th scope` con filas de ejemplo ficticias + `div#libros-mensaje role="status"`); cubre SHALL Libros + SHALL Tablas (libros) y R-01/R-02/R-04/CA-02/CA-03 parcial; depende de 1.1; verificación: abrir `file://#vista-libros`, cada control muestra su etiqueta asociada al hacer clic en ella y el validador no reporta errores de labels/botones/tabla.

## 4. Vista Clientes

- [x] 4.1 Implementar `section#vista-clientes` en `index.html` (`h3` Alta + `form#clientes-form` con `label for="cliente-nombre"` + `input#cliente-nombre type="text"` «Nombre completo» y `label for="cliente-email"` + `input#cliente-email type="email"`, más `button type="submit"` «Registrar cliente» y `button type="reset"` «Limpiar formulario»; `h3` Listado + `table#clientes-tabla` con `caption`, `thead` y `th scope` con 2 clientes de ejemplo ficticios + `div#clientes-mensaje role="status"`); cubre SHALL Clientes + SHALL Tablas (clientes) + SHALL Datos de ejemplo (clientes) y R-01/R-02/R-04/CA-02/CA-03 parcial; depende de 1.1; verificación: abrir `file://#vista-clientes`, el campo email es `type="email"` en el inspector y la tabla muestra 2 clientes ficticios.

## 5. Vista Ventas

- [x] 5.1 Implementar `section#vista-ventas` en `index.html` (`h3` Cliente + `label` + `select#venta-cliente` con 2 opciones de ejemplo; `h3` Renglones + `label` + `select#venta-libro` con 2–3 opciones de ejemplo + `label` «Cantidad» + `input#venta-cantidad type="number" min="1" step="1"` + `button#venta-agregar type="button"` «Agregar renglón» + `table#ventas-renglones` con `caption`, `thead` y `th scope` con las 5 columnas libro/cantidad/precio unitario/subtotal/acciones; `h3` Resumen + `div#ventas-total` + `button#ventas-confirmar type="submit"` «Confirmar venta» + `button#ventas-cancelar type="reset"` «Cancelar venta» + `div#ventas-mensaje role="status"`); cubre SHALL Ventas + SHALL Tablas (renglones) y R-01/R-02/CA-02/CA-03 parcial; depende de 1.1 (y coherencia de opciones con los ejemplos de 2.1/4.1); verificación: abrir `file://#vista-ventas`, existen los 9 `id` de la vista en el inspector y la tabla de renglones tiene las 5 columnas.

## 6. Vista Historial

- [x] 6.1 Implementar `section#vista-historial` en `index.html` (`table#historial-tabla` con `caption`, `thead` y `th scope` con los 5 encabezados identificador/fecha/cliente/total/detalle y 1–2 ventas de ejemplo ficticias + `div#historial-mensaje role="status"`; `h3` Detalle + `div#historial-detalle` con contenido de ejemplo + `div#historial-detalle-mensaje role="status"`); cubre SHALL Historial + SHALL Tablas (historial) + SHALL Datos de ejemplo (ventas) y R-01/R-02/CA-02/CA-03 parcial; depende de 1.1 (y coherencia con ejemplos de 5.1); verificación: abrir `file://#vista-historial`, la tabla tiene los 5 encabezados y 1–2 ventas ficticias y existen ambos contenedores de mensaje en el inspector.

## 7. Transversales (semántica, etiquetas, tablas, accesibilidad)

- [x] 7.1 Revisar y corregir transversales en `index.html` (un solo `h1`, `h2`×5 + `h3` por sub-bloque con `aria-labelledby` al `h2` de cada vista, todo control con `label for`+`id`, ningún botón con texto genérico «Aceptar»/«Enviar», toda `table` con `caption`, `thead` y `th scope`, todo mensaje con `id`+`role="status"`, sin `tabindex` positivo, `alt` por vacuidad —sin imágenes, se registra como cumplido—); cubre SHALL Semántica + SHALL Controles/Botones + SHALL Tablas + SHALL Accesibilidad y R-02/R-04/R-06/CA-02/CA-04 parcial; depende de 2.1–6.1; verificación: búsqueda en el código de `tabindex`, `Aceptar`, `<table` sin `caption` (cero ocurrencias) y un solo `<h1>`, más recorrido Tab/Shift+Tab sin trampas en `file://`.
- [x] 7.2 Unificar marcado ficticio de ejemplos en `index.html` (cada conjunto —libros, clientes, ventas— con nota visible o `data-ejemplo="true"`, nombre «la libre» en `title` y `h1`, género «Sin clasificar» literal donde corresponda); cubre SHALL Datos de ejemplo (marcado) y R-03/CA-03; depende de 2.1–6.1; verificación: contar en `file://` 2–3 libros (≥1 «Sin clasificar»), 2 clientes, 1–2 ventas, cada conjunto identificado como ficticio.

## 8. Verificación final

- [x] 8.1 Verificación final de integración en `index.html`: abrir con `file://` y navegar las 5 vistas sin rotos, pasar validador HTML con 0 errores, y chequear ausencias (sin `<link>` externos, sin `<script>` funcional, sin CDN/API/backend, `css/` y `js/` intactos); cubre SHALL Verificable sin herramientas + CA-01/CA-04 + R-05/R-07 y cierra CA-02/CA-03 a nivel documento; depende de 7.1–7.2; verificación: las 5 anclas funcionan, el validador reporta 0 errores (warnings solo informados) y la inspección de fuentes confirma las ausencias.
