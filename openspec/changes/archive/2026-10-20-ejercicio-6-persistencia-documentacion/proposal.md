# Proposal

## Why

El Ejercicio 6 (10 puntos: persistencia 4, pruebas manuales registradas 3, documentación y entrega 3) cierra el TPI. Hoy libros, clientes y ventas viven solo en memoria: al recargar `index.html` se pierden las altas y las ventas confirmadas, y la entrega no tiene `README.md`, que la consigna (páginas 6 y 7 de `docs/Primer Parcial.pdf`) exige con contenidos concretos.

## What Changes

- Nuevo `js/persistencia.js`, cargado en `index.html` inmediatamente después de `js/datos.js` y antes de `js/catalogo.js`. Reemplaza `libros`, `clientes` y `ventas` por lo guardado antes de que se dibuje nada.
- Primer inicio (clave ausente): se conservan los ejemplos de `js/datos.js` y se guardan. Inicios siguientes: lo guardado **reemplaza** a los ejemplos (nunca se agregan), así no se duplican ejemplos ni ventas.
- Una clave por colección, con prefijo del proyecto: `lalibre.libros`, `lalibre.clientes`, `lalibre.ventas`; cada valor es un arreglo JSON con la misma forma de objeto que `js/datos.js`. Editoriales, géneros y autores siguen estáticos en `js/datos.js`.
- Si `localStorage` no está disponible o un valor está corrupto o no es un arreglo, se usan los ejemplos sin romper la página (`console.warn`).
- Guardado explícito en cada camino de escritura, con la misma guarda `typeof … === "function"` que usa el equipo: después de `libros.push` (`altaLibro`) y de `clientes.push` (`altaCliente`) en `js/altas.js`, y después de `ventas.push` (`confirmarVenta`) en `js/ventas.js`. El resto del código del equipo no se toca; solo se actualizan los comentarios de cabecera que dicen «sin persistencia».
- Atributo `novalidate` en `#libros-form` y `#clientes-form` para que la validación nativa del navegador (`type="email"`, `min="0.01"`) no intercepte el envío y siempre aparezcan los mensajes de JS del Ejercicio 4 junto al formulario.
- Nuevo `README.md` (raíz, en español) con todo lo que pide la página 7: integrantes, apertura sin npm, navegación, funcionalidades implementadas y pendientes, datos iniciales, funcionamiento y límites de `localStorage`, claves y estructura del catálogo guardado, cómo volver a los ejemplos, tabla de los 8 casos manuales con «Resultado observado» **pendiente** y procedencia de imágenes.
- Nueva guía paso a paso `docs/guia-pruebas-manuales.md`, enlazada desde el README, para ejecutar a mano los 8 casos (incluida la edición del precio guardado con DevTools y la revisión a 320 px / 1280 px).
- Nuevo `docs/Prompts/prompt6.md` según la convención del equipo (`docs/Prompts/Plantilla.md`).
- `js/libros.js` y `js/clientes.js` (Ejercicio 4, no cargados por `index.html`) no se borran ni se modifican; el README aclara que no están en uso.

## Capabilities

### New Capabilities

- `libreria-persistencia-documentacion`: persistencia en `localStorage` de libros, clientes y ventas (carga, reemplazo de ejemplos, guardado, robustez, precio histórico tras recargar) y documentación de entrega (README, guía y registro de casos manuales, prompt).

### Modified Capabilities

- `libreria-altas-validacion`: R-03 deja de decir «sin persistencia (no `localStorage`)»; las altas correctas ahora también se guardan. Se agrega R-05: los formularios de alta muestran siempre sus propios mensajes de validación (`novalidate`).

## Impact

- Archivos nuevos: `js/persistencia.js`, `README.md`, `docs/guia-pruebas-manuales.md`, `docs/Prompts/prompt6.md`.
- Archivos modificados con cambios mínimos: `index.html` (un `<script>` y dos atributos `novalidate`), `js/altas.js` (dos llamadas con guarda y cabecera), `js/ventas.js` (una llamada con guarda y cabecera), `js/datos.js` (solo comentario de cabecera).
- Sin dependencias, sin npm, sin servidor. Fuera de alcance: editar o eliminar registros, pantalla de edición de precios, botón «reiniciar datos», refactors del código del equipo.
- Los resultados de los casos manuales quedan pendientes hasta que el equipo los ejecute en un navegador: la consigna prohíbe marcar una prueba como aprobada sin ejecutarla.
