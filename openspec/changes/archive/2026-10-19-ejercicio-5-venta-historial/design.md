# Design

## Datos

- Venta en curso: `renglonesVenta = [{ libroId, cantidad }]`; `cantidad` guarda el texto escrito para poder mostrar «Cantidad inválida» mientras se edita.
- Venta confirmada (en `ventas`, `js/datos.js`):

```js
{ id: "V-001", fecha: "2026-10-19T19:30:00.000Z", clienteId, clienteNombre, clienteEmail,
  renglones: [{ libroId, titulo, isbn, cantidad, precioUnitario, subtotal }], total }
```

El historial lee solo estos campos copiados; nunca vuelve a `libros`.

## Decisiones

- D-1 Duplicado: se informa y se pide modificar la cantidad del renglón existente (la consigna admite ambas opciones).
- D-2 Cantidad válida: `/^\d+$/` y > 0. Rechaza `0`, `-1`, `1.5`, vacío y notación `1e2`.
- D-3 Importes: subtotal y total se calculan en centavos y se muestran con `toFixed(2)`.
- D-4 Mensajes: `#ventas-mensaje`, `#ventas-total` e `#historial-detalle-mensaje` usan `.mensaje--error`/`.mensaje--exito` y los errores llevan el prefijo «Error:» (no dependen del color).
- D-5 Todo texto variable con `textContent`. El detalle enfoca su título (`tabindex="-1"`) para la navegación por teclado.

## Funciones (`js/ventas.js`)

`parsearCantidad`, `calcularSubtotal`, `calcularTotal`, `formatearImporte`, `renderOpcionesVentaLibro`, `renderRenglones`, `agregarRenglon`, `quitarRenglon`, `armarVenta` (validación + copia histórica), `confirmarVenta`, `cancelarVenta`, `renderHistorial`, `mostrarDetalleVenta`.
