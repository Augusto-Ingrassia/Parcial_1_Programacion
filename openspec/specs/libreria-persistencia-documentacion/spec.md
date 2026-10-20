# libreria-persistencia-documentacion Specification

## Purpose

Conservar libros, clientes y ventas entre aperturas de `index.html` mediante `localStorage`, sin duplicar los ejemplos iniciales, y documentar la entrega final del TPI (README, guía y registro de los casos manuales, prompt del Ejercicio 6).

## Requirements

### Requirement: R-01 Carga inicial sin duplicar ejemplos

El sistema SHALL conservar libros, clientes y ventas en el `localStorage` del navegador. Al abrir la página, antes de mostrar catálogo, listados, selectores e historial, para cada colección: si no hay un valor guardado SHALL usar los ejemplos de `js/datos.js` y guardarlos; si hay un valor guardado válido SHALL reemplazar por completo a los ejemplos (nunca combinarlos). Editoriales, géneros y autores SHALL NOT guardarse: siguen saliendo de `js/datos.js`.

#### Scenario: Primer inicio

- **WHEN** se abre `index.html` sin ninguna clave `lalibre.*` guardada
- **THEN** el catálogo muestra los 6 libros de ejemplo, el listado de clientes los 3 de ejemplo, el historial no tiene ventas y quedan guardadas las tres claves (`lalibre.ventas` con `[]`).

#### Scenario: Recarga después de altas y venta

- **WHEN** después de registrar un libro, registrar un cliente y confirmar una venta se recarga la página una o más veces
- **THEN** catálogo, listados, selectores de venta e historial muestran los ejemplos una sola vez más los registros nuevos una sola vez, y el historial conserva la misma cantidad de ventas.

#### Scenario: Identificadores después de recargar

- **WHEN** después de recargar se registra otro libro, otro cliente u otra venta
- **THEN** su identificador continúa la numeración (`lib…`, `cli…`, `V-…`) sin repetir uno existente.

### Requirement: R-02 Claves y estructura guardada

El sistema SHALL usar exactamente tres claves, una por colección: `lalibre.libros`, `lalibre.clientes` y `lalibre.ventas`. Cada valor SHALL ser un arreglo JSON cuyos objetos tienen los mismos campos que en `js/datos.js`: libro `{ id, titulo, isbn, editorialId, generoId, autorIds, precio }` con `precio` numérico; cliente `{ id, nombre, email }`; venta `{ id, fecha, clienteId, clienteNombre, clienteEmail, renglones: [{ libroId, titulo, isbn, cantidad, precioUnitario, subtotal }], total }`. El catálogo y las ventas SHALL estar en claves separadas, de modo que se pueda modificar el catálogo guardado sin tocar las ventas.

#### Scenario: Inspección con las herramientas del navegador

- **WHEN** se inspecciona el Local Storage del origen de la página después del primer inicio
- **THEN** existen las tres claves, y `lalibre.libros` contiene el arreglo del catálogo con un `precio` numérico por libro, separado de `lalibre.ventas`.

### Requirement: R-03 Guardado de cada operación confirmada

Después de cada alta correcta de libro, alta correcta de cliente y venta confirmada, el sistema SHALL guardar la colección completa correspondiente. Una operación rechazada por validación SHALL NOT modificar los valores guardados. Abrir o recargar la página SHALL NOT sobrescribir un valor guardado existente.

#### Scenario: Alta guardada

- **WHEN** se registra correctamente un libro
- **THEN** `lalibre.libros` lo contiene sin necesidad de recargar, y `lalibre.clientes` y `lalibre.ventas` no cambian.

#### Scenario: Operación rechazada

- **WHEN** un alta o una confirmación de venta se rechaza por una validación
- **THEN** los valores guardados de las tres claves quedan iguales.

### Requirement: R-04 Almacenamiento no disponible o datos inválidos

Si no se puede acceder a `localStorage`, o un valor guardado no es JSON válido o no es un arreglo, el sistema SHALL usar los ejemplos de `js/datos.js` para esa colección, SHALL seguir funcionando (catálogo, altas y ventas utilizables durante la sesión) y SHALL informar el problema en la consola sin romper la página. Un valor inválido SHALL NOT sobrescribirse al abrir la página: se reemplaza recién cuando se confirma una operación de esa colección. Si un guardado falla, la operación SHALL quedar aplicada en memoria y el fallo SHALL informarse en la consola.

#### Scenario: Valor corrupto

- **WHEN** `lalibre.libros` contiene un texto que no es JSON válido (p. ej. `[{"id":"lib1"`) o un JSON que no es arreglo (p. ej. `{}`) y se recarga la página
- **THEN** el catálogo muestra los 6 libros de ejemplo, la consola muestra una advertencia, clientes y ventas se cargan normalmente desde sus claves, y el valor inválido sigue guardado hasta el próximo alta correcta de libro.

