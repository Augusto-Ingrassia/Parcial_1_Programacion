# Design

## Contexto

- Motivación y alcance: ver `proposal.md`. Requisitos: `specs/libreria-persistencia-documentacion/spec.md` y `specs/libreria-altas-validacion/spec.md`.
- `index.html` carga scripts globales y síncronos al final del `body`: `js/datos.js` → `js/catalogo.js` → `js/altas.js` → `js/ventas.js`. Cada uno termina con una función autoejecutable que dibuja (catálogo, listados, selectores, historial) leyendo las globales `libros`, `clientes` y `ventas` en el momento de la llamada.
- `js/datos.js` declara `var editoriales, generos, autores, libros, clientes, ventas = []`. Las únicas escrituras son `libros.push(libro)` en `altaLibro` y `clientes.push(cliente)` en `altaCliente` (`js/altas.js`), y `ventas.push(res.venta)` en `confirmarVenta` (`js/ventas.js`). No hay edición ni borrado.
- Los identificadores se calculan con el mayor sufijo existente (`lib7`, `cli4`, `V-001`), así que siguen funcionando con datos recuperados. Cada renglón de venta ya copia `titulo`, `isbn`, `precioUnitario` y `subtotal`.
- `js/libros.js` y `js/clientes.js` (Ejercicio 4) no se cargan: la implementación activa es `js/altas.js`.
- No hay imágenes: ni `<img>` en `index.html`, ni `url(` en `css/`, ni archivos de imagen en el repositorio (verificado con búsqueda).
- No hay ejecutor de pruebas (proyecto de navegador puro; la consigna prohíbe dependencias npm). La verificación es manual en el navegador.

## Objetivos / No objetivos

**Objetivos:** que la persistencia sea un archivo nuevo y tres llamadas de una línea en el código del equipo; que la comprobación guiada del precio histórico se pueda hacer editando una sola clave; que el README cubra la página 7 sin afirmar resultados no observados.

**No objetivos:** validar campo por campo los objetos guardados, migrar o versionar el formato, sincronizar varias pestañas abiertas a la vez, mostrar en la interfaz errores de almacenamiento, corregir detalles menores del código o del HTML del equipo.

## Decisiones

