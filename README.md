# la libre — Catálogo y gestión de una librería

Trabajo práctico integrador de Programación III (Tecnicatura Universitaria en Programación). Es un frontend de una librería hecho solo con HTML, CSS y JavaScript nativos: catálogo con búsqueda, alta de libros y clientes con validación, venta simulada con historial y persistencia en el navegador con `localStorage`.

Todos los datos que muestra la página son ficticios. No usa librerías, frameworks, CDNs, API, base de datos ni servidor.

## Integrantes

| Usuario en Git | Ejercicio | Nombre completo |
| --- | --- | --- |
| francosquillo | 1 — HTML | Franco Squillo |
| Lautaro Mejias | 2 — CSS | Lautaro Mejias |
| Augusto-Ingrassia | 3 — Datos y catálogo | Augusto Ingrassia |
| Elias | 4 — Altas de libros y clientes | Elias Perez |
| vegauriel2229 | 5 — Ventas e historial | Uriel Vega |
| Matheo Bazan | 6 — Persistencia, verificación y documentación | Matheo Bazán |

## Cómo abrir el proyecto (sin npm)

1. Descargá o cloná el repositorio y abrí la carpeta del proyecto.
2. Hacé doble clic en `index.html`, o arrastralo a una ventana del navegador.
3. No hace falta instalar nada: no hay `npm`, ni compilación, ni servidor, ni conexión a internet. Alcanza con un navegador actual que tenga JavaScript y `localStorage` habilitados.

