# Prompt 5 — Ejercicio 5: Venta simulada e historial (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en JavaScript nativo (composición dinámica de tablas en el DOM, cálculos de importes, validación de entradas numéricas y manejo de eventos) y responsabilidad sobre la proposal, la spec delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con active-stack y OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-5-venta-historial`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; JavaScript nativo sin librerías ni `fetch`; arrays y objetos con identificadores estables; inserción de datos de usuario como texto (`textContent`, prohibido `innerHTML` con datos de usuario); convención de `id` existentes (`venta-cliente`, `venta-libro`, `venta-cantidad`, `venta-agregar`, `ventas-renglones`, `ventas-total`, `ventas-confirmar`, `ventas-cancelar`, `ventas-mensaje`, `historial-tabla`, `historial-mensaje`, `historial-detalle`, `historial-detalle-mensaje`); verificación manual abriendo `index.html` en navegador sin `npm`.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería — Ejercicio 5 Venta simulada e historial (`ejercicio-5-venta-historial`).
- Propósito y usuarios: TPI de la materia Programación III, UTN. Frontend de librería con 5 vistas; esta entrega implementa la composición y confirmación de una venta simulada y su consulta en un historial de solo lectura.
- Ubicación o repositorio: `C:\Users\usuario\Desktop\repositorio,git hub\Parcial_1_Programacion`.
- Estado actual verificado: `index.html` existe con las 5 vistas del Ejercicio 1 como secciones de una misma página (SPA por anclas). La vista `#vista-ventas` tiene selectores `venta-cliente` y `venta-libro`, campo `venta-cantidad`, botón `venta-agregar`, tabla `ventas-renglones`, resumen `ventas-total` y botones `ventas-confirmar`/`ventas-cancelar`, todavía con datos estáticos de ejemplo. La vista `#vista-historial` tiene la tabla `historial-tabla` y el contenedor `historial-detalle` con ejemplos estáticos. Carpeta `css/` con `base.css`, `layout.css`, `componentes.css` (incluye `.mensaje--error`, `.mensaje--exito`, `.tabla-contenedor`). Carpeta `js/` con `datos.js` (modelo local), `catalogo.js` (render + filtro) y `altas.js` (alta y validación de libros y clientes, actualiza `venta-cliente`). Specs previas archivadas: `libreria-estructura-html`, `libreria-presentacion-css`, `libreria-datos-catalogo`, `libreria-altas-validacion`.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 5: "Ejercicio 5 — 5. Venta simulada e historial" (20 puntos), y página 6: casos manuales del Ejercicio 6 relacionados con ventas (solo como referencia de comportamiento esperado). Alcance técnico general del PDF: únicamente HTML, CSS y JavaScript nativos, recursos locales, sin librerías, frameworks ni CDNs de CSS/JS; sin API, base de datos, servidor, backend ni login real. La venta registra cantidades y precios para obtener un total simulado, sin gestionar stock, cobros ni facturación fiscal.
- Tecnologías y dependencias permitidas: UNICAMENTE JavaScript nativo en archivos locales (ej. `js/ventas.js`, justificado en `design.md`), más los hooks mínimos de HTML estrictamente necesarios para conectarlo (`<script src>` al final de `body`, `id` ya existentes, contenedores ya existentes, eliminación de los ejemplos estáticos de ventas e historial). Arrays y objetos con identificadores estables; eventos (`click`/`input`/`change` según diseño) y funciones con responsabilidades reconocibles.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS; `fetch`, API, base de datos, servidor, backend y login real; stock, cobros y facturación fiscal; edición o eliminación de ventas confirmadas; `localStorage`, README y casos manuales documentados (Ejercicio 6).
- Punto de entrada o componente afectado: vistas `#vista-ventas` y `#vista-historial`, selectores `venta-cliente` y `venta-libro`, y el modelo de datos en `js/datos.js`, sin romper la estructura de los Ejercicios 1–4.
- Condiciones del entorno: verificación manual abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + spec delta + design + tasks) de UNICAMENTE el Ejercicio 5: composición de una venta simulada con renglones, cálculo de subtotales y total, confirmación con precio unitario histórico e historial de solo lectura con acceso al detalle.

