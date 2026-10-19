# Tasks

## 1. HTML

- [x] 1.1 Quitar ejemplos estáticos de `#venta-cliente`, `#venta-libro`, `#ventas-renglones`, `#historial-tabla` e `#historial-detalle`
- [x] 1.2 Botones Confirmar/Cancelar como `type="button"` (están fuera de un form) y cargar `js/ventas.js` al final

## 2. Datos y altas

- [x] 2.1 `var ventas = []` en `js/datos.js`
- [x] 2.2 `renderOpcionesCliente` agrega «Seleccioná un cliente» y conserva la selección; `altaLibro` refresca `#venta-libro`

## 3. Venta en curso (`js/ventas.js`)

- [x] 3.1 Agregar renglón con validación de libro, cantidad entera > 0 y duplicado
- [x] 3.2 Cantidad editable por renglón con subtotal y total recalculados; quitar renglón
- [x] 3.3 Confirmar con copia histórica de precio; limpiar formulario; cancelar

## 4. Historial

- [x] 4.1 Tabla con id, fecha, cliente, total y «Ver detalle»; mensaje de lista vacía
- [x] 4.2 Detalle de renglones desde los datos guardados

## 5. Verificación

- [x] 5.1 Prueba automatizada en Chrome headless sobre una copia de `index.html` (20/20 casos): sin cliente, sin renglones, cantidades 0/-1/1.5/vacía, duplicado, cantidad editada inválida, 2×1500 + 1×2000 = 5000.00, quitar renglón, limpieza tras confirmar, historial, precio histórico tras cambiar `libros`, título con HTML insertado como texto
- [ ] 5.2 Revisión visual manual a 320 px y 1280 px (pendiente)
