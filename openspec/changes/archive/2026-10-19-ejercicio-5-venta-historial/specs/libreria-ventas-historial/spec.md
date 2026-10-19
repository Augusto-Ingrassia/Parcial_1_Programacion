## ADDED Requirements

### Requirement: R-01 Composición de la venta

El sistema SHALL permitir elegir un cliente existente y agregar renglones con un libro existente y una cantidad entera mayor que cero. Un libro ya presente en la venta SHALL NOT crear otro renglón. Antes de confirmar SHALL poder cambiarse la cantidad y quitarse renglones.

#### Scenario: Cantidad inválida

- **WHEN** se intenta agregar un renglón con cantidad 0, negativa, decimal o vacía
- **THEN** no se agrega y `#ventas-mensaje` muestra un error en texto.

#### Scenario: Libro repetido

- **WHEN** se agrega un libro que ya está en la venta
- **THEN** no se crea otro renglón y se informa el duplicado.

### Requirement: R-02 Cálculos

Cada renglón SHALL mostrar libro, cantidad, precio unitario y subtotal (cantidad × precio). El total SHALL ser la suma de subtotales. Los importes SHALL mostrarse con dos decimales.

#### Scenario: Venta del caso manual

- **WHEN** se agregan dos unidades de un libro de 1500 y una de un libro de 2000
- **THEN** los subtotales son $3000.00 y $2000.00 y el total $5000.00.

### Requirement: R-03 Confirmación

El sistema SHALL impedir confirmar sin cliente, sin renglones o con cantidades inválidas. Al confirmar SHALL registrar identificador, fecha, cliente, renglones (con título, ISBN y precio unitario copiados) y total, limpiar el formulario y mostrar un mensaje de resultado.

#### Scenario: Confirmación rechazada

- **WHEN** falta el cliente, no hay renglones o una cantidad editada es inválida
- **THEN** no se agrega ninguna venta y se muestra el motivo.

### Requirement: R-04 Historial inmutable

El historial SHALL mostrar identificador, fecha, cliente y total de cada venta y permitir consultar sus renglones. La interfaz SHALL NOT ofrecer editar ni eliminar ventas. El detalle SHALL usar los valores copiados al confirmar.

#### Scenario: Cambio de precio posterior

- **WHEN** después de confirmar cambia el precio del libro en `libros`
- **THEN** el detalle de la venta sigue mostrando el precio unitario, los subtotales y el total confirmados.
