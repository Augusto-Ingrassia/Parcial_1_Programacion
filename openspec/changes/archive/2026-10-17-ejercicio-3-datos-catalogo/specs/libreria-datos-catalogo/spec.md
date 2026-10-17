# Spec Delta — libreria-datos-catalogo

## Purpose

Datos locales del Ejercicio 3 (libros, editoriales, géneros, autores, clientes) con catálogo generado desde el modelo y filtro por título con estados, verificable abriendo index.html sin herramientas.

## ADDED Requirements

### Requirement: R-01 Modelo local con id estables y mínimos ficticios

El sistema SHALL proveer los datos del Ejercicio 3 como colecciones locales en JS (libros, editoriales, géneros, autores, clientes) con `id` estables por entidad, con mínimos de >=6 libros, >=2 editoriales, >=2 géneros, >=3 autores y >=3 clientes, todos ficticios; cada libro SHALL referenciar 1 editorial existente y >=1 autor existente; todo género asignado a un libro SHALL existir en la colección de géneros; al menos 1 libro SHALL no tener género asignado.

#### Scenario: Mínimos y datos ficticios verificables

- **WHEN** se abre `index.html` vía `file://` y se inspeccionan los datos cargados por el JS (p. ej. desde la consola del navegador)
- **THEN** existen las 5 colecciones con los mínimos indicados, cada entidad tiene `id` estable no vacío, y los valores son ficticios (sin datos personales reales).

#### Scenario: Integridad referencial libro → editorial/autores/género

- **WHEN** se revisa cada libro del modelo
- **THEN** su editorial existe en la colección de editoriales, cada uno de sus autores existe en la colección de autores, su género (si lo tiene) existe en la colección de géneros, y al menos un libro no tiene género asignado.

#### Scenario: Libro sin género queda registrado como tal

- **WHEN** se localiza en el modelo el libro sin género
- **THEN** su ausencia de género es explícita (género ausente/nulo, no un nombre inventado), de modo que el renderizado pueda mostrar el literal "Sin clasificar".

### Requirement: R-02 Catálogo generado desde el modelo con seis datos por libro

El sistema SHALL generar el contenido de `catalogo-lista` desde el array de libros (no desde HTML estático), donde cada item SHALL mostrar título, ISBN, editorial (nombre resuelto desde su id), género (nombre resuelto o el texto literal "Sin clasificar" si no tiene), autores (nombres resueltos) y precio; los items generados SHALL identificarse como ejemplos ficticios.

#### Scenario: Render inicial con seis datos y resolución de nombres

- **WHEN** se abre `#vista-catalogo` sin haber buscado
- **THEN** `catalogo-lista` contiene un item por cada libro del modelo (>=6), cada uno con los seis datos visibles, la editorial y los autores mostrados como nombres (no id crudos), y el libro sin género muestra exactamente "Sin clasificar".

#### Scenario: Filtro reacciona a buscar y a limpiar con lógica separada

- **WHEN** se escribe un texto en `catalogo-busqueda` y se activa `catalogo-buscar`, y luego se activa `catalogo-limpiar`
- **THEN** la lista se reduce a los libros cuyo título coincide y después vuelve a mostrar el catálogo completo, con el filtrado, el renderizado y el mensaje gestionados como responsabilidades separadas (detalle de funciones en `design.md`).

### Requirement: R-03 Estados de búsqueda vacía y sin coincidencias

Con búsqueda vacía o compuesta solo de espacios el sistema SHALL mostrar el catálogo completo en `catalogo-lista`; cuando no hay coincidencias el sistema SHALL vaciar `catalogo-lista` y mostrar en `catalogo-mensaje` (que conserva `role="status"`) un mensaje claro de "sin coincidencias"; los ejemplos mostrados SHALL seguir marcados como ficticios.

#### Scenario: Búsqueda vacía muestra todo

- **WHEN** `catalogo-busqueda` está vacío y se activa `catalogo-buscar`
- **THEN** `catalogo-lista` muestra todos los libros del modelo y `catalogo-mensaje` no presenta un error de "sin coincidencias".

#### Scenario: Búsqueda de solo-espacios equivale a vacía

- **WHEN** `catalogo-busqueda` contiene solo espacios y se activa `catalogo-buscar`
- **THEN** `catalogo-lista` muestra todos los libros del modelo (mismo resultado que la búsqueda vacía).

#### Scenario: Sin coincidencias vacía lista y comunica estado

- **WHEN** se busca un título que no existe (p. ej. una cadena sin coincidencia como "zzzsincoincidencia") y se activa `catalogo-buscar`
- **THEN** `catalogo-lista` queda sin items y `catalogo-mensaje` muestra un texto claro de que no hay coincidencias.

