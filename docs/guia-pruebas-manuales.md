# Guía de pruebas manuales — Ejercicio 6

Guía paso a paso para ejecutar a mano, en el navegador, los 8 casos manuales de la consigna (página 6 de `docs/Primer Parcial.pdf`) y anotar lo observado en la tabla del [README](../README.md#casos-manuales-y-resultados-observados).

Reglas para quien ejecuta los casos:

- Anotá lo que **realmente** viste. Si un caso falla o algo no se puede probar, escribí el comportamiento real en el README.
- No marques un caso como aprobado sin haberlo ejecutado. Mientras no lo ejecutes, la fila queda en `PENDIENTE`.
- Los datos de prueba son ficticios y están fijados en esta guía para que todos los equipos puedan repetir los casos.

## Preparación

1. Abrí `index.html` con doble clic (o arrastralo al navegador). Usá **una sola pestaña** del proyecto: dos pestañas abiertas a la vez se pisan al guardar.
2. Anotá el navegador y su versión (menú del navegador → «Acerca de…»). Se registra en el README en «Navegador y versión».
3. Abrí las herramientas del navegador con `F12`.
   - Chrome, Edge y Brave: pestaña **Application** → **Storage** → **Local Storage** → el origen de la página (`file://` si abriste el archivo con doble clic).
   - Firefox: pestaña **Almacenamiento** → **Almacenamiento local** → el origen de la página.
4. Empezá con el almacenamiento vacío: borrá las tres claves `lalibre.libros`, `lalibre.clientes` y `lalibre.ventas` (clic derecho sobre la clave → **Delete**) o pegá esto en la pestaña **Console**:

   ```js
   ["lalibre.libros", "lalibre.clientes", "lalibre.ventas"].forEach(function (k) { localStorage.removeItem(k); });
   ```

   Si el navegador te pide escribir `allow pasting` para pegar en la consola, escribilo y volvé a pegar.

   No uses `localStorage.clear()`: con `file://` algunos navegadores comparten el almacenamiento entre archivos locales y borrarías datos de otras páginas.
5. Recargá con `F5`. En el almacenamiento tienen que aparecer de nuevo las tres claves: `lalibre.libros` con 6 libros, `lalibre.clientes` con 3 clientes y `lalibre.ventas` con `[]`. La consola no debería mostrar errores.

Si en Application/Almacenamiento no ves un cambio hecho en la página, actualizá la vista de la tabla de claves (botón de refrescar) o volvé a hacer clic sobre el origen.

### Datos de prueba

Ninguno de los libros de ejemplo vale 1500 ni 2000, por eso la guía los crea en los casos 2 y 5 y los reutiliza en los casos 6 y 7.

| Uso | Título | ISBN | Precio | Editorial / Género / Autor |
| --- | --- | --- | --- | --- |
| Caso 2, ISBN existente | Libro duplicado de prueba | `978-999-000001-1` (y también `9789990000011`) | 1000 | cualquiera |
| Caso 2, ISBN nuevo (libro A) | Libro de prueba A | `978-999-000101-0` | 1500 | Sur Ejemplar / Novela / A. Ejemplo |
| Caso 5 (libro B) | Libro de prueba B | `978-999-000102-7` | 2000 | Cosmos Ficticio / Cuentos / B. Muestra |
| Casos 3 y 5 | Cliente de Prueba | `correo-invalido`, `ANA.EJEMPLO@FICTICIO.COM` y `cliente.prueba@ficticio.com` | — | — |

Los casos se ejecutan en orden: cada uno reutiliza lo que dejó el anterior (el caso 6 usa una copia aparte, ver más abajo).

## Caso 1 — Búsqueda en el catálogo

Consigna: búsqueda con una parte del título en mayúsculas; luego búsqueda vacía y texto inexistente.

Pasos:

1. En el menú, hacé clic en **Catálogo**.
2. En **Buscar por título** escribí `BREVE` (en mayúsculas) y hacé clic en **Buscar en catálogo** (o presioná `Enter` dentro del campo).
3. Mirá qué libros quedan: tienen que verse «Cuentos breves para tardes largas» y «Ensayos sobre el tiempo breve», aunque escribiste mayúsculas. El mensaje de abajo queda vacío.
4. Borrá el texto del campo y hacé clic en **Buscar en catálogo** con el campo vacío. Tiene que volver a verse el catálogo completo (6 libros) y ningún mensaje. También podés probar **Limpiar búsqueda**.
5. Escribí `xyz123` y hacé clic en **Buscar en catálogo**. No tiene que quedar ningún libro y el mensaje de abajo tiene que decir `No se encontraron libros para "xyz123".`

Resultado esperado (consigna): coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados.

Anotar en el README: cuántos libros y cuáles aparecieron con `BREVE`, cuántos con la búsqueda vacía y el mensaje exacto con `xyz123`.

## Caso 2 — Alta de libro con ISBN existente y con ISBN nuevo

Pasos:

1. En el menú, hacé clic en **Libros** y andá a **Alta de libro**.
2. ISBN existente: completá Título `Libro duplicado de prueba`, ISBN `978-999-000001-1`, Precio `1000`, elegí cualquier Editorial y Género y seleccioná al menos un autor (clic sobre un nombre de la lista **Autores**). Hacé clic en **Registrar libro**.
3. Debajo del listado de libros tiene que aparecer `El ISBN ya existe.` El listado sigue con 6 filas y, en `lalibre.libros`, el arreglo sigue con 6 elementos.
4. Repetí el paso 2 escribiendo el ISBN sin guiones, `9789990000011`. Tiene que aparecer el mismo mensaje y no se agrega nada.
5. (Opcional) Probá precio `0` con Título `Libro de precio cero` e ISBN `978-999-000199-0`. El navegador no tiene que mostrar su propio globo de validación y debajo del listado tiene que aparecer `El precio debe ser numérico mayor a 0.`
6. ISBN nuevo: completá Título `Libro de prueba A`, ISBN `978-999-000101-0`, Precio `1500`, Editorial **Sur Ejemplar**, Género **Novela** y Autores **A. Ejemplo**. Hacé clic en **Registrar libro**.
7. Tiene que aparecer `Libro registrado correctamente.` y el formulario se limpia.
8. Comprobá que el libro nuevo aparece en los tres lugares, sin recargar la página: en el listado de la sección **Libros** (fila 7), en el **Catálogo** (tarjeta «Libro de prueba A» con `Precio: $1500`) y en el selector **Libro** de la sección **Ventas** (opción `Libro de prueba A — $1500.00`).
9. En Application/Almacenamiento, `lalibre.libros` pasó a tener 7 elementos. `lalibre.clientes` y `lalibre.ventas` no cambiaron.

Resultado esperado (consigna): el duplicado se rechaza; el válido aparece en catálogo y selección de venta.

Anotar en el README: los mensajes de los pasos 3, 4 (y 5 si lo probaste), si el libro nuevo apareció en el listado, el catálogo y el selector de venta, y cuántos elementos tiene `lalibre.libros` antes y después.

## Caso 3 — Alta de cliente con email inválido, existente en mayúsculas y nuevo

Pasos:

1. En el menú, hacé clic en **Clientes** y andá a **Alta de cliente**.
2. Email inválido: Nombre completo `Cliente de Prueba`, Correo electrónico `correo-invalido`. Hacé clic en **Registrar cliente**.
3. El navegador no tiene que mostrar su propio globo de validación. Debajo del listado de clientes tiene que aparecer `El email no tiene un formato válido.` y el cliente no se agrega.
4. Email existente en mayúsculas: Nombre completo `Cliente de Prueba`, Correo electrónico `ANA.EJEMPLO@FICTICIO.COM`. Hacé clic en **Registrar cliente**.
5. Tiene que aparecer `El email ya existe.` El listado sigue con 3 filas (el duplicado no crea otro renglón) y `lalibre.clientes` sigue con 3 elementos.
6. Email nuevo: Nombre completo `Cliente de Prueba`, Correo electrónico `cliente.prueba@ficticio.com`. Hacé clic en **Registrar cliente**.
7. Tiene que aparecer `Cliente registrado correctamente.`. El listado pasa a 4 filas y «Cliente de Prueba» aparece en el selector **Cliente** de la sección **Ventas**, sin recargar.
8. En Application/Almacenamiento, `lalibre.clientes` pasó a tener 4 elementos.

Resultado esperado (consigna): se rechazan los dos primeros; el nuevo aparece en listado y selección.

Anotar en el README: los tres mensajes, la cantidad de filas del listado después de cada intento y si el cliente nuevo aparece en el selector de venta.

## Caso 4 — Venta sin cliente, cantidad cero, negativa o decimal, y libro repetido

Requiere haber hecho los casos 2 y 3 (existe el libro A y el cliente nuevo).

Pasos:

1. En el menú, hacé clic en **Ventas**.
2. En **Libro** elegí `Libro de prueba A — $1500.00`, en **Cantidad** escribí `0` y hacé clic en **Agregar renglón**. Tiene que aparecer `Error: la cantidad debe ser un número entero mayor que cero.` y la tabla de renglones sigue vacía.
3. Repetí con cantidad `-1` y luego con cantidad `1.5`. En los dos casos tiene que aparecer el mismo mensaje y no se agrega ningún renglón.
4. Escribí cantidad `2` y hacé clic en **Agregar renglón**. Tiene que aparecer `Renglón agregado: Libro de prueba A × 2.` y la tabla tiene un renglón.
5. Libro repetido: con el mismo libro elegido, escribí cantidad `1` y hacé clic en **Agregar renglón**. Tiene que aparecer `Error: «Libro de prueba A» ya está en la venta; modificá la cantidad en su renglón.` y la tabla sigue con un solo renglón.
6. Sin cliente: dejá **Cliente** en `Seleccioná un cliente` y hacé clic en **Confirmar venta**. Tiene que aparecer `Error: seleccioná un cliente antes de confirmar. La venta no se confirmó.` El historial sigue sin ventas.
7. (Opcional) Cantidad inválida dentro del renglón: cambiá la cantidad del renglón de la tabla a `0`, `-1` o `1.5`. El subtotal pasa a `Cantidad inválida` y en el resumen aparece `Error: hay cantidades inválidas; corregilas para calcular el total.` Si elegís un cliente y hacés clic en **Confirmar venta**, aparece `Error: la cantidad de «Libro de prueba A» debe ser un número entero mayor que cero. La venta no se confirmó.`
8. Hacé clic en **Cancelar venta**. Tiene que aparecer `Venta cancelada; el formulario quedó vacío.`
9. En Application/Almacenamiento, `lalibre.ventas` sigue siendo `[]`.

Resultado esperado (consigna): no se confirma; el duplicado no crea otro renglón.

Anotar en el README: el mensaje de cada intento (cantidad 0, -1, 1.5, libro repetido, sin cliente) y si en algún momento se confirmó una venta o se agregó un renglón de más.

## Caso 5 — Venta válida: dos unidades a 1500 y una a 2000

Pasos:

1. En **Libros** → **Alta de libro** registrá el libro B: Título `Libro de prueba B`, ISBN `978-999-000102-7`, Precio `2000`, Editorial **Cosmos Ficticio**, Género **Cuentos**, Autores **B. Muestra**. Tiene que aparecer `Libro registrado correctamente.`
2. En **Ventas** elegí **Cliente** `Cliente de Prueba`.
3. En **Libro** elegí `Libro de prueba A — $1500.00`, cantidad `2`, **Agregar renglón**.
4. En **Libro** elegí `Libro de prueba B — $2000.00`, cantidad `1`, **Agregar renglón**.
5. En la tabla de renglones, los subtotales tienen que ser `$3000.00` y `$2000.00`, y el resumen tiene que decir `Total: $5000.00 (2 renglones)`.
6. Hacé clic en **Confirmar venta**. Con el almacenamiento limpio al empezar, tiene que aparecer `Venta V-001 confirmada para Cliente de Prueba. Total: $5000.00.` y el formulario de venta se vacía.
7. En **Historial**, la tabla tiene que mostrar una fila `V-001` con total `$5000.00`. Hacé clic en **Ver detalle**: el foco pasa al título «Venta V-001» y el detalle muestra:
   - `Libro de prueba A`, `978-999-000101-0`, cantidad `2`, precio unitario `$1500.00`, subtotal `$3000.00`.
   - `Libro de prueba B`, `978-999-000102-7`, cantidad `1`, precio unitario `$2000.00`, subtotal `$2000.00`.
   - `Total: $5000.00`.
8. En Application/Almacenamiento, `lalibre.ventas` tiene 1 elemento con los renglones (`precioUnitario` y `subtotal`) y `total`.

Resultado esperado (consigna): subtotales 3000 y 2000; total 5000; detalle conservado en el historial.

Anotar en el README: los subtotales, el total, el identificador de la venta y los importes del detalle. Los vas a necesitar para comparar en el caso 6.

## Caso 6 — Precio histórico: cambio exclusivo del precio de catálogo guardado

Se hace en una **copia de prueba** del proyecto, como pide la consigna. Con `file://` algunos navegadores comparten el almacenamiento entre archivos locales, así que la copia podría ver (y pisar) los datos del proyecto original: por eso se usa una ventana privada u otro perfil.

Pasos:

1. Copiá la carpeta del proyecto (sin la carpeta `.git`) a otra ubicación, por ejemplo `copia-prueba`.
2. Abrí `copia-prueba/index.html` en una **ventana privada** (`Ctrl+Shift+N` en Chrome, Edge y Brave; `Ctrl+Shift+P` en Firefox) o con otro perfil del navegador. La ventana privada empieza con el almacenamiento vacío; si usás otro perfil, revisá y borrá las claves `lalibre.*` antes de empezar. Abrí `F12` en esa ventana.
3. En la copia repetí lo necesario para tener los mismos datos: el libro A (caso 2, pasos 6 y 7), el cliente `cliente.prueba@ficticio.com` (caso 3, paso 6), el libro B y la venta (caso 5, pasos 1 a 6). Anotá los importes confirmados: precios unitarios `$1500.00` y `$2000.00`, subtotales `$3000.00` y `$2000.00`, total `$5000.00`.
4. Cambiá **solamente** el `precio` del libro A de `1500` a `1800` dentro de `lalibre.libros`, por uno de estos dos caminos. No toques `lalibre.ventas`.

   **Camino A — editar el valor en las herramientas del navegador:**

   1. Application/Almacenamiento → Local Storage → origen de la página → clave `lalibre.libros`.
   2. Hacé doble clic sobre el valor (en Firefox, seleccioná la fila y editá el valor en el panel de abajo).
   3. Buscá el libro con `"isbn":"978-999-000101-0"`. El `precio` está al final de ese objeto: `"precio":1500`. Cambiá solo el número por `1800` y no borres comillas, comas ni llaves, porque el valor tiene que seguir siendo un JSON válido.
   4. Confirmá con `Enter`.

   **Camino B — por consola (más seguro, no hay que editar un texto largo):** pegá esto en la pestaña **Console** y presioná `Enter`:

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

   El ISBN se compara sin guiones ni espacios, igual que en el alta. Si la consola dice «No se encontró el libro A en esta ventana», el libro A no está registrado en esta ventana (la ventana privada tiene su propio almacenamiento): registralo como en el paso 3 y volvé a pegar el código. En ese caso no se modificó nada.

5. **Recargá enseguida con `F5`**, sin registrar libros, clientes ni ventas antes. Cualquier operación hecha en la página guarda de nuevo el arreglo que está en memoria, con el precio viejo, y pisaría tu edición.
6. En **Catálogo**, el libro A tiene que mostrar `Precio: $1800`.
7. En **Historial**, hacé clic en **Ver detalle** de la venta `V-001`. Tiene que conservar los valores confirmados: precios unitarios `$1500.00` y `$2000.00`, subtotales `$3000.00` y `$2000.00`, total `$5000.00`.
8. Cerrá la ventana privada (se borra el almacenamiento) o borrá las claves `lalibre.*` de la copia.

Resultado esperado (consigna): al consultar nuevamente el historial después de recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados.

Anotar en el README: qué camino usaste (A o B), el precio que mostró el catálogo después de recargar, los importes del detalle de `V-001` después de recargar y si coinciden con los del paso 3.

## Caso 7 — Recarga después de altas y venta

Se hace en el navegador y perfil donde ejecutaste los casos 1 a 5 (no en la copia del caso 6).

Pasos:

1. Contá lo que hay antes de recargar: el catálogo tiene que mostrar 8 libros (6 de ejemplo más A y B), el listado de clientes 4 filas y el historial 1 venta. Para ver la cantidad guardada pegá esto en la consola:

   ```js
   var claves = ["lalibre.libros", "lalibre.clientes", "lalibre.ventas"];
   claves.forEach(function (clave) { console.log(clave, JSON.parse(localStorage.getItem(clave)).length); });
   ```

   Tiene que mostrar `lalibre.libros 8`, `lalibre.clientes 4` y `lalibre.ventas 1`.
2. Recargá con `F5` y volvé a contar libros, clientes y ventas, en pantalla y con el comando de la consola.
3. Recargá una segunda vez y contá de nuevo. Los números tienen que ser los mismos: 8 libros, 4 clientes y 1 venta, sin ejemplos repetidos y sin ventas duplicadas.
4. (Opcional) Registrá un libro, un cliente y una venta más y comprobá que los identificadores continúan (`lib9`, `cli5`, `V-002`) sin repetir uno existente.

Resultado esperado (consigna): se recuperan datos sin duplicar ejemplos ni ventas.

Anotar en el README: las cantidades antes de recargar, después de la primera recarga y después de la segunda (libros, clientes y ventas).

## Caso 8 — Navegación por teclado y anchos de 320 px y 1280 px

Teclado:

1. Recargá la página y presioná `Tab` repetidamente desde el principio. Revisá que cada control (enlaces del menú, buscador y botones, campos y selectores de los formularios, botones de venta y de historial) muestre un contorno visible cuando tiene el foco, que el orden sea razonable y que el foco no quede atrapado. `Shift+Tab` tiene que volver hacia atrás.
2. Registrá un libro usando solo el teclado: pasá de campo en campo con `Tab`, cambiá los selectores con las flechas y enviá el formulario con `Enter` desde un campo de texto (por ejemplo, con un ISBN repetido para no sumar datos). Tiene que aparecer el mensaje de validación.
3. En **Ventas**, llegá con `Tab` hasta **Agregar renglón** y activalo con `Enter` o `Espacio`.
4. En **Historial**, llegá con `Tab` hasta **Ver detalle** y activalo con `Enter`. El foco tiene que pasar al título «Venta V-001» del detalle.

Anchos de pantalla:

5. Con las herramientas abiertas, activá el modo responsive con `Ctrl+Shift+M` (Chrome, Edge, Brave y Firefox) y elegí **Responsive**.
6. Fijá el ancho en **320 px** (alto 640 px). Recorré las cinco secciones. La página no tiene que desplazarse horizontalmente; las tablas (listados, renglones de venta, historial y detalle) pueden desplazarse dentro de su propio contenedor; el menú, los formularios y los botones tienen que poder usarse.
7. Fijá el ancho en **1280 px** (alto 800 px) y repetí el recorrido: no tiene que haber elementos cortados ni superpuestos.

Resultado esperado (consigna): foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita.

Anotar en el README: qué controles tuvieron foco visible o no, si algo quedó inalcanzable con el teclado y qué se vio a 320 px y a 1280 px (desplazamiento horizontal de la página, tablas, cortes).

## Capturas (opcional)

Si querés dejar evidencia, guardá capturas propias en `docs/capturas/` con el nombre `caso-N.png` (por ejemplo `docs/capturas/caso-5.png`) y enlazalas con un texto desde la columna «Resultado observado» de la tabla del README. La carpeta no existe todavía: se crea al agregar la primera captura.

- En el navegador: con las herramientas abiertas, `Ctrl+Shift+P` → escribir `Capture screenshot` (o `Capture full size screenshot`) y elegir la opción.
- En Windows: `Win+Shift+S` y guardar el recorte.

Las capturas tienen que ser del propio equipo y no incluir datos personales.

## Cómo anotar los resultados en el README

1. Abrí `README.md` en la sección «Casos manuales y resultados observados».
2. Reemplazá `PENDIENTE: ejecutar el caso en el navegador y anotar lo observado` de cada fila por lo que observaste, con los mensajes y las cantidades reales. Si un caso falló, escribí el comportamiento real.
3. Completá «Navegador y versión» y «Fecha de ejecución».
4. No marques como aprobado un caso que no ejecutaste: dejalo en `PENDIENTE`.

## Volver a los datos de ejemplo

Borrá solo las tres claves (clic derecho sobre cada una → **Delete**, o el comando del paso 4 de la preparación) y recargá con `F5`. Al volver a abrir, la página carga los ejemplos de `js/datos.js` y los guarda otra vez.
