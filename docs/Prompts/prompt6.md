# Prompt 6 — Ejercicio 6: Persistencia, verificación y documentación (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en JavaScript nativo (`localStorage`, serialización JSON, robustez ante datos corruptos o almacenamiento no disponible), verificación manual de interfaces y documentación técnica de entrega, y responsabilidad sobre la proposal, las specs delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con active-stack y OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-6-persistencia-documentacion`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; JavaScript nativo sin librerías ni `fetch`, en el estilo del equipo (`var`, funciones simples, globales, comentarios en español); datos de usuario insertados como texto (`textContent`); verificación manual abriendo `index.html` en el navegador sin `npm`. Las comprobaciones técnicas del agente (scripts, navegador sin interfaz) solo pueden vivir fuera del repositorio y no reemplazan los casos manuales del equipo.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería («la libre») — Ejercicio 6 Persistencia, verificación y documentación (`ejercicio-6-persistencia-documentacion`).
- Propósito y usuarios: TPI de la materia Programación III, Tecnicatura Universitaria en Programación a Distancia. Cierre del trabajo: conservar libros, clientes y ventas entre aperturas de la página, dejar registrados los casos manuales y entregar la documentación (`README.md`).
- Ubicación o repositorio: `E:\Parcial1Programacion\Parcial_1_Programacion`.
- Estado actual verificado: `index.html` carga `js/datos.js`, `js/catalogo.js`, `js/altas.js` y `js/ventas.js` (en ese orden) al final del `body`, con las cinco vistas del Ejercicio 1 como secciones de una misma página. `js/datos.js` declara `editoriales`, `generos`, `autores`, `libros` (6), `clientes` (3) y `ventas` (vacía). Las únicas escrituras a esas listas son `libros.push` en `altaLibro` y `clientes.push` en `altaCliente` (`js/altas.js`) y `ventas.push` en `confirmarVenta` (`js/ventas.js`). Los identificadores se calculan con el mayor sufijo existente (`lib7`, `cli4`, `V-001`) y cada renglón de venta copia título, ISBN, precio unitario y subtotal. No existe `localStorage`, `README.md`, guía de pruebas ni `docs/Prompts/prompt6.md`. `js/libros.js` y `js/clientes.js` (Ejercicio 4) no se cargan. Specs previas archivadas o vigentes: `libreria-estructura-html`, `libreria-presentacion-css`, `libreria-datos-catalogo`, `libreria-altas-validacion`, `libreria-ventas-historial`.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 6 («Ejercicio 6 — Persistencia, verificación y documentación», 10 puntos, con los 8 casos manuales y la comprobación del precio histórico) y página 7 («Criterios de evaluación» y «Formato de entrega», con el contenido del README). Alcance técnico general del PDF: únicamente HTML, CSS y JavaScript nativos, recursos locales, sin librerías, frameworks ni CDNs; sin API, base de datos, servidor, backend ni login real.
- Tecnologías y dependencias permitidas: UNICAMENTE JavaScript nativo (`localStorage`, `JSON`) en archivos locales, más los hooks mínimos de HTML estrictamente necesarios (`<script src>` y atributos de formulario). Documentación en Markdown.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS; `fetch`, API, base de datos, servidor, backend y login real; `npm` y herramientas de compilación o de prueba dentro del repositorio.
- Punto de entrada o componente afectado: archivo nuevo `js/persistencia.js` cargado entre `js/datos.js` y `js/catalogo.js`; cambios mínimos en `index.html`, `js/altas.js`, `js/ventas.js` y, solo en comentarios, `js/datos.js`; archivos nuevos `README.md`, `docs/guia-pruebas-manuales.md` y `docs/Prompts/prompt6.md`.
- Nombres completos de los integrantes del equipo: {{DATO_PENDIENTE: confirmar los nombres completos; hasta entonces solo se usan los usuarios del historial de Git}}.
- Condiciones del entorno: verificación manual abriendo `index.html` en el navegador con doble clic (`file://`), sin `npm`, sin servidor y sin build.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + specs delta + design + tasks) de UNICAMENTE el Ejercicio 6: persistencia de libros, clientes y ventas en `localStorage` sin duplicar los datos de ejemplo, README de entrega con los contenidos de la página 7, guía paso a paso de los 8 casos manuales y registro honesto de sus resultados (pendientes hasta que el equipo los ejecute).

### Incluido