#### Scenario: Almacenamiento bloqueado

- **WHEN** el navegador no permite usar `localStorage` para la página
- **THEN** la página abre con los ejemplos, las altas y ventas funcionan en memoria y la consola muestra una advertencia.

### Requirement: R-05 Precio histórico después de recargar

Las ventas confirmadas SHALL guardarse con los valores copiados al confirmar (título, ISBN, precio unitario, subtotales y total), y el historial SHALL mostrarlos después de recargar aunque el precio del libro en el catálogo guardado haya cambiado.

#### Scenario: Cambio exclusivo del precio guardado

- **WHEN** se confirma una venta de dos unidades de un libro de 1500 y una de un libro de 2000, luego se modifica con las herramientas del navegador únicamente el `precio` de uno de esos libros dentro de `lalibre.libros` (sin tocar `lalibre.ventas`) y se recarga la página
- **THEN** el catálogo muestra el precio nuevo y el detalle de esa venta en el historial sigue mostrando precios unitarios $1500.00 y $2000.00, subtotales $3000.00 y $2000.00 y total $5000.00.

### Requirement: R-06 README de entrega

La entrega SHALL incluir `README.md` en la raíz, en español, con: integrantes del equipo (los datos no verificados marcados como pendientes de confirmación); pasos para abrir `index.html` en el navegador sin npm; navegación entre vistas; funcionalidades implementadas y pendientes; ubicación de los datos iniciales (`js/datos.js`); funcionamiento y límites de `localStorage` (depende del navegador, del perfil y de la ubicación de apertura —`file://` o servidor local y puerto—, no comparte datos entre usuarios ni equipos y no es un mecanismo de seguridad); nombres exactos de las claves y estructura JSON del catálogo guardado con el procedimiento para modificar solo un precio; cómo volver a los datos de ejemplo; resultados de los casos manuales; y procedencia de imágenes ajenas, o la constancia de que no se usan.

#### Scenario: Revisión del README

- **WHEN** se lee el README sin abrir el código
- **THEN** se encuentra cada contenido exigido en la página 7 de la consigna, y la clave y la estructura indicadas permiten reproducir la comprobación del precio histórico.

### Requirement: R-07 Registro honesto de los casos manuales

El README SHALL incluir una tabla con los 8 casos manuales de la página 6 de la consigna, cada uno con su resultado esperado y una columna «Resultado observado», más el navegador y la fecha de ejecución. Un caso SHALL NOT figurar como aprobado sin haberse ejecutado: mientras no se ejecute, su resultado observado SHALL decir explícitamente que está pendiente; si un caso falla, SHALL registrarse el comportamiento real.

#### Scenario: README antes de ejecutar los casos

- **WHEN** se genera el README antes de que el equipo ejecute los casos en un navegador
- **THEN** cada fila muestra «PENDIENTE» en «Resultado observado» y ninguna fila afirma que el caso pasó.

### Requirement: R-08 Guía de pruebas manuales

La entrega SHALL incluir una guía enlazada desde el README que describa paso a paso cada uno de los 8 casos: preparación, datos exactos a ingresar, dónde hacer clic, qué observar y cómo anotar el resultado. La guía SHALL cubrir la edición del precio guardado con las herramientas del navegador, la revisión a 320 px y 1280 px, la navegación con teclado y, de forma opcional, dónde guardar capturas como evidencia.

#### Scenario: Caso de venta reproducible

- **WHEN** alguien sigue la guía partiendo de un almacenamiento vacío
- **THEN** puede registrar los libros de 1500 y 2000 (que no están entre los ejemplos) y componer la venta del caso con los datos indicados, sin consultar el código.

### Requirement: R-09 Prompt del Ejercicio 6

La entrega SHALL incluir el prompt usado para el Ejercicio 6 en `docs/Prompts/`, con las secciones de la plantilla del equipo (`docs/Prompts/Plantilla.md`) completas para este ejercicio.

#### Scenario: Prompt registrado

- **WHEN** se revisa `docs/Prompts/`
- **THEN** existe el prompt del Ejercicio 6 con rol, metodología, contexto, alcance, requisitos, fases, criterios de aceptación y restricciones, sin placeholders `{{…}}` sin completar salvo los marcados como pendientes.

### Requirement: R-10 Restricciones técnicas

La persistencia SHALL implementarse solo con HTML, CSS y JavaScript nativos, sin librerías, frameworks, CDNs, npm ni servidor, y SHALL funcionar abriendo `index.html` con doble clic (`file://`) en un navegador que permita `localStorage` para ese origen.

#### Scenario: Apertura directa

- **WHEN** se abre `index.html` con doble clic, se registra un libro y se recarga la página
- **THEN** el libro sigue en el catálogo, sin haber instalado ni ejecutado nada aparte del navegador.
