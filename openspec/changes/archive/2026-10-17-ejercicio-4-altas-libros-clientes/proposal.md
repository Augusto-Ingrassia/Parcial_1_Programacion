# Proposal

## Why

El Ejercicio 4 agrega la primera funcionalidad de alta (ABM parcial) a la librería: registrar libros y clientes con validación completa, usando solo los datos locales existentes (editoriales, géneros, autores, libros, clientes) y sin recargar la página. Complementa los Ejercicios 1–3 (estructura, CSS, datos + catálogo) y deja reutilizable para Ej.5 (ventas) y Ej.6 (historial).

## What Changes

- Alta de libros: formulario con título, ISBN, precio, relación con editorial (selector), género (selector con opción "Sin clasificar" que representa ausencia), y autores (selector múltiple o controles equivalentes). Opciones generadas desde datos locales.
- Validaciones de libro: título e ISBN no vacíos; ISBN único (comparado sin espacios ni guiones); precio numérico > 0; editorial y cada autor seleccionado deben existir en datos locales; al menos un autor; género opcional, si se asigna debe existir.
- Alta de clientes: nombre completo y email. Validaciones: ambos no vacíos; email con formato válido; email único (trim + case-insensitive).
- Control de envío con preventDefault, errores cerca del formulario, alta solo si todas las validaciones pasan. Tras alta correcta se actualizan listado y opciones relacionadas sin recargar.
- No se implementa edición ni eliminación.

## Capabilities

### New Capabilities

- `libreria-altas-validacion`: alta y validación de libros y clientes sobre los datos locales existentes, con actualización de listado/opciones sin recarga.

### Modified Capabilities

- `libreria-datos-catalogo`: ninguna modificación de requisitos (el modelo se reutiliza; los nuevos registros se agregan a las colecciones existentes). Se extiende el uso, no el contrato.

## Impact

- Código: `js/datos.js` (se reutiliza; los nuevos registros se pushean a `libros`/`clientes`); nuevo `js/altas.js` (o equivalente) con validación y render de listados/opciones. `index.html` ya contiene los formularios pero los selectores de editorial/género/autores deben generarse desde datos locales (actualmente son inputs de texto/selects estáticos con opciones inventadas).
- Specs: nueva capability `libreria-altas-validacion`.
- Sin dependencias externas, sin backend, sin persistencia. Verificable abriendo `index.html`.
