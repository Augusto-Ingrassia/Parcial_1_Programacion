# Prompt 3 — Ejercicio 3: Datos locales, catálogo y filtro (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en JavaScript nativo (modelo de datos locales, render dinámico del DOM, eventos y filtrado de listados) y responsabilidad sobre la proposal, la spec delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con active-stack y OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-3-datos-catalogo`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; JavaScript nativo sin librerías ni `fetch`; arrays y objetos con identificadores estables; inserción de datos de usuario como texto (`textContent`, prohibido `innerHTML` con datos de usuario); convención de `id` existentes (`catalogo-lista`, `catalogo-busqueda`, `catalogo-buscar`, `catalogo-limpiar`, `catalogo-mensaje`); verificación manual abriendo `index.html` en navegador sin `npm`.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería — Ejercicio 3 Datos locales, catálogo y filtro (`ejercicio-3-datos-catalogo`).
- Propósito y usuarios: TPI de la materia Programación III, UTN. Frontend de librería con 5 vistas; esta entrega conecta la vista Catálogo con datos locales en JS y le da filtrado por título, con datos ficticios.
- Ubicación o repositorio: `C:\Users\ingra\Documents\Trabajos Utn\Tercer Semestre\Programacio III\Torres\Parcial 1`.
- Estado actual verificado: `index.html` existe con las 5 vistas del Ejercicio 1 como secciones de una misma página (SPA por anclas: `#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`), con `header`/`nav`/`main`/`section`/`footer`, buscador (`catalogo-busqueda` + botones `catalogo-buscar` / `catalogo-limpiar`), contenedor `catalogo-lista` con 3 libros estáticos de ejemplo y contenedor `catalogo-mensaje` con `role="status"`. Carpeta `css/` existe con `base.css`, `layout.css`, `componentes.css` vinculados. No existe carpeta `js/` ni hay `<script>` con lógica de datos. Specs previas archivadas: `openspec/specs/libreria-estructura-html/` y `openspec/specs/libreria-presentacion-css/`.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 3: "Ejercicio 3 · 3. Datos locales, catálogo y filtro" (15 puntos: modelo y ejemplos 5 + renderizado 5 + filtro y estados 5). Alcance técnico general del PDF: únicamente HTML, CSS y JavaScript nativos, recursos locales, sin librerías, frameworks ni CDNs de CSS/JS; sin API, base de datos, servidor, backend ni login real. Detalle de Catálogo del Ejercicio 1 aplicable aquí: cada libro muestra título, ISBN, editorial, género, autores y precio; si no tiene género asignado, texto literal «Sin clasificar».
- Tecnologías y dependencias permitidas: UNICAMENTE JavaScript nativo en archivos locales (ej. `js/datos.js`, `js/catalogo.js` o un `js/app.js` justificado en `design.md`), más los hooks mínimos de HTML estrictamente necesarios para conectarlo (`<script src>` al final de `body`, `id` ya existentes, contenedores ya existentes). Arrays y objetos con identificadores estables; eventos (`input`/`click`/`submit` según diseño) y funciones con responsabilidades reconocibles.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS; `fetch`, API, base de datos, servidor, backend y login real; administrar altas, bajas y modificaciones de editoriales, géneros o autores; validaciones funcionales de alta con `preventDefault` y actualización sin recarga (Ejercicio 4); cálculos de venta, confirmación real e historial inmutable (Ejercicio 5); `localStorage`, README y casos manuales (Ejercicio 6).
- Punto de entrada o componente afectado: modelo de datos en `js/` y render + filtro del Catálogo sobre `index.html` (`catalogo-lista`, `catalogo-busqueda`, `catalogo-mensaje`), sin romper la estructura de los Ejercicios 1–2.
- Condiciones del entorno: verificación manual abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + spec delta + design + tasks) de UNICAMENTE el Ejercicio 3: modelo local con ejemplos mínimos, render dinámico del catálogo desde el array de libros y filtro por título con trim + case-insensitive + coincidencia parcial, con estados vacío/sin resultados.

### Incluido

- Modelo local con identificadores estables (5 pts modelo y ejemplos): `arrays` + objetos para libros, editoriales, géneros, autores y clientes; conjunto inicial mínimo con al menos seis libros, dos editoriales, dos géneros, tres autores y tres clientes ficticios; cada libro relacionado con una editorial existente y uno o más autores existentes; género opcional y, si se asigna, correspondiente a un género existente; al menos un libro sin género para mostrar «Sin clasificar».
- Render dinámico del catálogo (5 pts renderizado): JavaScript genera el catálogo a partir del array de libros en `catalogo-lista`; cada tarjeta/fila muestra título, ISBN, editorial (nombre resuelto desde su `id`), género (nombre resuelto o texto literal «Sin clasificar») , autores (nombres resueltos) y precio; los datos escritos por usuarios se insertan como texto en el DOM (`textContent`, prohibido `innerHTML` con datos variables).
- Filtro por título y estados (5 pts filtro y estados): ignora diferencias entre mayúsculas y minúsculas, busca coincidencias parciales y elimina espacios sobrantes en los extremos (`trim` + normalización a minúsculas + `includes`); búsqueda vacía muestra todo el catálogo; búsqueda sin coincidencias muestra un mensaje claro en `catalogo-mensaje` (y vacía/limpia la lista visible); eventos cableados a `catalogo-busqueda` / `catalogo-buscar` / `catalogo-limpiar` con funciones de responsabilidad reconocible (ej. `normalizarBusqueda`, `filtrarPorTitulo`, `renderCatalogo`, `mostrarMensajeCatalogo`).
- `specs/` delta pequeña y enfocada en una sola capability (ej. `specs/libreria-datos-catalogo/spec.md`), con requerimientos SHALL claros y verificables manualmente abriendo `index.html` en navegador sin `npm`.
- `design.md`: forma de los objetos e `id` (ej. `ed1`, `gen1`, `aut1`, `lib1`, `cli1`), resolución de relaciones por `id`, organización de archivos `js/`, mapa de funciones y eventos, y estrategia de mensajes/estados.