- `js/persistencia.js`: primer inicio con los ejemplos de `js/datos.js`; inicios siguientes con lo guardado reemplazando a los ejemplos (nunca combinándolos); una clave por colección con prefijo del proyecto (`lalibre.libros`, `lalibre.clientes`, `lalibre.ventas`); guardado explícito después de cada alta correcta y de cada venta confirmada; comportamiento seguro ante `localStorage` bloqueado, valores que no son JSON o que no son un arreglo.
- Atributo `novalidate` en `#libros-form` y `#clientes-form` para que siempre se vean los mensajes de validación del Ejercicio 4.
- `README.md` en la raíz, en español: integrantes (datos no verificados marcados como pendientes), pasos para abrir `index.html` sin `npm`, navegación entre vistas, funcionalidades implementadas y pendientes, ubicación de los datos iniciales, funcionamiento y límites de `localStorage` (navegador, perfil, ubicación de apertura, sin compartir entre usuarios), nombres exactos de las claves y estructura JSON del catálogo guardado con el procedimiento para modificar solo un precio, cómo volver a los ejemplos, tabla de los 8 casos manuales con «Resultado observado» pendiente, y procedencia de imágenes.
- `docs/guia-pruebas-manuales.md`: preparación, datos de prueba fijos, pasos de los 8 casos (incluida la edición del precio guardado con las herramientas del navegador, la navegación por teclado y los anchos de 320 px y 1280 px) y qué anotar en el README.
- `docs/Prompts/prompt6.md` con el formato de `docs/Prompts/prompt4.md` y las secciones de `docs/Prompts/Plantilla.md`.
- `specs/` delta: capability nueva `libreria-persistencia-documentacion` y modificación de `libreria-altas-validacion` (el requisito sobre persistencia y el nuevo requisito de mensajes propios de validación).
- `design.md`: orden de carga, claves y estructura guardada, reemplazo en lugar de combinación, manejo de datos corruptos y de almacenamiento no disponible, puntos de guardado, `novalidate`, datos de prueba y procedimiento de edición del precio.

### Excluido

- Editar o eliminar registros, pantalla para editar precios, botón de reinicio de datos, alta/baja/modificación de editoriales, géneros o autores, sincronización entre pestañas y errores de almacenamiento mostrados en la interfaz.
- Refactorizar o reescribir el código de los Ejercicios 1–5 más allá de los hooks mínimos (una llamada de guardado con guarda `typeof` por camino de escritura, comentarios de cabecera y `novalidate`). No se borran ni se modifican `js/catalogo.js`, `js/libros.js`, `js/clientes.js` ni `css/`.
- Inventar nombres de integrantes, resultados de casos manuales o evidencias no obtenidas; marcar un caso como ejecutado sin que el equipo lo haya ejecutado.
- Imágenes ajenas, librerías de pruebas, `npm` y archivos de configuración de herramientas dentro del repositorio.

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | Primer inicio: se usan los ejemplos de `js/datos.js` y se guardan. Inicios siguientes: lo guardado reemplaza por completo a los ejemplos, sin duplicar ejemplos ni ventas, y los identificadores (`lib…`, `cli…`, `V-…`) continúan sin repetirse. |
| R-02 | Estructura e interfaces | Exactamente tres claves, `lalibre.libros`, `lalibre.clientes` y `lalibre.ventas`, cada una con un arreglo JSON de objetos con los campos de `js/datos.js` (catálogo y ventas en claves separadas). Editoriales, géneros y autores no se guardan. |
| R-03 | Datos y estados | Se guarda la colección completa después de cada alta correcta y de cada venta confirmada; una operación rechazada o la apertura de la página no modifican lo guardado. Si `localStorage` no está disponible o un valor no es JSON o no es un arreglo, se usan los ejemplos de esa colección, la página sigue funcionando y se avisa en la consola; el valor inválido no se sobrescribe al abrir. |
| R-04 | Calidad | Las ventas guardadas conservan título, ISBN, precio unitario, subtotales y total; si cambia solo el precio de un libro en `lalibre.libros`, el detalle de una venta anterior sigue mostrando los valores confirmados después de recargar. Los formularios de alta muestran siempre sus propios mensajes (`novalidate`) y conservan `type="email"` y `type="number"`. |
| R-05 | Compatibilidad | Funciona abriendo `index.html` con doble clic (`file://`) en un navegador que permita `localStorage`; sin librerías, CDNs, `npm`, servidor ni `fetch`. |
| R-06 | Convenciones | Estilo ES5 del equipo (`var`, funciones simples, globales), comentarios y documentos en español, guarda `typeof … === "function"` en cada llamada de guardado, cambios mínimos en archivos del equipo y orden de scripts `datos` → `persistencia` → `catalogo` → `altas` → `ventas`. |
| R-07 | Documentación | `README.md` con todos los contenidos de la página 7; tabla de los 8 casos manuales con su resultado esperado y «Resultado observado» pendiente (no aprobado hasta ejecutarse); guía enlazada desde el README; procedencia de imágenes (o constancia de que no se usan). |
| R-08 | Prompt | `docs/Prompts/prompt6.md` con las secciones de la plantilla completas para este ejercicio. |

Datos de ejemplo, si se necesitan: se reutilizan los datos ficticios existentes (6 libros, 3 clientes) y los datos de prueba que fije el `design.md` (por ejemplo, dos libros nuevos de 1500 y 2000 para la venta del caso 5, porque ningún ejemplo vale esos precios). Identificalos como ejemplos; no los presentes como datos reales.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución (verificar `index.html` y el orden de sus scripts, `js/datos.js`, los puntos de escritura en `js/altas.js` y `js/ventas.js`, las specs vigentes y las páginas 6 y 7 de `docs/Primer Parcial.pdf`).

