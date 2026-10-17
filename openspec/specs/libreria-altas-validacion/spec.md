# libreria-altas-validacion Specification

## Purpose

Alta y validación de libros y clientes sobre los datos locales existentes (editoriales, géneros, autores, libros, clientes) del Ejercicio 4, con actualización de listado y opciones sin recargar la página, verificable abriendo index.html.

## Requirements

### Requirement: R-01 Alta de libro con validaciones completas

El sistema SHALL permitir registrar un libro mediante el formulario `#libros-form`, controlando el envío con `preventDefault`, y solo agregar el registro si todas las validaciones pasan. El libro SHALL tener `id` estable (p. ej. `lib7`, `lib8`, …), título, ISBN, precio numérico > 0, editorial existente, al menos un autor existente, y género opcional (si se asigna, debe existir; si no, `null`/ausente, mostrado como "Sin clasificar"). Las opciones de editorial, género y autores SHALL generarse a partir de los datos locales: editorial y género mediante `<select>`, autores mediante selector múltiple o controles equivalentes; el selector de género SHALL incluir la opción "Sin clasificar" representando ausencia de género.

#### Scenario: Alta válida agrega el libro

- **WHEN** se completa el formulario con título no vacío, ISBN no vacío y no duplicado (comparado sin espacios ni guiones), precio numérico > 0, editorial existente, al menos un autor existente, y género existente o "Sin clasificar"
- **THEN** el libro se agrega a la colección local, el listado de libros y el catálogo se actualizan sin recargar, y el formulario se limpia o se muestra mensaje de éxito.

#### Scenario: Validaciones fallidas bloquean el alta

- **WHEN** falta el título o ISBN, el ISBN ya existe, el precio no es numérico o <= 0, la editorial o un autor no existe, no se selecciona autor, o el género asignado no existe
- **THEN** no se agrega el registro y se muestra un error cerca del formulario (`#libros-mensaje`) describiendo el problema.

#### Scenario: Opciones generadas desde datos locales

- **WHEN** se abre `#vista-libros`
- **THEN** el selector de editorial contiene una opción por cada editorial, el de género una por cada género más "Sin clasificar", y el de autores permite seleccionar uno o varios de los autores existentes.

### Requirement: R-02 Alta de cliente con validaciones completas

El sistema SHALL permitir registrar un cliente mediante `#clientes-form`, controlando el envío con `preventDefault`, y solo agregar el registro si todas las validaciones pasan. El cliente SHALL tener `id` estable, nombre completo no vacío y email no vacío con formato válido y no duplicado (comparado sin espacios exteriores y sin distinguir mayúsculas/minúsculas).

#### Scenario: Alta válida agrega el cliente

- **WHEN** se completa el formulario con nombre completo no vacío y email válido y no duplicado
- **THEN** el cliente se agrega a la colección local, el listado de clientes y las opciones relacionadas (p. ej. selector de clientes en ventas) se actualizan sin recargar, y se muestra mensaje de éxito.

#### Scenario: Validaciones fallidas bloquean el alta

- **WHEN** el nombre o email están vacíos, el email tiene formato inválido, o ya existe otro cliente con el mismo email (trim + case-insensitive)
- **THEN** no se agrega el registro y se muestra un error cerca del formulario (`#clientes-mensaje`).

### Requirement: R-03 Actualización sin recarga y sin persistencia

Tras una alta correcta, el listado correspondiente y las opciones relacionadas SHALL actualizarse en el DOM sin recargar la página. No se exige editar ni eliminar registros. No se requiere persistencia (no `localStorage`/backend).

#### Scenario: Listado se actualiza sin recarga

- **WHEN** se registra correctamente un libro o cliente
- **THEN** el nuevo registro aparece en el listado/tabla correspondiente y en las opciones relacionadas sin recargar `index.html`.

### Requirement: R-04 Convenciones heredadas

El sistema SHALL mantener las convenciones del proyecto: JS nativo sin librerías ni fetch; inserción de texto variable con `textContent` (prohibido `innerHTML` con datos); verificación manual abriendo `index.html` con doble clic.

#### Scenario: Sin dependencias ni inyección HTML

- **WHEN** se inspeccionan las fuentes entregadas
- **THEN** no hay CDNs/librerías/frameworks, no hay `fetch`, y no existe `innerHTML` aplicado a datos variables.
