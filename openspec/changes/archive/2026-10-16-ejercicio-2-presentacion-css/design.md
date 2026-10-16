# Design — ejercicio-2-presentacion-css

## Context

Verificado por lectura directa (hechos, no supuestos):

- `index.html` (256 líneas): SPA por anclas con 5 `section` (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`), `header/nav/main/section/footer`, formularios (`libros-form`, `clientes-form`), 4 `table` con `caption`+`thead`+`th scope` (`libros-tabla`, `clientes-tabla`, `ventas-renglones`, `historial-tabla`), contenedores `role="status"`. Sin `<link rel="stylesheet">` (búsqueda `Select-String` sin matches). Ver `proposal.md` — Why para motivación.
- `css/` no existe (`Test-Path` = False).
- Spec previa `openspec/specs/libreria-estructura-html/spec.md`: 12 requisitos de estructura; este change no los modifica.
- Fuente normativa: `docs/Primer Parcial.pdf` p.3 Ejercicio 2 (20 pts: coherencia 8 + adaptación 8 + accesibilidad 4) + p.7 criterios.
- `openspec/config.yaml`: `schema: spec-driven`.
- Restricción dura: solo CSS nativo externo + hooks mínimos HTML (`class`, `<link>`, envolvente `overflow-x:auto` por tabla). Prohibido: frameworks/CDNs, `outline:none` sin reemplazo visible, `style` inline como mecanismo principal.

## Goals / Non-Goals

**Goals:**

- G-1 Identidad visual coherente y reutilizable (cubre R-01, R-07; criterio coherencia 8 pts).
- G-2 Layout adaptable Flexbox/Grid verificable a 320px/1280px sin scroll horizontal del `body` (cubre R-02, R-04; criterio adaptación 8 pts).
- G-3 Accesibilidad CSS: foco visible, estados por texto, `alt`/`role="status"` preservados (cubre R-03, R-05; criterio accesibilidad 4 pts).
- G-4 Trazabilidad total requisito → clase → verificación manual sin npm (cubre R-06; CA-01..CA-04).

**Non-Goals:**

- Cambios semánticos o de contenido del Ejercicio 1; JS funcional/render/filtro (Ej.3); `preventDefault`/validaciones (Ej.4); cálculos/historial inmutable (Ej.5); `localStorage`/README/casos manuales (Ej.6). Todo comportamiento queda fuera de esta fase y de la implementación de este change.

## Decisions

### D-1 Tres archivos CSS: `css/base.css` + `css/layout.css` + `css/componentes.css`

Qué: tokens y reset mínimo en `base.css`; grillas/layout de página y vistas en `layout.css`; componentes reutilizables en `componentes.css`. `index.html` vincula los tres con `<link>` en ese orden (cascada predecible).
Por qué sobre alternativa única `css/estilos.css`: separa tokens, estructura y componentes, facilita corrección por criterio (coherencia vs adaptación) y reutilización; costo aceptable (3 peticiones `file://` locales, sin build).
Rechazado: un solo archivo (mezcla responsabilidades), preprocesadores o frameworks (excluidos por consigna).

### D-2 Tokens en `:root` (`base.css`)

```css
:root {
  --color-fondo: {{DATO_PENDIENTE: paleta exacta a elegir por el usuario — propuesta inicial fondo claro cálido + acento borgoña librería}};
  --color-texto: {{DATO_PENDIENTE: par de contraste ≥ 4.5:1 a confirmar}};
  --color-acento: {{DATO_PENDIENTE: idem}};
  --color-error: {{DATO_PENDIENTE: rojo que NUNCA va solo — siempre con texto/borde}};
  --fuente-base: system-ui, -apple-system, "Segoe UI", sans-serif;
  --espaciado-s: 0.5rem; --espaciado-m: 1rem; --espaciado-l: 2rem;
  --ancho-max: 72rem;
}
```

Contraste AA Sil (4.5:1 texto normal) verificado manualmente con herramienta del navegador; si un par no llega, se oscurece el texto antes de tocar el fondo.

### D-3 Convención de clases BEM-ish reutilizables

`.bloque`, `.bloque--modificador`, `.bloque__elemento` solo cuando el anidamiento lo exige. Catálogo mínimo (trazable a R-01/R-07):

- Layout: `.contenedor`, `.vista`, `.grilla-catalogo`, `.grupo-formulario`, `.barra-acciones`.
- Componentes: `.tarjeta-libro` (cada `article` del catálogo), `.formulario` (ambos `form`), `.campo` + `.campo__etiqueta` + `.campo__control` (par label+control), `.boton` + `.boton--primario` (confirmar/registrar) + `.boton--peligro` (cancelar/quitar, siempre con texto), `.mensaje` + `.mensaje--error` + `.mensaje--exito` (contenedores `role="status"`), `.tabla-contenedor` (envolvente por tabla), `.tabla` (estilos de `table`), `.navegacion` + `.navegacion__enlace--activo`.
- Regla: elementos equivalentes comparten clase; prohibido crear variantes de un solo uso sin justificar en revisión.

### D-4 Layout: Grid para página + Flexbox para grupos, documentado

- `body` → Grid de una columna con `.contenedor { max-width: var(--ancho-max); margin-inline: auto; padding-inline: var(--espaciado-m); }`.
- `nav ul` → Flexbox con `flex-wrap: wrap; gap`.
- `#catalogo-lista` → Grid auto-fill `minmax(16rem, 1fr)` a 1280px, una columna a 320px (media query `min-width: 48rem`).
- Formularios → Flexbox columna con `gap`; `.barra-acciones` Flexbox wrap para botones.
- Justificación: Grid para composición bidimensional (catálogo, página), Flexbox para filas/grupos unidimensionales. Media queries `min-width` (mobile-first desde 320px).

### D-5 Tablas: envolvente `.tabla-contenedor` por tabla, sin tocar semántica

```html
<div class="tabla-contenedor"><table class="tabla" id="libros-tabla">…</table></div>
```

CSS: `.tabla-contenedor { overflow-x: auto; } .tabla { width: 100%; border-collapse: collapse; } th, td { padding: var(--espaciado-s); text-align: left; }`.
Se aplica a las 4 tablas. `caption`/`thead`/`th scope` intactos. El `body` lleva `overflow-x: hidden` solo como red de seguridad documentada — la garantía real es que ningún bloque exceda `100%` (imágenes `max-width: 100%`).

### D-6 Estados y foco accesibles

- `.mensaje--error`: color + borde izquierdo grueso + prefijo textual (ej. "Error: ") — nunca solo color (R-03).
- `:focus-visible { outline: 3px solid var(--color-acento); outline-offset: 2px; }`; prohibido `outline:none` sin reemplazo (R-05).
- Clases reservadas para JS futuro (Ej.3–6) sin comportamiento: `.esta-oculto`, `.mensaje--exito`; el JS las activará, este change solo las define.

### D-7 Hooks HTML mínimos (único cambio a `index.html`)

Solo: (1) `<link>` a los 3 CSS en `head` (+ `class` donde falte), (2) envolver cada `table` en `.tabla-contenedor`, (3) `class` en articles/forms/tablas/mensajes/botones según D-3. Sin reordenar nodos, sin cambiar textos/`id`/`for`/`role`.

## Risks / Trade-offs

- [Riesgo] Tabla `ventas-renglones`/`historial-tabla` ilegible a 320px aun con scroll propio → Mitigación: celdas `white-space: nowrap` solo donde rompa cifras; verificación manual tabla por tabla a 320px.
- [Riesgo] Contraste insuficiente de la paleta propuesta → Mitigación: medir AA Sil antes de cerrar; oscurecer texto como primer ajuste.
- [Riesgo] `aria-current="page"` estático del Ej.1 no sigue la vista visible (es HTML estático) → Mitigación: fuera de alcance (requiere JS Ej.3); se documenta como pendiente, no se simula con CSS `:target` salvo decisión del usuario (ver Preguntas).
- [Trade-off] 3 archivos vs 1: más orden y trazabilidad a cambio de 3 `<link>`; aceptable sin build.
- [Trade-off] Sin `outline:none` personalizado agresivo: el foco del navegador + `:focus-visible` es menos "diseñado" pero garantiza visibilidad en todos los navegadores.

## Migration Plan

Sin despliegue: archivos locales, sin servidor. Pasos (Fase 2 APPLY, no ahora): crear `css/` + 3 archivos, editar `index.html` solo con hooks D-7, abrir `file://` a 320px/1280px + recorrido teclado, archivar con `openspec archive`. Rollback: borrar `<link>` y `css/` — el HTML del Ej.1 queda intacto porque no se tocó semántica.

## Criterios de aceptación (vinculados)

- CA-01 (coherencia, R-01/R-07): las 5 vistas comparten tokens y clases; auditoría `class` sin variantes de un solo uso injustificadas.
- CA-02 (adaptación, R-02/R-04): 320px y 1280px sin scroll horizontal del `body`; tablas con scroll propio; Flexbox/Grid trazable en D-4.
- CA-03 (accesibilidad, R-03/R-05): foco visible en todo control, Tab sin trampas, `outline:none` ausente sin reemplazo, errores con texto, `alt`/`role="status"` preservados.
- CA-04 (pureza técnica, R-06): funciona vía `file://` sin npm; sin frameworks/CDNs/preprocesadores/JS funcional.

## Supuestos / Pendientes / Preguntas al usuario (bloquean PLAN, no SPEC)

- SUP-1 (hecho): no hay imágenes en `index.html` → `alt` cumplido por vacuidad; no se agregan imágenes.
- SUP-2 (propuesta): paleta y tipografía exactas quedan como {{DATO_PENDIENTE: paleta final}} — la SPEC no depende de los valores hex, solo de coherencia + contraste AA Sil.
- P-1 (requiere respuesta antes de tasks.md): ¿3 archivos (`base/layout/componentes`) o 1 solo `css/estilos.css`? Propuesta: 3 archivos.
- P-2 (requiere respuesta): ¿activar resaltado de vista con `:target` + `aria-current` estático se deja como está (recomendado, JS lo resolverá en Ej.3) o se prototipa resaltado `:target` en CSS?
- P-3 (requiere respuesta): confirmar anchos de verificación (320px y 1280px exactos) y navegador de referencia (propuesta: cualquier navegador moderno de escritorio con modo responsive).

## Nota FASE 3 APPLY — P-2 RESUELTA COMO TOTALMENTE ESTATICO (2026-10-16)

Decision explicita del usuario ("entonces estatico", con autorizacion para
Fase 3): NO se implemento resaltado `:target`, NO se agregaron
transiciones/animaciones decorativas. `aria-current` queda ESTATICO hasta
Ej.3. Se MANTIENEN `:focus-visible` (`css/base.css`) y la base
`prefers-reduced-motion` por accesibilidad (R-05/CA-03), no son decoracion.
Tarea 3.3 de `tasks.md` ajustada en consecuencia ANTES DE IMPLEMENTAR.
Coherente con R-05/R-06 (solo CSS nativo, sin JS).