Generá los artefactos del change `ejercicio-6-persistencia-documentacion` (`openspec/changes/ejercicio-6-persistencia-documentacion/proposal.md`, `specs/libreria-persistencia-documentacion/spec.md` y `specs/libreria-altas-validacion/spec.md` delta, y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (primer inicio, recarga repetida, identificadores que continúan, valor guardado corrupto o que no es arreglo, almacenamiento bloqueado, operación rechazada que no modifica lo guardado, cambio exclusivo del precio guardado).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (claves, forma de lo guardado, funciones de `js/persistencia.js`, puntos de guardado, orden de carga, estructura del README y de la guía).
6. Estados y manejo de errores aplicables (almacenamiento no disponible, valor inválido, guardado fallido).
7. Restricciones técnicas y convenciones que condicionan la solución (JS nativo, estilo del equipo, cambios mínimos, `file://`, sin dependencias).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-6-persistencia-documentacion/tasks.md` con un checklist de tareas atómicas, solo persistencia, documentación y registro de casos manuales. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (sintaxis, `git diff` acotado, búsquedas de textos, comprobaciones del agente fuera del repositorio; apertura en navegador para lo que corresponda).

Separá con claridad las tareas del agente de las tareas que solo puede hacer el equipo (ejecutar los 8 casos en un navegador y completar «Resultado observado», confirmar los nombres completos), que el agente no marca como hechas. Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-6-persistencia-documentacion`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá el estilo del equipo (`var`, funciones simples, globales, comentarios en español), `try/catch` en todo acceso a `localStorage` y a `JSON.parse`, `Array.isArray` para validar lo leído y cambios mínimos en los archivos de los Ejercicios 1–5.
- Respetá la verificación manual abriendo `index.html` en el navegador; no se exigen tests con `npm` y no se agregan al repositorio. Las comprobaciones técnicas del agente (scripts de prueba, navegador sin interfaz) se hacen sobre una copia fuera del repositorio y se informan aparte; no completan ni reemplazan la columna «Resultado observado» del README.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos nuevos (`js/persistencia.js`, `README.md`, `docs/guia-pruebas-manuales.md`, `docs/Prompts/prompt6.md`) y los cambios mínimos en `index.html`, `js/altas.js`, `js/ventas.js` y `js/datos.js`, junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Al abrir por primera vez la página se ven los ejemplos y quedan guardadas las tres claves; después de registrar un libro, un cliente y una venta y recargar una o más veces, todo se muestra una sola vez y los identificadores continúan (cubre R-01, R-02, R-03).
- [ ] CA-02 — Una alta o una venta rechazada no modifica lo guardado; un valor guardado corrupto o que no es un arreglo, o un `localStorage` bloqueado, deja la página funcionando con los ejemplos y con una advertencia en la consola (cubre R-03, R-05).
- [ ] CA-03 — Tras cambiar solo el `precio` de un libro dentro de `lalibre.libros` y recargar, el catálogo muestra el precio nuevo y el detalle de la venta anterior conserva los importes confirmados; los formularios muestran siempre sus mensajes propios (cubre R-04).
- [ ] CA-04 — El README contiene todo lo que pide la página 7 y la tabla de los 8 casos con «Resultado observado» pendiente; la guía permite ejecutar cada caso sin consultar el código; este prompt tiene las secciones de la plantilla; sin librerías, `npm`, servidor ni imágenes ajenas (cubre R-05, R-06, R-07, R-08).
- [ ] Se cubre todo el alcance aprobado y no se incorpora trabajo excluido.
- [ ] Se respetan las tecnologías, dependencias y convenciones permitidas.
- [ ] Las comprobaciones exigidas se ejecutaron y sus resultados se informan con evidencia.
- [ ] Se distinguen los controles aprobados, fallidos, omitidos y pendientes; ningún control no ejecutado se presenta como aprobado.
- [ ] Los supuestos, placeholders pendientes y limitaciones quedan identificados.

## Restricciones anti-alucinación

- No inventes requisitos, funcionalidades, archivos existentes, APIs, contratos, credenciales, datos reales ni resultados de comprobaciones.
- Diferenciá los hechos verificados, los supuestos y las propuestas. Atribuí los hechos a las fuentes consultadas cuando corresponda.
- Si falta un dato no bloqueante, usá `{{DATO_PENDIENTE: descripción}}` y declaralo como pendiente. No lo reemplaces con un valor que parezca real.
- Si el dato faltante afecta el alcance, una decisión esencial o la validez de la solución, preguntá antes de avanzar con el trabajo afectado.
- No afirmes haber leído una fuente, ejecutado una herramienta o validado un resultado si no ocurrió. Si no tenés acceso, informalo.
- Usá datos ficticios solo cuando estén autorizados y señalalos como ejemplos.
- Ante requisitos contradictorios, señalá la contradicción y pedí una decisión; no elijas silenciosamente.
- No declares completa la entrega si quedan criterios sin verificar. Enumerá los pendientes y sus motivos.
- No completes la columna «Resultado observado» de los casos manuales ni los nombres completos de los integrantes con valores supuestos: quedan pendientes hasta que el equipo los ejecute o los confirme.

## Instrucción de inicio

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, las `spec.md` delta y `design.md` del change `ejercicio-6-persistencia-documentacion`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