- **D-1 Orden de carga.** `<script src="js/persistencia.js">` va inmediatamente después de `js/datos.js` y antes de `js/catalogo.js`. Al ejecutarse reasigna `libros`, `clientes` y `ventas` antes de que cualquier otro script dibuje, así que no hace falta volver a renderizar nada. *Alternativa descartada:* cargarlo al final y volver a dibujar todo (doble render y dependencia de funciones internas de cada script).
- **D-2 Una clave por colección, con prefijo.** `lalibre.libros`, `lalibre.clientes`, `lalibre.ventas`, cada una con el arreglo tal cual (misma forma de objeto que `js/datos.js`, sin envoltorio ni versión). *Por qué:* la comprobación del docente modifica solo el precio de un libro sin tocar las ventas; con claves separadas eso es editar `lalibre.libros` y nada más. El prefijo identifica al proyecto y evita choques con otras páginas locales que compartan origen. *Alternativas descartadas:* una sola clave con `{ libros, clientes, ventas }` (editar el precio obliga a tocar el mismo texto que contiene las ventas); un envoltorio `{ version, datos }` (no hay migraciones previstas y complica la edición a mano).
- **D-3 Reemplazo, no combinación.** La clave ausente significa primer inicio: se usan los ejemplos de `js/datos.js` y se guardan. Si la clave existe y es válida, su arreglo reemplaza por completo a los ejemplos; `[]` es un estado válido (por ejemplo, sin ventas). Así nunca se duplican ejemplos ni ventas. *Alternativa descartada:* combinar por `id` (más lógica sin beneficio: no hay borrado ni edición que conciliar).
- **D-4 Datos corruptos: se usan los ejemplos y NO se sobrescribe al abrir.** `getItem` y `JSON.parse` van en `try/catch`; si el texto no es JSON o no es un arreglo (`Array.isArray`), esa colección usa los ejemplos en memoria y se emite `console.warn` con el nombre de la clave. El valor guardado queda intacto hasta la próxima operación correcta de esa colección, que guarda el arreglo en memoria (ejemplos + lo nuevo). *Por qué:* si al editar el precio en DevTools se rompe una comilla, el texto sigue ahí para corregirlo y recargar; sobrescribirlo al abrir borraría en silencio los libros agregados. *Costo:* la advertencia se repite en cada recarga hasta corregir o borrar la clave (el README lo explica). *Alternativas descartadas:* reescribir de inmediato con los ejemplos (destruye datos recuperables); avisar en la interfaz (fuera de alcance). Solo se valida que sea un arreglo: los objetos los escribe la propia aplicación y validar cada campo duplicaría las reglas de los Ejercicios 3 y 4.
- **D-5 Almacenamiento no disponible.** Leer la propiedad `localStorage` puede lanzar `SecurityError` (almacenamiento bloqueado) y `setItem` puede lanzar `QuotaExceededError`; todo acceso va dentro de `try/catch`. Si falla la lectura se usan los ejemplos; si falla un guardado, la operación queda en memoria. En ambos casos solo `console.warn`, sin romper la página.
- **D-6 Guardado explícito en cada escritura.** `js/persistencia.js` expone `guardarLibros()`, `guardarClientes()` y `guardarVentas()`, que guardan la colección completa. Se llaman justo después de cada `push`, con la guarda que ya usa el equipo (`if (typeof renderOpcionesVentaLibro === "function")`):

  ```js
  libros.push(libro);
  if (typeof guardarLibros === "function") guardarLibros();
  ```

  La guarda mantiene funcionando `js/altas.js` y `js/ventas.js` si `js/persistencia.js` no está cargado. Al ir antes del render, el dato queda guardado aunque falle algo del dibujo. *Alternativas descartadas:* envolver `altaLibro`/`confirmarVenta` desde `js/persistencia.js` (acoplamiento oculto, y además se carga antes de que existan); guardar en `beforeunload`/`pagehide` (poco confiable y, sobre todo, al recargar pisaría el precio editado en DevTools con el valor en memoria, invalidando la comprobación del precio histórico).
- **D-7 `novalidate` en `#libros-form` y `#clientes-form`.** Con la validación nativa, el navegador bloquea el envío de `correo-invalido` o de precio `0` con su propio globo y los mensajes del Ejercicio 4 nunca aparecen, mientras que el email existente en mayúsculas sí llega a JS: el caso manual 3 mostraría dos interfaces distintas. Se conservan `type="email"` y `type="number"` (teclado en móviles y requisito de `libreria-estructura-html`). *Alternativas descartadas:* cambiar los tipos a `text` (rompe la spec de estructura); dejar la validación nativa (mensajes inconsistentes).
- **D-8 Código sin uso.** `js/libros.js` y `js/clientes.js` no se borran ni se editan (trabajo de un compañero, forma parte del historial). El README indica que no se cargan y que la implementación activa es `js/altas.js`.
- **D-9 La guía de pruebas vive en `docs/guia-pruebas-manuales.md`.** El README conserva lo que la consigna exige que esté ahí: tabla de resultados, claves y estructura del catálogo guardado y un resumen de cómo editar solo el precio. El paso a paso de los 8 casos (datos exactos, clics, qué observar) es largo y taparía las secciones obligatorias; va en la guía, enlazada desde el README y desde la tabla. *Alternativa descartada:* todo en el README (demasiado largo para quien corrige).
- **D-10 Datos de prueba fijos.** Ningún ejemplo vale 1500 ni 2000, así que la guía los crea en los casos 2 y 5 y los reutiliza en 6 y 7:

  | Uso | Título | ISBN | Precio | Editorial / Género / Autor |
  | --- | --- | --- | --- | --- |
  | Caso 2 (duplicado) | Libro duplicado de prueba | `978-999-000001-1` (y `9789990000011`) | 1000 | cualquiera |
  | Caso 2 (válido) = libro A | Libro de prueba A | `978-999-000101-0` | 1500 | Sur Ejemplar / Novela / A. Ejemplo |
  | Caso 5 = libro B | Libro de prueba B | `978-999-000102-7` | 2000 | Cosmos Ficticio / Cuentos / B. Muestra |

  Otros datos: búsqueda `BREVE` (coincide con «Cuentos breves para tardes largas» y «Ensayos sobre el tiempo breve»), búsqueda vacía y `xyz123`; cliente «Cliente de Prueba» con `correo-invalido`, `ANA.EJEMPLO@FICTICIO.COM` y `cliente.prueba@ficticio.com`; venta del caso 5: libro A × 2 y libro B × 1 (subtotales $3000.00 y $2000.00, total $5000.00); caso 6: `precio` del libro A de 1500 a 1800.
