# Prompt 4 — Ejercicio 4: Alta de libros y clientes (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en JavaScript nativo (validación de formularios, preventDefault, render dinámico del DOM y actualización sin recarga) y responsabilidad sobre la proposal, la spec delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con active-stack y OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-4-altas-libros-clientes`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; JavaScript nativo sin librerías ni `fetch`; arrays y objetos con identificadores estables; inserción de datos de usuario como texto (`textContent`, prohibido `innerHTML` con datos de usuario); convención de `id` existentes (`libros-form`, `libros-tabla`, `libros-mensaje`, `clientes-form`, `clientes-tabla`, `clientes-mensaje`, `libro-editorial`, `libro-genero`, `libro-autores`, `venta-libro`, `venta-cliente`); verificación manual abriendo `index.html` en navegador sin `npm`.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería — Ejercicio 4 Alta de libros y clientes (`ejercicio-4-altas-libros-clientes`).
- Propósito y usuarios: TPI de la materia Programación III, UTN. Frontend de librería con 5 vistas; esta entrega implementa el alta de libros y clientes con validación funcional y actualización sin recarga.
- Ubicación o repositorio: `C:\Users\usuario\Desktop\repositorio,git hub\Parcial_1_Programacion`.
- Estado actual verificado: `index.html` existe con las 5 vistas del Ejercicio 1 como secciones de una misma página (SPA por anclas), con `header`/`nav`/`main`/`section`/`footer`, formularios de alta de libro (`libros-form`) y cliente (`clientes-form`), listados en tablas (`libros-tabla`, `clientes-tabla`) y contenedores de mensaje (`libros-mensaje`, `clientes-mensaje`). Carpeta `css/` existe con `base.css`, `layout.css`, `componentes.css` vinculados. Carpeta `js/` existe con `datos.js` (modelo local con libros, editoriales, géneros, autores, clientes) y `catalogo.js` (render + filtro del catálogo), cargados al final del body. Specs previas archivadas: `libreria-estructura-html`, `libreria-presentacion-css`, `libreria-datos-catalogo`.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 3: "Ejercicio 4 — 4. Alta de libros y clientes" (15 puntos). Alcance técnico general del PDF: únicamente HTML, CSS y JavaScript nativos, recursos locales, sin librerías, frameworks ni CDNs de CSS/JS; sin API, base de datos, servidor, backend ni login real.
- Tecnologías y dependencias permitidas: UNICAMENTE JavaScript nativo en archivos locales (ej. `js/libros.js`, `js/clientes.js` o un `js/app.js` justificado en `design.md`), más los hooks mínimos de HTML estrictamente necesarios para conectarlo (`<script src>` al final de `body`, `id` ya existentes, contenedores ya existentes). Arrays y objetos con identificadores estables; eventos (`submit`/`reset`/`change` según diseño) y funciones con responsabilidades reconocibles.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS; `fetch`, API, base de datos, servidor, backend y login real; administrar altas, bajas y modificaciones de editoriales, géneros o autores; cálculos de venta, confirmación real e historial inmutable (Ejercicio 5); `localStorage`, README y casos manuales (Ejercicio 6).
- Punto de entrada o componente afectado: formularios `libros-form` y `clientes-form`, listados `libros-tabla` y `clientes-tabla`, opciones de `venta-libro` y `venta-cliente`, y el modelo de datos en `js/datos.js`, sin romper la estructura de los Ejercicios 1–3.
- Condiciones del entorno: verificación manual abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + spec delta + design + tasks) de UNICAMENTE el Ejercicio 4: alta de libros y clientes con validación funcional, mensajes de error cerca del formulario, y actualización del listado y las opciones relacionadas sin recargar la página.

### Incluido

- Formulario de libros: registro de título, ISBN, precio y las relaciones con editorial, género y autores. Las opciones se generan a partir de los datos locales: editorial y género mediante selectores (`<select>`), y autores mediante un selector múltiple (`<select multiple>`) o controles de selección equivalentes. El selector de género incluye la opción «Sin clasificar», que representa la ausencia de género.
- Validaciones del libro: título no vacío; ISBN no vacío; ISBN no existente en el conjunto local (comparado sin espacios ni guiones); precio numérico y mayor que cero; editorial seleccionada existente en los datos locales; al menos un autor seleccionado y todos existentes en los datos locales; género opcional, y si se asigna, existente en los datos locales.
- Formulario de clientes: registro de nombre completo y email. No se requiere apellido separado.
- Validaciones del cliente: nombre completo no vacío; email no vacío; email con formato válido; email no existente en el conjunto local (comparado sin espacios exteriores y sin distinguir mayúsculas de minúsculas).
- Control del envío con `preventDefault`; mensajes de error cerca del formulario; solo se agrega el registro si todas las comprobaciones pasan.
- Tras un alta correcta: el listado (tabla) y las opciones relacionadas (selects de venta) se actualizan sin recargar la página.
- `specs/` delta enfocada en una sola capability (ej. `specs/libreria-altas-validacion/spec.md`), con requerimientos SHALL claros y verificables manualmente abriendo `index.html` en navegador sin `npm`.
- `design.md`: forma de los objetos e `id`, resolución de relaciones por `id`, organización de archivos `js/`, mapa de funciones y eventos, estrategia de mensajes/estados y actualización de opciones de venta.