Si preferís abrirlo desde un servidor local estático, tené en cuenta que el origen cambia (`http://localhost:<puerto>` en lugar de `file://`) y, con él, el almacenamiento donde se guardan los datos (ver [Límites de localStorage](#límites-de-localstorage)).

## Navegación entre vistas

La aplicación es una sola página (`index.html`) con cinco secciones, una debajo de otra. El menú de la parte superior tiene un enlace de ancla por sección: al hacer clic, la página se desplaza hasta esa sección sin recargarse.

| Enlace del menú | Sección | Qué se hace ahí |
| --- | --- | --- |
| Catálogo | `#vista-catalogo` | Ver los libros y buscarlos por título. |
| Libros | `#vista-libros` | Registrar un libro y ver el listado de libros. |
| Clientes | `#vista-clientes` | Registrar un cliente y ver el listado de clientes. |
| Ventas | `#vista-ventas` | Armar una venta con renglones, confirmarla o cancelarla. |
| Historial | `#vista-historial` | Ver las ventas confirmadas y el detalle de cada una. |

## Funcionalidades implementadas y pendientes

### Implementadas, por ejercicio

- **Ejercicio 1 — Estructura HTML** (`index.html`): encabezado, menú, cinco secciones, formularios con etiquetas, tablas con encabezados y contenedores de mensajes.
- **Ejercicio 2 — Presentación con CSS** (`css/base.css`, `css/layout.css`, `css/componentes.css`): estilos propios sin librerías, diseño adaptable, foco visible y tablas que se desplazan dentro de su contenedor.
- **Ejercicio 3 — Datos y catálogo** (`js/datos.js`, `js/catalogo.js`): modelo de datos local, catálogo generado desde los datos y búsqueda por título sin distinguir mayúsculas ni acentos, con búsqueda vacía (catálogo completo) y mensaje cuando no hay resultados.
- **Ejercicio 4 — Altas de libros y clientes** (`js/altas.js`): alta de libro con título, ISBN, precio, editorial, género opcional («Sin clasificar») y autores; alta de cliente con nombre y email. Las validaciones rechazan datos vacíos, ISBN repetido (sin contar espacios ni guiones), precio no numérico o menor o igual a cero, email con formato inválido y email repetido (sin distinguir mayúsculas). Los listados y los selectores se actualizan sin recargar la página.
- **Ejercicio 5 — Ventas e historial** (`js/ventas.js`): venta con cliente y renglones (libro y cantidad entera mayor que cero, sin repetir libros), subtotales y total, confirmación y cancelación. Cada renglón guarda una copia del título, el ISBN y el precio unitario al confirmar; el historial es de solo lectura y muestra el detalle de cada venta.
- **Ejercicio 6 — Persistencia y documentación** (`js/persistencia.js`, este `README.md`, `docs/guia-pruebas-manuales.md`, `docs/Prompts/prompt6.md`): los libros, los clientes y las ventas se guardan en `localStorage` y se recuperan al volver a abrir la página sin duplicar los datos de ejemplo. Los formularios de alta tienen el atributo `novalidate` para que siempre se vean los mensajes de validación de la propia página y no los del navegador.

### Pendientes o no incluidas

- Editar o eliminar libros, clientes y ventas: no está implementado debido a que en las consignas no se exige.
- Pantalla para editar precios: no existe; la comprobación del precio histórico se hace con las herramientas del navegador (ver [Comprobación del precio histórico](#comprobación-del-precio-histórico)).
- Botón para reiniciar los datos: no existe; se vuelve a los ejemplos borrando las claves a mano (ver [Volver a los datos de ejemplo](#volver-a-los-datos-de-ejemplo)).
- Alta, baja y modificación de editoriales, géneros y autores: no existe. Estos datos son fijos en `js/datos.js` y no se guardan en `localStorage`.
- Errores de almacenamiento en la interfaz: si el navegador bloquea o llena el almacenamiento, solo se avisa en la consola del navegador.
- Sincronización entre pestañas: no existe; conviene usar una sola pestaña.
- Textos «de ejemplo» que siguen en pantalla aunque se muestren registros agregados por el usuario: la nota «los libros siguientes son datos ficticios de ejemplo» del catálogo, las notas de las tablas de libros y de clientes, los títulos de esas tablas («Listado de libros de ejemplo (datos ficticios)» y «Listado de clientes de ejemplo (datos ficticios)») y el pie de página.
- `js/libros.js` y `js/clientes.js` (Ejercicio 4) no se usan: `index.html` no los carga y la implementación activa es `js/altas.js`. Se conservan sin modificar.
- Resultados de los casos manuales: pendientes de ejecución en el navegador (ver [Casos manuales y resultados observados](#casos-manuales-y-resultados-observados)).

## Datos iniciales

Los datos de ejemplo están en `js/datos.js`:

- 3 editoriales, 2 géneros y 4 autores (fijos, no se guardan en `localStorage`).
- 6 libros, 3 clientes y una lista de ventas vacía (valores iniciales que `js/persistencia.js` reemplaza por lo guardado, ver abajo).

Todos son ficticios.

## Persistencia con localStorage

### Funcionamiento

- `js/persistencia.js` se carga en `index.html` después de `js/datos.js` y antes de `js/catalogo.js` (el orden de los scripts es `datos`, `persistencia`, `catalogo`, `altas`, `ventas`). Así las listas ya están cargadas cuando se dibuja la página.
- **Primer inicio** (no existe la clave): se usan los ejemplos de `js/datos.js` y se guardan.
- **Inicios siguientes**: lo guardado **reemplaza** por completo a los ejemplos; nunca se suman. Por eso no se duplican los ejemplos ni las ventas al recargar. Una lista vacía (por ejemplo, sin ventas) es un estado válido.
- **Guardado**: después de cada alta correcta de libro, alta correcta de cliente y venta confirmada se guarda la lista completa correspondiente. Una operación rechazada por una validación no modifica lo guardado, y abrir o recargar la página tampoco lo sobrescribe.

### Claves

Hay una clave por colección, con el prefijo `lalibre.`. Cada valor es un arreglo JSON.

| Clave | Contenido | Valor en el primer inicio |
| --- | --- | --- |
| `lalibre.libros` | Arreglo de libros (el catálogo guardado) | 6 libros |
| `lalibre.clientes` | Arreglo de clientes | 3 clientes |
| `lalibre.ventas` | Arreglo de ventas confirmadas | `[]` |

Para verlas: `F12` → pestaña **Application** → **Storage** → **Local Storage** → origen de la página (Chrome, Edge, Brave), o pestaña **Almacenamiento** → **Almacenamiento local** (Firefox).

### Estructura de lo guardado

Los objetos tienen los mismos campos que en `js/datos.js`. Un libro guardado en `lalibre.libros` (el valor real se guarda en una sola línea, aquí está con sangría para leerlo):

```json
{
  "id": "lib1",
  "titulo": "El jardín de los senderos",
  "isbn": "978-999-000001-1",
  "editorialId": "ed1",
  "generoId": "gen1",
  "autorIds": ["aut1"],
  "precio": 12500
}
```

`precio` es un número y `generoId` puede ser `null` (libro «Sin clasificar»). Un cliente de `lalibre.clientes` tiene `id`, `nombre` y `email`. Una venta de `lalibre.ventas` tiene la forma siguiente (valores de ejemplo):

```json
{
  "id": "V-001",
  "fecha": "2026-01-01T12:00:00.000Z",
  "clienteId": "cli1",
  "clienteNombre": "Ana Pérez Ejemplo",
  "clienteEmail": "ana.ejemplo@ficticio.com",
  "renglones": [
    {
      "libroId": "lib1",
      "titulo": "El jardín de los senderos",
      "isbn": "978-999-000001-1",
      "cantidad": 2,
      "precioUnitario": 12500,
      "subtotal": 25000
    }
  ],
  "total": 25000
}
```

El catálogo (`lalibre.libros`) y las ventas (`lalibre.ventas`) están en claves separadas, de modo que se puede modificar el catálogo guardado sin tocar las ventas.

### Comprobación del precio histórico

Cada renglón de una venta guarda una copia del título, el ISBN, el precio unitario y el subtotal al confirmarla; el historial muestra esos valores y no vuelve a leer el precio del catálogo. Para comprobarlo en una copia de prueba del proyecto:

1. Confirmá una venta y anotá sus importes (por ejemplo, dos unidades de un libro a 1500 y una de otro a 2000: subtotales 3000 y 2000, total 5000).
2. Cambiá **solamente** el `precio` de un libro dentro de la clave `lalibre.libros`, sin tocar `lalibre.ventas`. Se puede editar el valor desde las herramientas del navegador o pegar esto en la consola (cambia el precio del libro con ese ISBN a 1800):

   ```js
   var l = JSON.parse(localStorage.getItem("lalibre.libros"));
   var libroA = l.find(function (x) { return x.isbn.replace(/[\s-]/g, "") === "9789990001010"; });
   if (libroA) {
     libroA.precio = 1800;
     localStorage.setItem("lalibre.libros", JSON.stringify(l));
     console.log("Precio cambiado: " + libroA.titulo + " ahora vale " + libroA.precio + ". Recargá con F5.");
   } else {
     console.log("No se encontró el libro A en esta ventana. ISBN guardados:", l.map(function (x) { return x.isbn + " — " + x.titulo; }));
   }
   ```

3. Recargá la página enseguida, sin registrar libros, clientes ni ventas antes: cualquier operación guarda de nuevo la lista que está en memoria, con el precio viejo, y pisaría el cambio.
4. En **Catálogo** se ve el precio nuevo; en **Historial** → **Ver detalle** de la venta anterior siguen los importes confirmados.

El paso a paso con datos exactos está en la [guía de pruebas manuales](docs/guia-pruebas-manuales.md#caso-6--precio-histórico-cambio-exclusivo-del-precio-de-catálogo-guardado).

### Límites de localStorage

- **Depende del navegador**: cada navegador tiene su propio almacenamiento. Lo guardado en Chrome no se ve en Firefox.
- **Depende del perfil**: otro perfil del navegador u otro usuario del sistema operativo no ve los datos.
- **Depende de la ubicación de apertura**: abrir `index.html` con doble clic (`file://`) y abrirlo desde un servidor local (`http://localhost:<puerto>`) son orígenes distintos, con almacenamientos separados; cambiar el puerto también cambia el origen. Con `file://` algunos navegadores comparten el almacenamiento entre todos los archivos locales, por lo que una copia del proyecto podría ver las claves del original.
- **Ventana privada**: los datos se borran al cerrarla.
- **No se comparte entre usuarios ni entre equipos**: los datos viven solo en el navegador de cada persona; no hay servidor.
- **No es un mecanismo de seguridad ni cifrado**: cualquiera con acceso al navegador puede leer o modificar estos datos con las herramientas de desarrollo.
- **Capacidad limitada**: depende del navegador y es de unos pocos megabytes por origen.
- **Borrar los datos del sitio** (desde la configuración del navegador) elimina lo guardado.
- **Una sola pestaña**: con dos pestañas abiertas a la vez, la última que guarda pisa a la otra; no hay sincronización.
- **Almacenamiento bloqueado o lleno**: la página funciona con los ejemplos y las operaciones quedan solo en memoria durante la sesión (se pierden al recargar). Solo se avisa en la consola.

### Datos corruptos

Si el valor de una clave no es JSON válido o no es un arreglo (por ejemplo, se rompió una comilla al editarlo a mano), esa colección usa los ejemplos de `js/datos.js`, la consola del navegador muestra una advertencia con el nombre de la clave y la página sigue funcionando. Las otras colecciones se cargan normalmente.

El valor dañado **no se sobrescribe al abrir la página**: queda tal cual hasta la próxima operación correcta de esa colección, que guarda la lista que está en memoria (ejemplos más lo nuevo). Hasta entonces la advertencia se repite en cada recarga; se corrige arreglando el valor o borrando la clave. Solo se valida que el valor sea un arreglo, no cada campo de cada objeto.

### Volver a los datos de ejemplo

Borrá solo las tres claves y recargá la página. Desde las herramientas del navegador (clic derecho sobre cada clave → **Delete**) o pegando esto en la consola:

```js
["lalibre.libros", "lalibre.clientes", "lalibre.ventas"].forEach(function (k) { localStorage.removeItem(k); });
```

No uses `localStorage.clear()`: con `file://` algunos navegadores comparten el almacenamiento entre archivos locales y borrarías datos de otras páginas. Al recargar, la página carga los ejemplos de `js/datos.js` y los guarda de nuevo.

## Casos manuales y resultados observados

Los 8 casos de la consigna se ejecutan a mano en el navegador siguiendo la [guía de pruebas manuales](docs/guia-pruebas-manuales.md), que tiene los pasos y los datos exactos de cada caso. La columna «Resultado observado» se completa con lo que realmente se vio; si un caso falla, se anota el comportamiento real. No se declara el resultado de ningún caso que no se haya ejecutado.

- Navegador y versión: Brave version 1.97.59
- Fecha de ejecución: 20/10/2026

| # | Caso | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1 | Búsqueda con una parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados. | Cuando se busca con una parte del titulo en mayusculas el libro aparece de igual forma, cuando se hace una busqueda vacia aparece el listado completo de libros y cuando se busca un libro que no existe directamente aparece un mensaje diciendo No se encontraron libros para "X". |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y selección de venta. | Cuando damos de alta un libro con un ISBN existente salta un mensaje diciendo "El ISBN ya existe." y cuando se carga con un ISBN nuevo dice "Libro registrado correctamente." |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección. | Con un email inválido aparece el mensaje "El email no tiene un formato válido." y el cliente no se registra. Con un email existente escrito en mayúsculas (ANA.EJEMPLO@FICTICIO.COM) aparece "El email ya existe." y tampoco se registra. Con un email nuevo el cliente se registra con el mensaje "Cliente registrado correctamente." |
| 4 | Venta sin cliente, cantidad cero, negativa o decimal; libro repetido | No se confirma; el duplicado no crea otro renglón. | Una venta sin cliente dice "Error: seleccioná un cliente antes de confirmar. La venta no se confirmó.", Una venta con cantidad 0 dice "Error: la cantidad debe ser un número entero mayor que cero.", una venta negativa o decimal dice "Error: la cantidad debe ser un número entero mayor que cero." y una venta en numeros decimales dice "Error: la cantidad debe ser un número entero mayor que cero." Cuando intente con un libro repetido me dio "Error: «El jardín de los senderos» ya está en la venta; modificá la cantidad en su renglón." |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial. | Cuando hago eso dice "Venta V-003 confirmada para Matheo Prueba cliente. Total: $5000.00." |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado, en una copia de prueba del proyecto | Al consultar nuevamente el historial después de recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados. | Al cambiar el precio en el catalogo guardado el precio unitario, los subtotales y el total de esa venta conservan los valores anteriormente confirmados |
| 7 | Recarga después de altas y venta | Se recuperan datos sin duplicar ejemplos ni ventas. | Confirmado |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita. | Confirmado y funcionando correctamente |

## Procedencia de imágenes

El proyecto no usa imágenes ajenas ni de ningún otro tipo: no hay etiquetas de imagen en el HTML, no hay imágenes de fondo en el CSS y no hay archivos de imagen en el repositorio. Tampoco hay íconos ni fuentes externas (la tipografía es la del sistema). Si el equipo agrega capturas de pantalla como evidencia de los casos manuales, son capturas propias.

## Estructura de carpetas

```
index.html                     Página única con las cinco secciones
README.md                      Este archivo
css/
  base.css                     Variables, tipografía y base accesible
  layout.css                   Estructura y diseño adaptable
  componentes.css              Menú, formularios, tablas, botones y mensajes
js/
  datos.js                     Datos iniciales ficticios (modelo local)
  persistencia.js              Carga y guardado en localStorage
  catalogo.js                  Catálogo y búsqueda por título
  altas.js                     Alta y validación de libros y clientes
  ventas.js                    Venta simulada e historial
  libros.js, clientes.js       Sin uso (Ejercicio 4 original; no los carga index.html)
docs/
  Primer Parcial.pdf           Consigna del trabajo
  guia-pruebas-manuales.md     Guía paso a paso de los 8 casos manuales
  Prompts/                     Prompts usados en cada ejercicio
openspec/                      Especificaciones y cambios del proceso de trabajo (no se usan al ejecutar la página)
```

Las carpetas `.claude/`, `.opencode/` y `.engram/` son herramientas de trabajo del equipo y no se usan al ejecutar la página.

## Prompts usados

Los prompts de cada ejercicio están en `docs/Prompts/`:

- `Plantilla.md`: plantilla reutilizable de la que parten los prompts.
- `prompt1.md`: Ejercicio 1, estructura y pantallas HTML.
- `prompt2.md`: Ejercicio 2, presentación con CSS y uso adaptable.
- `prompt3.md`: Ejercicio 3, datos locales, catálogo y filtro.
- `prompt4.md`: Ejercicio 4, alta de libros y clientes.
- `prompt6.md`: Ejercicio 6, persistencia, verificación y documentación.

No hay un `prompt5.md` en el repositorio.
