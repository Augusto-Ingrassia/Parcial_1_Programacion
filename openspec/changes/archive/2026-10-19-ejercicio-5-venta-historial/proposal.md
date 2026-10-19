# Proposal

## Why

El Ejercicio 5 (20 puntos) completa el flujo de la librería: componer una venta simulada para un cliente existente, confirmarla con precios históricos y consultarla en un historial de solo lectura.

## What Changes

- Vista Ventas: selector de cliente (con opción vacía «Seleccioná un cliente»), selector de libro generado desde `libros`, cantidad y botón «Agregar renglón».
- Renglones con libro, cantidad editable, precio unitario, subtotal y botón «Quitar renglón». Libro repetido: se informa el duplicado y no se crea otro renglón.
- Total = suma de subtotales, con dos decimales. No se confirma sin cliente, sin renglones o con cantidades que no sean enteros > 0.
- Confirmación: se registra `id` (V-001…), fecha ISO, datos del cliente, renglones con copia de título, ISBN y precio unitario, y total. Se limpia el formulario y se informa el resultado.
- Historial: tabla con identificador, fecha, cliente y total; «Ver detalle» muestra los renglones guardados. Sin edición ni eliminación.
- Se quitan los ejemplos estáticos de las tablas de venta e historial.

## Capabilities

### New Capabilities

- `libreria-ventas-historial`

### Modified Capabilities

- Ninguna a nivel de requisitos. `js/altas.js` ahora también refresca `#venta-libro` tras un alta de libro y agrega la opción vacía en `#venta-cliente`.

## Impact

- Nuevo `js/ventas.js`; `var ventas = []` en `js/datos.js`; hooks en `index.html` (`<script>`, botones `type="button"`, `tbody` vacíos).
- Sin persistencia (Ejercicio 6), sin dependencias.