### Incluido

- Selección de un cliente existente desde `venta-cliente` (opciones generadas desde los datos locales, con un estado "sin cliente" que permita detectar la ausencia de selección).
- Agregado de renglones con un libro existente (`venta-libro`, opciones generadas desde `libros` y actualizadas tras un alta de libro) y una cantidad entera mayor que cero.
- Libros repetidos dentro de la misma venta: se modifica la cantidad del renglón existente o se informa el duplicado (la decisión se documenta en `design.md`); en ningún caso se crea otro renglón.
- Antes de confirmar: cambiar cantidades y quitar renglones.
- Cada renglón muestra libro, cantidad, precio unitario y subtotal. Subtotal = cantidad × precio; total = suma de subtotales; importes con dos decimales.
- Impedir la confirmación sin cliente, sin renglones o con cantidades inválidas (cero, negativas, decimales o vacías), con mensaje de error en texto.
- Al confirmar: registrar identificador, fecha, cliente, renglones y total. El precio unitario se copia al renglón como valor histórico (no se vuelve a leer del catálogo al consultar el historial) y se conservan los datos descriptivos necesarios para leer la venta (título del libro, nombre del cliente).
- La confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado.
- Historial: muestra identificador, fecha, cliente y total, y permite consultar los renglones de cada venta. Mensaje para historial vacío.
- `specs/` delta enfocada en una sola capability (ej. `specs/libreria-ventas-historial/spec.md`), con requerimientos SHALL claros y verificables manualmente abriendo `index.html` en navegador sin `npm`.
- `design.md`: forma de los objetos de la venta en curso y de la venta confirmada, formato del identificador y de la fecha, estrategia de cálculo de importes (evitar errores de coma flotante), organización de archivos `js/`, mapa de funciones y eventos, y estrategia de mensajes/estados.

### Excluido

- Reestructuración visual o semántica de los Ejercicios 1–4 (no se rehacen vistas, estilos ni layout; solo hooks mínimos: `<script>`, uso de `id`/contenedores existentes y retiro de los ejemplos estáticos de ventas e historial).
- Edición o eliminación de ventas confirmadas desde la interfaz.
- Gestión de stock, cobros o facturación fiscal.
- `localStorage`, persistencia entre recargas, README y registro de casos manuales (Ejercicio 6).
- Pantalla para editar precios del catálogo (no exigida).

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | Se selecciona un cliente existente y se agregan renglones con un libro existente y una cantidad entera > 0; las opciones de cliente y libro se generan desde los datos locales y se actualizan tras las altas. |
| R-02 | Validación | Un libro repetido no crea otro renglón (se suma la cantidad o se informa el duplicado); las cantidades cero, negativas, decimales o vacías se rechazan con mensaje en texto. |
| R-03 | Funcional | Antes de confirmar se pueden cambiar cantidades y quitar renglones, con subtotales y total recalculados sin recargar. |
| R-04 | Cálculo | Cada renglón muestra libro, cantidad, precio unitario y subtotal (cantidad × precio); el total es la suma de subtotales; los importes se presentan con dos decimales. |
| R-05 | Validación | Se impide confirmar una venta sin cliente, sin renglones o con cantidades inválidas, mostrando el motivo cerca del formulario. |
| R-06 | Confirmación | Al confirmar se registra identificador, fecha, cliente, renglones (con precio unitario copiado como valor histórico y datos descriptivos) y total; se limpia el formulario y se muestra un mensaje de resultado. |
| R-07 | Historial | El historial muestra identificador, fecha, cliente y total, permite consultar los renglones desde los datos guardados y no ofrece editar ni eliminar ventas. |
| R-08 | Calidad | La inserción de cualquier texto variable usa `textContent` (no `innerHTML` con datos); funciones acotadas con nombres comprensibles; mensajes de error expresados con texto, no solo con color. |
| R-09 | Compatibilidad | Verificable abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build. Sin librerías, frameworks ni CDNs de CSS/JS. |
| R-10 | Convenciones | Archivos en `js/` según `design.md` (ej. `js/ventas.js`); uso de los `id` estables existentes sin renombrarlos salvo justificación aprobada; separación estructura (HTML) / estilos (CSS) / comportamiento (JS). |

