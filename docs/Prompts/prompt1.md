# Prompt 1 — Ejercicio 1: Estructura y pantallas HTML (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en HTML5 semántico accesible y especificaciones verificables manualmente, y responsabilidad sobre la proposal, la spec delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-1-estructura-html`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; HTML5 semántico; convención de `id` estables (ej. `catalogo-lista`, `catalogo-busqueda`, `catalogo-mensaje`, `libros-form`, `libros-tabla`); verificación manual abriendo `index.html` en navegador sin `npm`.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería — Ejercicio 1 Estructura HTML (`ejercicio-1-estructura-html`).
- Propósito y usuarios: TPI de la materia Programación III, UTN. Frontend de librería con 5 vistas navegables y datos ficticios.
- Ubicación o repositorio: `C:\Users\Franco\OneDrive\Documents\UTN\Programacion\Maty\Pracial_1_Programacion`.
- Estado actual verificado: `index.html` está vacío. Carpetas `css/`, `js/`, `docs/`, `openspec/` ya creadas.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 2: "Ejercicio 1 · 1. Estructura y pantallas HTML" (20 puntos: 10 pts vistas y navegación + 10 pts semántica/formularios/estados).
- Tecnologías y dependencias permitidas: UNICAMENTE HTML, CSS y JavaScript nativos, sin librerías, frameworks ni CDNs de CSS/JS. Para esta entrega, solo HTML estático; CSS/JS futuro solo como `data-*` / `id` / contenedores preparados, sin lógica.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS; API, base de datos, servidor, backend y login real. En esta entrega además se excluye: CSS visual completo/responsive/Flexbox/Grid (Ejercicio 2), arrays/objetos JS, render dinámico y filtro funcional (Ejercicio 3), `preventDefault`, validaciones funcionales y actualización sin recarga (Ejercicio 4), cálculo de subtotales/totales, confirmación real e historial inmutable (Ejercicio 5), `localStorage`, README y casos manuales (Ejercicio 6).
- Punto de entrada o componente afectado: `index.html` (entrada del proyecto) y las 5 vistas del Ejercicio 1.
- Condiciones del entorno: verificación manual abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + spec delta + design + tasks) de UNICAMENTE el Ejercicio 1: estructura HTML estática y 5 vistas con navegación clara. Se permite varias páginas o secciones de una misma página, siempre que exista navegación clara.

### Incluido

- Estructura HTML y 5 vistas con navegación clara (`nav ul li a`, con `aria-current` o estado activo documentado):
  1. Catálogo: título de la librería, buscador por título (`input type="search"` con `label` asociado + botón con texto de acción, ej. "Buscar en catálogo" / "Limpiar búsqueda") y listado de libros (título, ISBN, editorial, género, autores y precio; si no tiene género asignado, texto literal «Sin clasificar»). Zona de mensaje para "búsqueda sin resultados".
  2. Libros: formulario de alta (título, ISBN, precio, editorial, género, autores — con `label for` en cada campo, tipos HTML correctos y botones "Registrar libro" / "Limpiar formulario") + listado en `table` con `thead`/`th` + mensaje de lista vacía.
  3. Clientes: formulario de alta (nombre completo, email — con `label for` y botones "Registrar cliente" / "Limpiar formulario") + listado en `table` con `thead`/`th` + mensaje de lista vacía.
  4. Ventas: selección de cliente (`select` con `label`), composición de renglones (selector de libro + cantidad + botón "Agregar renglón", tabla de renglones con columnas libro/cantidad/precio unitario/subtotal/acciones) y resumen (total + botones "Confirmar venta" / "Cancelar venta" + zona de mensajes de operación correcta o rechazada).
  5. Historial: listado de ventas en `table` (`thead` con identificador, fecha, cliente, total, detalle) + zona de detalle de venta + mensajes de lista vacía y de detalle.
- Requisitos transversales (10 pts semántica/formularios/estados): `header`, `nav`, `main`, `section`/`article`, `footer`; un solo `h1` (título librería), jerarquía `h2`/`h3` por vista; cada `input`/`select`/`textarea` con `label for` + `id`; cada `button` con texto que describe su acción (prohibido "Aceptar"/"Enviar" genérico); cada `table` con `caption` o encabezado asociado + `thead` + `th scope`; mensajes/estados como contenedores con `id` y `role="status"`/`aria-live` preparados para JS futuro; accesibilidad HTML básica (imágenes informativas con `alt`, decorativas con `alt=""`, foco por teclado sin trampas, sin `tabindex` positivo).
- `specs/` delta pequeña y enfocada en una sola capability (ej. `specs/libreria-estructura-html/spec.md`), con requerimientos SHALL claros y verificables manualmente abriendo `index.html` en navegador sin `npm`.
- `design.md`: decidir una sola opción (multi-página vs. SPA por secciones con anclas/nav) y justificar, definir mapa de vistas, esqueleto semántico y convención de `id`.

