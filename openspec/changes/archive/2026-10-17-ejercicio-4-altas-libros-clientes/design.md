# Design

## Context

See proposal.md — Why. El modelo de datos ya existe en `js/datos.js` (editoriales, generos, autores, libros, clientes) con id estables. Los formularios ya existen en `index.html` pero con controles estáticos (input de texto para editorial/autores, select fijo de géneros). Se reutilizan los id existentes y se agregan opciones dinámicas. Ver `specs/libreria-altas-validacion/spec.md` para requisitos.

## Goals / Non-Goals

**Goals:**
- Generar opciones de editorial/género/autores desde datos locales.
- Validar y agregar libros/clientes a las colecciones en memoria.
- Actualizar listados y opciones relacionadas sin recarga.

**Non-Goals:**
- Edición/eliminación de registros.
- Persistencia (localStorage/backend).
- Validación de dígito de control del ISBN.

## Decisions

- **JS nativo en `js/altas.js`**, cargado después de `datos.js` y `catalogo.js`. Funciones separadas: `renderOpcionesLibro`, `validarLibro`, `altaLibro`, `renderListadoLibros`, `renderOpcionesCliente`, `validarCliente`, `altaCliente`, `renderListadoClientes`. Generación de id: `lib` + (max numeric suffix + 1), `cli` + (max + 1).
- **Selectores generados dinámicamente** reemplazando los inputs estáticos de editorial/autores y el select fijo de género por `<select>` con `<option>` por cada entidad + "Sin clasificar" para género. Autores: `<select multiple>` (o checkboxes equivalentes).
- **ISBN normalizado**: quitar espacios y guiones antes de comparar unicidad.
- **Email normalizado**: trim + toLowerCase para comparación de unicidad; formato validado con regex simple `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- **Errores** mostrados en `#libros-mensaje` / `#clientes-mensaje` con textContent.
- **Listados**: regenerar tbody de `#libros-tabla` y `#clientes-tabla` desde las colecciones (sin data-ejemplo estático tras alta; se puede mantener render inicial de datos ficticios). Opciones relacionadas (selector de clientes en ventas) se regeneran si existe.

## Risks / Trade-offs

- [Riesgo] HTML actual tiene filas estáticas de ejemplo → Mitigación: renderizar listado desde datos al cargar (o mantener ejemplo y agregar filas nuevas); se opta por render completo desde colecciones para consistencia.
- [Riesgo] `select multiple` UX poco intuitiva → Mitigación: permitir checkboxes equivalentes; se usará `<select multiple size>`.

## Migration Plan

No aplica (sin deploy/backend). Verificación manual abriendo `index.html`.

## Open Questions

Ninguna.