Datos de ejemplo, si se necesitan: se reutilizan los datos ficticios existentes de los Ejercicios 3 y 4 (libros y clientes). El historial arranca vacío; las ventas se crean desde la interfaz. Identificalos como ejemplos; no los presentes como datos reales.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución (verificar `index.html` con sus `id` de ventas e historial, `js/datos.js`, `js/catalogo.js`, `js/altas.js`, y specs archivadas).

Generá los artefactos del change `ejercicio-5-venta-historial` (`openspec/changes/ejercicio-5-venta-historial/proposal.md`, `specs/libreria-ventas-historial/spec.md` delta y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (venta sin cliente, sin renglones, cantidad cero/negativa/decimal/vacía, libro repetido, cantidad editada inválida, venta válida de dos unidades a 1500 y una a 2000 con subtotales 3000 y 2000 y total 5000, cambio posterior del precio del catálogo que no altera el historial).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (forma de la venta en curso y de la venta confirmada, identificador, fecha, funciones y eventos).
6. Estados y manejo de errores aplicables (renglones vacíos, historial vacío, cantidad inválida, duplicado, confirmación rechazada, confirmación exitosa).
7. Restricciones técnicas y convenciones que condicionan la solución (JS nativo, `textContent`, `id` existentes, precio histórico, sin edición ni eliminación de ventas, sin persistencia).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta (por ejemplo: sumar cantidad o informar duplicado ante un libro repetido).

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-5-venta-historial/tasks.md` con un checklist de tareas atómicas, solo venta simulada e historial. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (apertura en navegador: venta válida calcula subtotales/total y aparece en el historial; casos inválidos muestran error y no confirman; el detalle conserva los precios confirmados).

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-5-venta-historial`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones de JS nativo, `id` estables, funciones acotadas, `textContent` para datos variables y convención aprobada en `design.md`.
- Respetá verificación manual abriendo `index.html` en navegador (venta válida con cálculos correctos y registro en historial; casos inválidos muestran error y no confirman; detalle con precios históricos); no se exigen tests con `npm`.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos en `js/` (más los hooks mínimos en `index.html`: `<script>`, uso de contenedores/`id` aprobados y retiro de los ejemplos estáticos) junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Se compone una venta con cliente existente y renglones de libros existentes con cantidades enteras > 0; un libro repetido no crea otro renglón; se pueden cambiar cantidades y quitar renglones (cubre R-01, R-02, R-03).
- [ ] CA-02 — Subtotales, total y formato con dos decimales son correctos; el caso de dos unidades a 1500 y una a 2000 da subtotales 3000.00 y 2000.00 y total 5000.00 (cubre R-04).
- [ ] CA-03 — No se confirma sin cliente, sin renglones o con cantidades inválidas; la confirmación válida registra la venta con precio histórico, limpia el formulario y muestra el resultado (cubre R-05, R-06).
- [ ] CA-04 — El historial lista identificador, fecha, cliente y total, muestra el detalle desde los datos guardados, conserva los importes si cambia el precio del catálogo y no permite editar ni eliminar (cubre R-07).
- [ ] CA-05 — Verificación manual ejecutada en navegador sin `npm` con evidencia informada; sin `innerHTML` con datos, sin persistencia ni stock, y estructura de Ejercicios 1–4 intacta salvo hooks mínimos (cubre R-08, R-09, R-10).
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

## Instrucción de inicio

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, `spec.md` delta y `design.md` del change `ejercicio-5-venta-historial`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