### Requirement: R-04 Normalización insensible a caso y texto seguro

El sistema SHALL normalizar la búsqueda y los títulos con recorte de espacios (trim) + minúsculas + plegado de diacríticos (tildes) e inclusión por subcadena (includes), de modo que mayúsculas/minúsculas, tildes y coincidencias parciales funcionen (p. ej. "jardin" = "jardín", "JARDIN" = "jardín"); toda inserción de texto variable proveniente de datos o de la búsqueda SHALL hacerse con `textContent` (prohibido `innerHTML` con datos); las funciones SHALL mantenerse acotadas a filtrar/renderizar/mensajes, sin `fetch` ni ABM auxiliares.

#### Scenario: Mayúsculas y minúsculas equivalen

- **WHEN** se busca el mismo título en mayúsculas y en minúsculas (p. ej. "JARDÍN" vs "jardín")
- **THEN** ambos devuelven el mismo conjunto de libros.

#### Scenario: Tildes plegadas ("jardin" = "jardín")

- **WHEN** se busca "jardin" (sin tilde), "jardín" (con tilde) o "JARDIN" (mayúsculas sin tilde)
- **THEN** las tres devuelven el mismo conjunto de libros (el plegado de diacríticos aplica a la consulta y al título antes del `includes`).

#### Scenario: Coincidencia parcial por subcadena

- **WHEN** se busca una subcadena del título (p. ej. parte de "astronomía")
- **THEN** los libros cuyo título la contiene aparecen en `catalogo-lista`.

#### Scenario: Sin inyección de HTML desde datos o búsqueda

- **WHEN** se inspecciona el código JS entregado (Fase 2) y se busca con una cadena que contiene marcas (p. ej. "<b>")
- **THEN** no existe `innerHTML` aplicado a datos variables o a la entrada del usuario y la cadena buscada se muestra como texto literal, sin interpretarse como HTML; además no hay llamadas a `fetch` ni lógica de altas/bajas/modificaciones.

### Requirement: R-05 Verificable sin tooling y sin dependencias externas

El resultado SHALL verificarse abriendo `index.html` con doble clic (`file://`), sin npm, sin servidor y sin build, usando únicamente HTML + CSS + JavaScript nativo, sin librerías, frameworks ni CDNs CSS-JS.

#### Scenario: Apertura directa con catálogo y filtro funcionales

- **WHEN** se abre `index.html` con doble clic sin instalar nada y se usa el buscador del catálogo
- **THEN** el catálogo se genera, el filtro y sus estados funcionan, y la navegación a las 5 vistas sigue operativa.

#### Scenario: Ausencia de dependencias excluidas

- **WHEN** se inspeccionan las fuentes entregadas
- **THEN** no hay `<script>` o `<link>` a CDNs, ni referencias a librerías/frameworks, ni llamadas a API/BD/servidor/backend/login, ni configuración de npm/build/servidor.

### Requirement: R-06 Organización en js/ con id existentes y separación HTML/JS

El sistema SHALL ubicar el JS del Ejercicio 3 en archivos bajo `js/` (detalle de nombres en `design.md`), usar los id existentes (`catalogo-busqueda`, `catalogo-buscar`, `catalogo-limpiar`, `catalogo-lista`, `catalogo-mensaje`) sin renombrarlos salvo justificación documentada, y mantener la separación HTML/JS (el HTML no SHALL contener datos duplicados del modelo como fuente de verdad una vez implementado el render).

#### Scenario: Archivos bajo js/ y controles originales intactos

- **WHEN** se inspeccionan las fuentes entregadas y el DOM de `#vista-catalogo`
- **THEN** el JS vive en archivos bajo `js/` referenciados al final del `body`, los cinco id del catálogo existen con los mismos nombres, y el buscador, la lista y el mensaje conservan sus clases y atributos (`grilla-catalogo`, `tarjeta-libro`, `role="status"`).

### Requirement: R-07 Puntos de extensión reutilizables sin implementar Ej.4–6

El sistema SHALL exponer el modelo y las operaciones del catálogo como puntos reutilizables (id de entidades y operaciones separadas de filtrado/render/mensaje) para los Ejercicios 4–6, sin implementar altas de libros, ventas ni persistencia en este change.

#### Scenario: Reutilizable sin alcance extra

- **WHEN** se inspeccionan el modelo y el JS del catálogo entregados (Fase 2)
- **THEN** existen id estables y operaciones separadas documentadas en `design.md` que Ej.4–6 pueden reutilizar, y no hay formularios funcionales de alta, ni cálculo de ventas, ni `localStorage`/persistencia implementados.