### Excluido

- Reestructuración visual o semántica de los Ejercicios 1–3 (no se rehacen vistas, estilos ni layout; solo hooks mínimos: `<script>` y uso de `id`/contenedores existentes).
- Traer datos con `fetch` o administrar altas, bajas y modificaciones de editoriales, géneros o autores.
- Cálculo de subtotales/totales, confirmación real de venta e historial inmutable (Ejercicio 5).
- `localStorage`, README, casos manuales (Ejercicio 6).
- Edición o eliminación de registros (no exigida).

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | El formulario de libros permite registrar título, ISBN, precio, editorial, género (opcional con «Sin clasificar») y al menos un autor; las opciones de editorial, género y autores se generan desde los datos locales. |
| R-02 | Validación | Se valida título e ISBN no vacíos; ISBN no duplicado (sin espacios ni guiones); precio numérico > 0; editorial y autores seleccionados existentes; al menos un autor; género opcional y, si se asigna, existente. |
| R-03 | Funcional | El formulario de clientes permite registrar nombre completo y email, con validación de campos no vacíos, email con formato válido y email no duplicado (trim + case-insensitive). |
| R-04 | Comportamiento | El envío se controla con `preventDefault`; se muestran errores cerca del formulario; solo se agrega el registro si todas las validaciones pasan. |
| R-05 | Actualización | Tras un alta correcta, el listado (tabla) y las opciones relacionadas (selects de venta) se actualizan sin recargar la página. |
| R-06 | Calidad | La inserción de cualquier texto variable usa `textContent` (no `innerHTML` con datos); funciones acotadas con nombres comprensibles; sin `fetch` ni ABM de editoriales/géneros/autores. |
| R-07 | Compatibilidad | Verificable abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build. Sin librerías, frameworks ni CDNs de CSS/JS. |
| R-08 | Convenciones | Archivos en `js/` según `design.md` (ej. `js/libros.js` + `js/clientes.js`); uso de los `id` estables existentes sin renombrarlos salvo justificación aprobada; separación estructura (HTML) / comportamiento (JS). |

Datos de ejemplo, si se necesitan: se reutilizan los datos ficticios existentes del Ejercicio 3 (libros, editoriales, géneros, autores, clientes). Identificalos como ejemplos; no los presentes como datos reales.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución (verificar `index.html` con sus `id` de formularios/listados/opciones, `js/datos.js`, `js/catalogo.js`, y specs archivadas).

Generá los artefactos del change `ejercicio-4-altas-libros-clientes` (`openspec/changes/ejercicio-4-altas-libros-clientes/proposal.md`, `specs/libreria-altas-validacion/spec.md` delta y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (ISBN duplicado con/ sin espacios/guiones, email duplicado case-insensitive, género sin asignar, sin autores, precio inválido, email inválido).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (forma de objetos, `id`, resolución de relaciones, funciones y eventos).
6. Estados y manejo de errores aplicables (mensajes de validación, éxito, listado actualizado).
7. Restricciones técnicas y convenciones que condicionan la solución (JS nativo, `preventDefault`, `textContent`, `id` existentes, sin ABM de catálogos auxiliares).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-4-altas-libros-clientes/tasks.md` con un checklist de tareas atómicas, solo alta de libros y clientes. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (apertura en navegador: alta válida actualiza listado/opciones; casos inválidos muestran error y no agregan).

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-4-altas-libros-clientes`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones de JS nativo, `id` estables, funciones acotadas, `preventDefault`, `textContent` para datos variables y convención aprobada en `design.md`.
- Respetá verificación manual abriendo `index.html` en navegador (alta válida actualiza listado/opciones sin recarga; casos inválidos muestran error y no agregan); no se exigen tests con `npm`.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos en `js/` (más los hooks mínimos en `index.html`: `<script>` y uso de contenedores/`id` aprobados) junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — El formulario de libros genera opciones desde datos locales y registra un libro válido, actualizando el listado y las opciones de venta sin recargar (cubre R-01, R-04, R-05).
- [ ] CA-02 — Las validaciones de libro rechazan los casos inválidos con mensaje cerca del formulario y no agregan el registro (cubre R-02, R-04, R-06).
- [ ] CA-03 — El formulario de clientes registra un cliente válido y rechaza duplicados case-insensitive y emails inválidos, actualizando el listado/opciones sin recargar (cubre R-03, R-04, R-05).
- [ ] CA-04 — Verificación manual ejecutada en navegador sin `npm` con evidencia informada; sin `fetch`, sin ABM de editoriales/géneros/autores, sin ventas/persistencia y estructura de Ejercicios 1–3 intacta salvo hooks mínimos (cubre R-06, R-07, R-08).
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

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, `spec.md` delta y `design.md` del change `ejercicio-4-altas-libros-clientes`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