- **D-11 Edición del precio guardado.** La guía da dos caminos: (a) DevTools → Application → Storage → Local Storage → origen de la página → clave `lalibre.libros` → doble clic en el valor y cambiar solo `"precio":1500` del libro con ISBN `978-999-000101-0` (en Firefox: Almacenamiento → Almacenamiento local); (b) la consola, más segura porque no hay que editar un JSON largo a mano:

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

  El ISBN se compara normalizado (sin guiones ni espacios, como `normalizarIsbn` en `js/altas.js`), porque el alta guarda el ISBN tal como se escribió; si no encuentra el libro, informa los ISBN guardados en vez de lanzar un `TypeError`.

  En ambos casos se recarga enseguida, sin hacer altas ni ventas en el medio (una operación en la página guardaría el arreglo en memoria, con el precio viejo).
- **D-12 Volver a los ejemplos.** Borrar solo las tres claves (DevTools → clic derecho → Delete, o `["lalibre.libros", "lalibre.clientes", "lalibre.ventas"].forEach(function (k) { localStorage.removeItem(k); });`) y recargar. No se recomienda `localStorage.clear()`: con `file://` algunos navegadores comparten el almacenamiento entre archivos locales y borraría datos de otras páginas.
- **D-13 Resultados honestos.** El README sale con «PENDIENTE: ejecutar el caso en el navegador y anotar lo observado» en cada fila, más «Navegador y versión: PENDIENTE» y «Fecha de ejecución: PENDIENTE». Ninguna comprobación automática que haga el agente durante el apply reemplaza ni completa esa columna; si falla un caso se anota el comportamiento real.
- **D-14 Integrantes.** Se toman del historial de Git (francosquillo → Ej. 1, Lautaro Mejias → Ej. 2, Augusto-Ingrassia → Ej. 3, Elias → Ej. 4, vegauriel2229 → Ej. 5, Matheo Bazan → Ej. 6) en una tabla con la columna «Nombre completo» marcada `PENDIENTE: confirmar`, sin inventar nombres.

## `js/persistencia.js`

Estilo del equipo: `var`, funciones simples, globales, comentarios en español.

| Elemento | Responsabilidad |
| --- | --- |
| `CLAVES_ALMACENAMIENTO` | `{ libros: "lalibre.libros", clientes: "lalibre.clientes", ventas: "lalibre.ventas" }` |
| `cargarColeccion(clave, ejemplos)` | Devuelve el arreglo guardado; si la clave no existe guarda `ejemplos` y los devuelve; si el acceso falla o el valor no es un arreglo JSON, `console.warn` y devuelve `ejemplos` sin escribir (D-3, D-4, D-5). |
| `guardarColeccion(clave, lista)` | `setItem(clave, JSON.stringify(lista))` dentro de `try/catch`; devuelve `true`/`false` y avisa en consola si falla. |
| `guardarLibros()`, `guardarClientes()`, `guardarVentas()` | Ganchos públicos que guardan la global correspondiente en el momento de la llamada (D-6). |
| `iniciarPersistencia()` (autoejecutable) | `libros = cargarColeccion(...)`, ídem `clientes` y `ventas`. |

Cambios mínimos en archivos del equipo: `index.html` (un `<script>` y dos `novalidate`); `js/altas.js` (dos llamadas con guarda + una línea de cabecera); `js/ventas.js` (una llamada con guarda; la cabecera «sin persistencia (Ej. 6)» pasa a apuntar a `js/persistencia.js`); `js/datos.js` (solo el comentario de cabecera: son valores iniciales que `js/persistencia.js` reemplaza). `js/catalogo.js` no cambia.

## Documentación