### Excluido

- CSS visual completo, responsive, Flexbox/Grid (Ejercicio 2).
- Arrays/objetos JS, render dinámico, filtro funcional (Ejercicio 3).
- `preventDefault`, validaciones funcionales, actualización sin recarga (Ejercicio 4).
- Cálculo de subtotales/totales, confirmación real, historial inmutable (Ejercicio 5).
- `localStorage`, README, casos manuales (Ejercicio 6).

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | Las 5 vistas (Catálogo, Libros, Clientes, Ventas, Historial) existen con los campos, listados, tablas y botones descriptivos listados en Incluido, y la navegación entre ellas no tiene páginas rotas. |
| R-02 | Estructura e interfaces | `header`, `nav` (`ul li a` con `aria-current` o estado activo), `main`, `section`/`article`, `footer`; un solo `h1`; jerarquía `h2`/`h3` por vista; cada `table` con `caption` o encabezado asociado + `thead` + `th scope`. |
| R-03 | Datos y estados | Listados e historial con datos estáticos de ejemplo; contenedores con `id` y `role="status"`/`aria-live` para lista vacía, búsqueda sin resultados, operación correcta y operación rechazada. |
| R-04 | Calidad | Cada `input`/`select`/`textarea` tiene `label for` + `id`; cada `button` tiene texto de acción específico; validador HTML sin errores en semántica, labels, botones y tablas; foco por teclado sin trampas (sin `tabindex` positivo); `alt` correcto en imágenes. |
| R-05 | Compatibilidad | Verificable abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build. |
| R-06 | Convenciones | Convención de `id` estables documentada en `design.md` (ej. `catalogo-lista`, `catalogo-busqueda`, `catalogo-mensaje`, `libros-form`, `libros-tabla`); estructura con campos e `id` listos para el JS futuro, solo como `data-*` / `id` / contenedores, sin lógica. |
| R-07 | Preparación futura, si aplica | Puntos de extensión permitidos únicamente como `data-*` / `id` / contenedores preparados para CSS del Ejercicio 2 y JS de los Ejercicios 3–6, sin implementar comportamiento futuro. |

Datos de ejemplo, si se necesitan: 2–3 libros de ejemplo, 2 clientes y 1–2 ventas, incluyendo al menos 1 libro con texto literal «Sin clasificar». Identificalos como ejemplos; no los presentes como datos reales.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución.

Generá los artefactos del change `ejercicio-1-estructura-html` (`openspec/changes/ejercicio-1-estructura-html/proposal.md`, `specs/libreria-estructura-html/spec.md` delta y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes.
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance.
6. Estados y manejo de errores aplicables.
7. Restricciones técnicas y convenciones que condicionan la solución.
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-1-estructura-html/tasks.md` con un checklist de tareas atómicas, solo HTML estático. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (apertura en navegador, sin tareas de CSS/JS funcionales).

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-1-estructura-html`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones de HTML5 semántico, labels asociados, botones descriptivos, tablas con encabezados y convención de `id` aprobada en `design.md`.
- Respetá verificación manual abriendo `index.html` en navegador más validador HTML sin errores; no se exigen tests con `npm`.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los cambios en `index.html` (y archivos HTML vinculados si el diseño multi-página lo aprobó) junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Existe `index.html` como entrada y navega a las 5 vistas sin páginas rotas (cubre R-01, R-05).
- [ ] CA-02 — Cada vista contiene los campos/listados/tablas descritos; tablas con `caption`/encabezado + `thead` + `th scope`; labels y botones descriptivos correctos (cubre R-01, R-02, R-04, R-06).
- [ ] CA-03 — Existen mensajes/placeholders para lista vacía, sin resultados, éxito y error como contenedores con `id` y `role="status"`/`aria-live`; datos estáticos de ejemplo presentes incluyendo «Sin clasificar» (cubre R-03).
- [ ] CA-04 — Validador HTML sin errores en etiquetas semánticas, labels asociados, botones descriptivos y tablas con encabezados; accesibilidad básica (`alt`, foco sin trampas) y verificación manual en navegador sin `npm` (cubre R-04, R-05).
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

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, `spec.md` delta y `design.md` del change `ejercicio-1-estructura-html`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
