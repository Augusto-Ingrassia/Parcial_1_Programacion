# Tasks — ejercicio-2-presentacion-css

> Estado 2026-10-16: restaurado post-reinicio Windows (lock NTFS delete-pending
> liberado). Contenido recuperado de Engram #120 (versión ESTÁTICA decidida por
> el usuario "entonces estatico", nota P-2 en design.md). 12/12 completadas.
> Implementación ya existe en `css/` + `index.html` y fue re-verificada.

## 1. Base (tokens + accesibilidad)

- [x] 1.1 Tokens y reset en `css/base.css` (R-01/R-07) — `:root` con paleta cálida + tipografía sistema + espaciado + `--ancho-max: 72rem`; reset `box-sizing` y `body` sin margen. Verificación: abrir `css/base.css`, bloque `:root` presente; pares texto/fondo medidos ≥ 4.5:1 (13.88/9.48/10.02/8.31/7.60/6.81:1).
- [x] 1.2 Foco visible + movimiento seguro en `css/base.css` (R-05) — `:focus-visible { outline: 3px solid var(--color-acento); outline-offset: 2px; }` y guarda `prefers-reduced-motion` (solo `scroll-behavior: auto`, sin animaciones). Verificación: grep `:focus-visible` con reemplazo presente; grep `outline:none` solo en comentarios; Tab por controles muestra foco visible.

## 2. Layout (Grid + Flexbox)

- [x] 2.1 Estructura de página Grid + nav Flexbox en `css/layout.css` (R-02) — `body` Grid 1 columna, `.contenedor { max-width: var(--ancho-max); margin-inline: auto; }`, `.navegacion ul { display: flex; flex-wrap: wrap; gap: ...; list-style: none; }`. Verificación: `file://` a 320px y 1280px sin scroll horizontal del `body`; nav nunca desborda (wrap).
- [x] 2.2 Grilla catálogo + formularios + barra de acciones en `css/layout.css` (R-02/R-04) — `.grilla-catalogo` 1 columna base → `repeat(auto-fill, minmax(16rem, 1fr))` en `@media (min-width: 48rem)`; `.formulario`/`.grupo-formulario` Flexbox columna; `.barra-acciones` Flexbox wrap; controles `max-width: 100%`; `min-width: 0` en bloques. Verificación: 320px una columna, ≥768px grilla múltiple; botones bajan de línea sin cortar a 320px.

## 3. Componentes (BEM-ish, versión ESTÁTICA)

- [x] 3.1 Tarjetas, formularios y botones en `css/componentes.css` (R-01/R-03) — `.tarjeta-libro`, `.formulario`, `.campo__etiqueta`/`.campo__control`, `.boton` + `.boton--primario` + `.boton--peligro` (peligro siempre con texto, nunca solo color). Verificación: las 5 vistas comparten clases; inspección visual `file://` coherente entre catálogo/libros/clientes/ventas/historial.
- [x] 3.2 Tablas con scroll propio + mensajes por texto + reserva JS en `css/componentes.css` (R-02/R-03/R-07) — `.tabla-contenedor { overflow-x: auto; }`, `.tabla { width: 100%; border-collapse: collapse; }`; `.mensaje` con borde lateral grueso + `.mensaje--error`/`.mensaje--exito` con texto (nunca solo color); `.mensaje:empty { display: none; }`; `.esta-oculto { display: none; }` reservada sin activar. Verificación: tablas desplazables internamente a 320px con `caption`/`thead`/`th scope` intactos; mensajes legibles en escala de grises.
- [x] 3.3 Enlace activo de navegación ESTÁTICO en `css/componentes.css` (decisión P-2 usuario) — SOLO `.navegacion__enlace--activo { font-weight: 700; text-decoration: underline; text-underline-offset: 0.25rem; }` sobre `aria-current="page"` estático del HTML. SIN `:target`, SIN transiciones/animaciones. Verificación: grep `:target` en `css/` vacío salvo comentarios; grep `transition|animation` en `css/` vacío; JS del Ej.3 gestionará `aria-current` dinámicamente.

## 4. Hooks mínimos en `index.html`

- [x] 4.1 Tres `<link>` en orden cascada base→layout→componentes (R-02/R-06) — líneas 7–9: `css/base.css`, `css/layout.css`, `css/componentes.css`. Verificación: `Select-String "<link" index.html` devuelve 3 líneas; `file://` sin red ni build aplica estilos.
- [x] 4.2 Clases BEM-ish según convención D-3 (R-01/R-07) — `contenedor`, `navegacion` + `navegacion__enlace--activo`, `vista`, `grilla-catalogo`, `tarjeta-libro`, `formulario`, `campo__etiqueta`/`campo__control`, `boton`/`boton--primario`/`boton--peligro`, `tabla`, `mensaje`. Verificación: cada clase usada existe en `design.md` D-3 y en su CSS; sin variantes de un solo uso injustificadas; sin reordenar nodos ni cambiar textos/`id`/`for`/`role`.
- [x] 4.3 Cuatro `.tabla-contenedor` envolviendo cada tabla (R-02/R-04) — `libros-tabla`, `clientes-tabla`, `ventas-renglones`, `historial-tabla` cada una en `<div class="tabla-contenedor">`. Verificación: contar 4 ocurrencias `tabla-contenedor` en `index.html`; `caption`/`thead`/`th scope` intactos del Ej.1.

## 5. Verificación integral

- [x] 5.1 Pureza técnica por grep (R-05/R-06) — `style=` → 0 en `index.html`; `transition|animation` → 0 en `css/`; `:target` y `outline:none` solo en comentarios; sin Bootstrap/Tailwind/CDNs/preprocesadores; sin `<script>` funcional. Verificación: comandos `Select-String` correspondientes con resultado esperado documentado.
- [x] 5.2 Verificación manual 320/1280px + teclado + contraste (CA-01..CA-04) — `file://` a 320px y 1280px sin scroll horizontal del `body`; recorrido Tab/Shift+Tab completo sin trampas ni `tabindex` positivo; contrastes AA Sil verificados (13.88/9.48/10.02/8.31/7.60/6.81:1). Pendiente P-3: confirmación física a 320px exactos por el usuario en su máquina (navegador moderno de escritorio con modo responsive).

## Workflow follow-up

- Mejora del nav pedida por el usuario con foto (barra cohesiva estática, solo CSS) — fuera del alcance original, aplicada antes de archivar.
- Archivar el change tras verificación (`openspec archive`) y verificar el resultado.