- **`README.md`** (raíz): presentación; integrantes (D-14); cómo abrir sin npm (doble clic o arrastrar `index.html`; servidor local opcional, aclarando que cambia el origen y por lo tanto el almacenamiento); navegación (una sola página con cinco secciones y enlaces de ancla en el menú); funcionalidades implementadas por ejercicio y pendientes o no incluidas (editar/eliminar, pantalla de precios, botón de reinicio, ABM de editoriales/géneros/autores; los `caption` y notas de las tablas siguen diciendo «de ejemplo» aunque muestran registros agregados; `js/libros.js` y `js/clientes.js` sin uso); datos iniciales en `js/datos.js`; `localStorage` (funcionamiento, claves, ejemplo JSON de un libro, límites: navegador, perfil, ubicación de apertura `file://` vs `http://localhost:<puerto>`, ventana privada, no se comparte entre usuarios ni equipos, no es seguridad ni cifrado, capacidad limitada según navegador, borrar datos del sitio lo elimina, qué pasa con datos corruptos); comprobación del precio histórico (resumen de D-11); volver a los ejemplos (D-12); tabla de casos manuales (D-13) con enlace a la guía; procedencia de imágenes (no se usan imágenes ajenas; si se agregan capturas propias en `docs/capturas/`, son del equipo); estructura de carpetas; prompts en `docs/Prompts/` (listar solo los archivos presentes).
- **`docs/guia-pruebas-manuales.md`**: preparación (abrir DevTools con F12, empezar con almacenamiento vacío borrando las tres claves, anotar navegador y versión); un apartado por caso con pasos numerados, datos de D-10, resultado esperado y qué anotar en el README; caso 6 en una copia del proyecto abierta en una ventana privada u otro perfil (con `file://` algunos navegadores comparten almacenamiento entre la copia y el original), con los dos caminos de D-11; caso 8 con Tab/Shift+Tab/Enter (foco visible con contorno, sin trampas, el foco salta al título del detalle tras «Ver detalle») y modo responsive (Ctrl+Shift+M, anchos 320 y 1280: sin scroll horizontal de la página, las tablas se desplazan dentro de su contenedor); capturas opcionales en `docs/capturas/caso-N.png` (DevTools: Ctrl+Shift+P → «Capture screenshot», o Win+Shift+S) referenciadas desde la tabla.
- **`docs/Prompts/prompt6.md`**: mismo formato que `prompt4.md` (encabezado, bloque «COPIAR DESDE AQUÍ … HASTA AQUÍ» y las secciones de `Plantilla.md` completas para el Ejercicio 6).

## Riesgos / Compromisos

- [Con `file://`, algunos navegadores comparten el almacenamiento entre archivos locales: la «copia de prueba» puede ver las claves del original] → la guía indica usar ventana privada u otro perfil para la copia, o revisar y borrar las claves antes de empezar; el prefijo evita choques con otros proyectos.
- [Una edición manual que deja JSON válido pero cambia la estructura (p. ej. borra `autorIds`) puede romper el listado de libros] → la guía pide cambiar solo el número de `precio` y ofrece el camino por consola; el README explica cómo volver a los ejemplos.
- [Editar en DevTools con la página abierta y luego hacer una operación pisa la edición] → la guía exige recargar inmediatamente después de editar.
- [Almacenamiento lleno o bloqueado: los datos no sobreviven a la recarga y solo se avisa en consola] → documentado en los límites del README; fuera de alcance mostrarlo en la interfaz.
- [Dos pestañas abiertas a la vez se pisan al guardar] → no se sincroniza (no objetivo); el README recomienda usar una sola pestaña.
- [Si cambian los ejemplos de `js/datos.js` no se ven mientras existan las claves] → procedimiento de D-12.
- [`docs/Prompts/prompt5.md` no existe en el repositorio] → el README lista solo los prompts presentes; no se inventa el faltante.
- [Los casos manuales no los ejecuta el agente] → quedan en PENDIENTE hasta que el equipo siga la guía (D-13).

## Vuelta atrás

Quitar la línea `<script src="js/persistencia.js">` desactiva la persistencia: las guardas `typeof` hacen que altas y ventas sigan funcionando en memoria. Los datos guardados se eliminan con D-12. No hay migración de datos: el primer inicio con este cambio guarda los ejemplos actuales.
