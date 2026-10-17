# Tasks

## 1. HTML: generar selectores dinámicos

- [x] 1.1 Reemplazar el input de texto de editorial por `<select id="libro-editorial">` con opciones generadas desde `editoriales` y verificar que se puebla al cargar
- [x] 1.2 Reemplazar el select fijo de género por `<select id="libro-genero">` con opciones de `generos` + "Sin clasificar" y verificar
- [x] 1.3 Reemplazar el input de texto de autores por `<select id="libro-autores" multiple>` con opciones de `autores` y verificar selección múltiple

## 2. JS altas: validación y alta de libros

- [x] 2.1 Crear `js/altas.js` con `normalizarIsbn`, `validarLibro` y verificar errores por cada regla
- [x] 2.2 Implementar `altaLibro` que pushea a `libros` con id estable y actualiza listado/catálogo y verificar
- [x] 2.3 Implementar `renderListadoLibros` y `renderOpcionesLibro` y verificar actualización sin recarga

## 3. JS altas: validación y alta de clientes

- [x] 3.1 Implementar `validarCliente` (nombre/email no vacíos, email formato, unicidad trim+case-insensitive) y verificar
- [x] 3.2 Implementar `altaCliente` con id estable y `renderListadoClientes`/`renderOpcionesCliente` y verificar actualización sin recarga

## 4. Wiring y verificación

- [x] 4.1 Conectar `submit` de `#libros-form` y `#clientes-form` con `preventDefault` y mostrar errores en mensajes
- [x] 4.2 Cargar `js/altas.js` en `index.html` después de `datos.js` y `catalogo.js` y verificar apertura directa sin errores
- [x] 4.3 Verificación manual: altas válidas/inválidas de libro y cliente, actualización de listados/opciones sin recarga, sin innerHTML con datos
