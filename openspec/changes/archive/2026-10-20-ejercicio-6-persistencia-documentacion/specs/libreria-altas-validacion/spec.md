## RENAMED Requirements

- FROM: `### Requirement: R-03 Actualización sin recarga y sin persistencia`
- TO: `### Requirement: R-03 Actualización sin recarga y guardado`

## MODIFIED Requirements

### Requirement: R-03 Actualización sin recarga y guardado

Tras una alta correcta, el listado correspondiente y las opciones relacionadas SHALL actualizarse en el DOM sin recargar la página, y la colección modificada SHALL guardarse según la capability `libreria-persistencia-documentacion` (Ejercicio 6). No se exige editar ni eliminar registros.

#### Scenario: Listado se actualiza sin recarga

- **WHEN** se registra correctamente un libro o cliente
- **THEN** el nuevo registro aparece en el listado/tabla correspondiente y en las opciones relacionadas sin recargar `index.html`.

#### Scenario: Alta conservada al recargar

- **WHEN** se registra correctamente un libro o cliente y después se recarga `index.html`
- **THEN** el registro sigue en el listado y en las opciones relacionadas, una sola vez.

## ADDED Requirements

### Requirement: R-05 Mensajes de validación propios

Los formularios `#libros-form` y `#clientes-form` SHALL desactivar la validación nativa del navegador (atributo `novalidate`) para que todo envío llegue a las validaciones del Ejercicio 4 y el motivo del rechazo se muestre como texto en `#libros-mensaje` o `#clientes-mensaje`. Los tipos de campo existentes (`type="email"`, `type="number"` con `min` y `step`) SHALL conservarse.

#### Scenario: Email con formato inválido

- **WHEN** se envía `#clientes-form` con nombre completo y un email sin formato válido (p. ej. `correo-invalido`)
- **THEN** el navegador no muestra su globo de validación, no se agrega el cliente y `#clientes-mensaje` muestra «El email no tiene un formato válido.».

#### Scenario: Precio cero

- **WHEN** se envía `#libros-form` con título e ISBN nuevos válidos y precio `0`
- **THEN** el navegador no bloquea el envío, no se agrega el libro y `#libros-mensaje` muestra «El precio debe ser numérico mayor a 0.».
