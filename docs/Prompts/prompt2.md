# Prompt 2 — Ejercicio 2: Presentación con CSS y uso adaptable (para copiar/pegar en el orquestador active-stack)

> Copia desde `COPIAR DESDE AQUÍ` hasta `HASTA AQUÍ` y pégalo en el orquestador.

---

COPIAR DESDE AQUÍ

## Rol

Actuá como arquitecto frontend y analista de especificaciones SDD, con experiencia en CSS nativo adaptable y accesible (Flexbox/Grid, responsive sin frameworks, foco visible y estados por texto) y responsabilidad sobre la proposal, la spec delta, el design y las tasks del change, sin implementar código sin aprobación explícita.

## Metodología

- Metodología a utilizar: SDD con active-stack y OpenSpec (flujo OPSX: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`). Nombre del change: `ejercicio-2-presentacion-css`.
- Herramientas y convenciones: CLI `openspec` como única fuente de verdad del estado de artefactos; CSS nativo en archivos externos (ej. `css/base.css`, `css/layout.css`, `css/componentes.css` o un `css/estilos.css` justificado en `design.md`); reutilización de clases para elementos equivalentes (tarjetas, formularios, botones, mensajes, tablas); verificación manual abriendo `index.html` en navegador sin `npm`, a 320 px y 1280 px, más recorrido completo por teclado.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD/OpenSpec: SPEC = `proposal.md` + `specs/` delta + `design.md`; PLAN = `tasks.md`; IMPLEMENTACIÓN = `/opsx:apply` solo tras aprobación.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: TPI frontend de una librería — Ejercicio 2 Presentación CSS (`ejercicio-2-presentacion-css`).
- Propósito y usuarios: TPI de la materia Programación III, UTN. Frontend de librería con 5 vistas; esta entrega viste con CSS la estructura HTML ya existente del Ejercicio 1, con datos ficticios.
- Ubicación o repositorio: `C:\Users\Lautaro\OneDrive\Documentos\Proyectos\Parcial_1_Programacion`.
- Estado actual verificado: `index.html` existe con las 5 vistas del Ejercicio 1 como secciones de una misma página (SPA por anclas: `#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`), con `header`/`nav`/`main`/`section`/`footer`, formularios, tablas y contenedores de mensaje con `id` y `role="status"`. No existe carpeta `css/` ni hay `<link>` a hojas externas; no hay estilos propios aplicados. Spec previa: `openspec/specs/libreria-estructura-html/`.
- Fuentes de requisitos: `docs/Primer Parcial.pdf`, página 3: "Ejercicio 2 · 2. Presentación con CSS y uso adaptable" (20 puntos: coherencia y organización 8 + adaptación 8 + accesibilidad básica 4). Alcance técnico general del PDF: únicamente HTML, CSS y JavaScript nativos, recursos locales, sin librerías, frameworks ni CDNs de CSS/JS; sin API, base de datos, servidor, backend ni login real.
- Tecnologías y dependencias permitidas: UNICAMENTE CSS nativo en archivos externos vinculados desde el HTML, más los hooks mínimos de HTML estrictamente necesarios para aplicarlos (atributo `class`, `<link rel="stylesheet">`, y contenedor envolvente con `overflow-x: auto` para cada tabla que lo necesite). Reutilización de clases para elementos equivalentes.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS/JS (incluye Bootstrap, Tailwind o cualquier CDN); preprocesadores y herramientas de compilación; cambios semánticos o de contenido del HTML del Ejercicio 1; JavaScript funcional, render dinámico y filtro (Ejercicio 3); validaciones funcionales con `preventDefault` y actualización sin recarga (Ejercicio 4); cálculos, confirmación real e historial inmutable (Ejercicio 5); `localStorage`, README y casos manuales (Ejercicio 6).
- Punto de entrada o componente afectado: hojas externas en `css/` aplicadas sobre `index.html` y sus 5 vistas, sin romper la estructura del Ejercicio 1.
- Condiciones del entorno: verificación manual abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build; comprobación a 320 px y 1280 px de ancho.

## Alcance estricto

### Objetivo de esta entrega

Crear las especificaciones (proposal + spec delta + design + tasks) de UNICAMENTE el Ejercicio 2: identidad visual propia y coherente con CSS externo, layout con Flexbox o Grid, adaptación verificada a 320 px y 1280 px sin desplazamiento horizontal de la página, y accesibilidad básica (foco visible, teclado, errores con texto, `alt` correcto).

### Incluido

- Identidad visual propia y coherente (8 pts coherencia y organización): paleta de colores, tipografía del sistema (sin CDNs ni fuentes remotas), espaciado, tarjetas del catálogo, estilos de formularios, botones y tablas definidos una vez y reutilizados mediante clases (prohibido duplicar bloques equivalentes; prohibido estilo inline como mecanismo principal).
- Organización con Flexbox o Grid: layout de encabezado/navegación/contenido, grilla o flex de tarjetas del catálogo y de formularios; decisión documentada en `design.md` (Flexbox vs. Grid y dónde se usa cada uno).
- Adaptación 320 px y 1280 px (8 pts adaptación): textos y controles legibles en ambos anchos; la página completa NO genera desplazamiento horizontal; cada tabla que necesite más espacio se desplaza dentro de su propio contenedor (envolvente con `overflow-x: auto`, sin romper `thead`/`th`); catálogo, formularios, renglones de venta e historial se mantienen utilizables en ambos anchos.
- Accesibilidad básica (4 pts): foco visible preservado en todos los controles (prohibido `outline: none` sin reemplazo visible equivalente); recorrido completo con teclado sin trampas; mensajes de error/estado expresados con texto (no dependen únicamente del color, ej. icono + texto o prefijo textual); imágenes informativas con `alt` descriptivo y decorativas con `alt=""` sin repetir información.
- `specs/` delta pequeña y enfocada en una sola capability (ej. `specs/libreria-presentacion-css/spec.md`), con requerimientos SHALL claros y verificables manualmente en navegador a 320 px y 1280 px, sin `npm`.
- `design.md`: tokens de diseño (colores, tipografía, espaciado), mapa de clases reutilizables, estrategia Flexbox/Grid, estrategia de tablas con scroll propio y estrategia de foco/estados; justificación de la organización de archivos `css/`.

### Excluido

- Reestructuración semántica o de contenidos del Ejercicio 1 (no se rehacen vistas, campos, tablas ni textos; solo hooks mínimos: `class`, `<link>` y envolventes de scroll para tablas).
- Arrays/objetos JS, render dinámico, filtro funcional (Ejercicio 3).
- `preventDefault`, validaciones funcionales, actualización sin recarga (Ejercicio 4).
- Cálculo de subtotales/totales, confirmación real, historial inmutable (Ejercicio 5).
- `localStorage`, README, casos manuales (Ejercicio 6).

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | La identidad visual (colores, tipografía del sistema, espaciado, tarjetas, formularios, botones, tablas, mensajes) se aplica a las 5 vistas del `index.html` existente mediante CSS externo, con clases reutilizadas para elementos equivalentes y sin estilo inline como mecanismo principal. |
| R-02 | Estructura e interfaces | Existe al menos un archivo CSS externo vinculado con `<link rel="stylesheet">` (ej. `css/base.css`, `css/layout.css`, `css/componentes.css`); el layout usa Flexbox o Grid de forma documentada; cada tabla ancha queda envuelta en un contenedor con desplazamiento horizontal propio (`overflow-x: auto`) conservando `caption`/`thead`/`th scope` del Ejercicio 1. |
| R-03 | Datos y estados | Los estados del Ejercicio 1 (lista vacía, búsqueda sin resultados, operación correcta/rechazada, contenedores con `role="status"`) tienen estilo propio con texto legible; el error se distingue por texto además de color (no depende únicamente del color). |
| R-04 | Calidad | A 320 px y 1280 px: textos y controles legibles, sin desplazamiento horizontal de toda la página (verificado con scroll horizontal ausente a nivel `body`); tablas con scroll propio si lo necesitan; foco visible en cada control interactivo; recorrido completo por teclado sin trampas; imágenes informativas con `alt`, decorativas con `alt=""`. |
| R-05 | Compatibilidad | Verificable abriendo `index.html` en navegador, sin `npm`, sin servidor y sin build, a 320 px y 1280 px de ancho. Sin librerías, frameworks ni CDNs de CSS/JS. |
| R-06 | Convenciones | Convención de clases documentada en `design.md` (ej. `.tarjeta-libro`, `.formulario`, `.boton`, `.boton--primario`, `.mensaje`, `.mensaje--error`, `.tabla-contenedor`); nomenclatura coherente y reutilizable; archivos `css/` organizados según lo aprobado en `design.md`. |
| R-07 | Preparación futura, si aplica | Puntos de extensión permitidos únicamente como clases y contenedores que el JS futuro (Ejercicios 3–6) pueda reutilizar (estados, mensajes, filas dinámicas), sin implementar comportamiento futuro. |

Datos de ejemplo, si se necesitan: se reutilizan los datos estáticos ficticios ya presentes en `index.html` (incluyendo al menos 1 libro con texto literal «Sin clasificar»). No se agregan datos reales; todo ejemplo se identifica como ficticio.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución (verificar `index.html`, `openspec/specs/libreria-estructura-html/` y ausencia de `css/`).

Generá los artefactos del change `ejercicio-2-presentacion-css` (`openspec/changes/ejercicio-2-presentacion-css/proposal.md`, `specs/libreria-presentacion-css/spec.md` delta y `design.md`) con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (320 px con tabla ancha, 1280 px, foco por teclado, error solo-por-color como caso a evitar).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (tokens, clases, layout Flexbox/Grid, envolventes de tablas).
6. Estados y manejo de errores aplicables (estilo de mensajes con texto, no solo color).
7. Restricciones técnicas y convenciones que condicionan la solución (CSS externo, sin CDNs, sin cambios semánticos del Ejercicio 1).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-2-presentacion-css/tasks.md` con un checklist de tareas atómicas, solo CSS + hooks mínimos de HTML. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada (apertura en navegador a 320 px y 1280 px, ausencia de scroll horizontal de página, scroll propio de tablas, recorrido por teclado con foco visible; sin tareas de JS funcional).

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar (vía `/opsx:apply ejercicio-2-presentacion-css`).

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones de CSS nativo, clases reutilizables, Flexbox/Grid y convención de nombres aprobada en `design.md`; prohibido `outline: none` sin reemplazo visible, prohibido estilo inline como mecanismo principal, prohibido CDNs.
- Respetá verificación manual abriendo `index.html` en navegador a 320 px y 1280 px (sin scroll horizontal de página, tablas con scroll propio, foco visible, teclado completo); no se exigen tests con `npm`.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos en `css/` (más los hooks mínimos en `index.html`: `<link>`, `class` y envolventes `.tabla-contenedor` donde se aprobaron) junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Existe CSS externo vinculado y aplicado a las 5 vistas con identidad coherente y clases reutilizadas para tarjetas, formularios, botones, tablas y mensajes; sin estilo inline principal ni CDNs (cubre R-01, R-02, R-05, R-06).
- [ ] CA-02 — Layout con Flexbox o Grid según `design.md`; a 320 px y 1280 px no hay desplazamiento horizontal de toda la página y cada tabla ancha se desplaza dentro de su propio contenedor conservando encabezados (cubre R-02, R-04, R-05).
- [ ] CA-03 — Mensajes/estados con estilo legible donde el error se expresa con texto además de color; foco visible en todos los controles con recorrido por teclado sin trampas; `alt` correcto en imágenes (cubre R-03, R-04).
- [ ] CA-04 — Verificación manual ejecutada en navegador sin `npm` a 320 px y 1280 px con evidencia informada; estructura del Ejercicio 1 intacta salvo hooks mínimos aprobados (cubre R-04, R-05, R-06, R-07).
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

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá los documentos de especificación indicados (`proposal.md`, `spec.md` delta y `design.md` del change `ejercicio-2-presentacion-css`), presentalos para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.

HASTA AQUÍ