### Excluido

- Reestructuración visual o semántica de los Ejercicios 1–2 (no se rehacen vistas, estilos ni layout; solo hooks mínimos: `<script>` y uso de `id`/contenedores existentes).
- Traer datos con `fetch` o administrar altas, bajas y modificaciones de editoriales, géneros o autores.
- Alta de libros y clientes con `preventDefault`, validaciones funcionales y actualización sin recarga (Ejercicio 4).
- Cálculo de subtotales/totales, confirmación real de venta e historial inmutable (Ejercicio 5).
- `localStorage`, README, casos manuales (Ejercicio 6).

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | Existen `arrays` de libros, editoriales, géneros, autores y clientes con `id` estables; el conjunto inicial trae ≥6 libros, ≥2 editoriales, ≥2 géneros, ≥3 autores y ≥3 clientes ficticios; cada libro referencia una editorial existente y ≥1 autor existente; todo género asignado existe; al menos un libro queda sin género. |
| R-02 | Estructura e interfaces | El catálogo se genera desde el array de libros en `catalogo-lista`; cada ítem muestra título, ISBN, editorial, género (o «Sin clasificar»), autores y precio; el filtro reacciona a `catalogo-busqueda` / `catalogo-buscar` / `catalogo-limpiar` con funciones separadas por responsabilidad. |
| R-03 | Datos y estados | Búsqueda vacía (vacía o solo espacios) muestra todo el catálogo; búsqueda sin coincidencias vacía la lista y muestra mensaje claro en `catalogo-mensaje`; los ejemplos se identifican como ficticios; no se presentan datos reales. |
| R-04 | Calidad | La normalización es `trim` + minúsculas + coincidencia parcial (`includes`); la inserción de cualquier texto variable usa `textContent` (no `innerHTML` con datos); funciones acotadas con nombres comprensibles; sin `fetch` y sin ABM de editoriales/géneros/autores. |
| R-05 | Compatibilidad | Verificable abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build. Sin librerías, frameworks ni CDNs de CSS/JS. |
| R-06 | Convenciones | Archivos en `js/` según `design.md` (ej. `js/datos.js` + `js/catalogo.js`); uso de los `id` estables existentes sin renombrarlos salvo justificación aprobada; separación estructura (HTML) / comportamiento (JS). |
| R-07 | Preparación futura, si aplica | Puntos de extensión permitidos únicamente como `id` y funciones exportables que los Ejercicios 4–6 puedan reutilizar (listados, opciones, precios), sin implementar altas, ventas ni persistencia. |

Datos de ejemplo, si se necesitan: el conjunto mínimo del R-01, ficticio, con al menos 1 libro con género asignado y 1 libro sin género («Sin clasificar»), y títulos que permitan probar coincidencia parcial y case-insensitive. Identificalos como ejemplos; no los presentes como datos reales.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución (verificar `index.html` con sus `id` de catálogo, `css/`, ausencia de `js/`, y specs `libreria-estructura-html` y `libreria-presentacion-css`).

Generá los artefactos del change `ejercicio-3-datos-catalogo` (`openspec/changes/ejercicio-3-datos-catalogo/proposal.md`, `specs/libreria-datos-catalogo/spec.md` delta y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (búsqueda vacía, solo espacios, mayúsculas/minúsculas, parcial, sin coincidencias, libro sin género).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (forma de objetos, `id`, resolución de relaciones, funciones y eventos).
6. Estados y manejo de errores aplicables (lista llena, vacía por filtro, mensaje claro).
7. Restricciones técnicas y convenciones que condicionan la solución (JS nativo, sin `fetch`, `textContent`, `id` existentes, sin ABM de catálogos auxiliares).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-3-datos-catalogo/tasks.md` con un checklist de tareas atómicas, solo modelo + render + filtro. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (apertura en navegador: catálogo generado desde datos; pruebas de filtro vacía/parcial/mayúsculas/espacios/sin coincidencias; sin tareas de altas, ventas o persistencia).

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-3-datos-catalogo`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones de JS nativo, `id` estables, funciones acotadas, `textContent` para datos variables y convención aprobada en `design.md`.
- Respetá verificación manual abriendo `index.html` en navegador (catálogo renderizado + filtro: vacía muestra todo, parcial case-insensitive filtra, sin coincidencias muestra mensaje); no se exigen tests con `npm`.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos en `js/` (más los hooks mínimos en `index.html`: `<script>` y uso de contenedores/`id` aprobados) junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Existe el modelo local con cantidades y relaciones del R-01, con género opcional y al menos un «Sin clasificar» (cubre R-01).
- [ ] CA-02 — El catálogo se genera desde datos y cada libro muestra título, ISBN, editorial, género/autores resueltos y precio, insertando texto con `textContent` (cubre R-02, R-04, R-06).
- [ ] CA-03 — El filtro hace `trim` + case-insensitive + parcial; vacía muestra todo y sin coincidencias muestra mensaje claro en `catalogo-mensaje` (cubre R-02, R-03, R-04).
- [ ] CA-04 — Verificación manual ejecutada en navegador sin `npm` con evidencia informada; sin `fetch`, sin ABM de editoriales/géneros/autores, sin altas/ventas/persistencia y estructura de Ejercicios 1–2 intacta salvo hooks mínimos (cubre R-04, R-05, R-06, R-07).
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

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, `spec.md` delta y `design.md` del change `ejercicio-3-datos-catalogo`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
