# libreria-presentacion-css Specification

## Purpose

Presentación externa, coherente, adaptable y accesible del frontend de librería sobre el HTML del Ejercicio 1, verificable abriendo index.html sin herramientas y cumpliendo el Ejercicio 2 del Primer Parcial.

## Requirements

### Requirement: R-01 Identidad visual coherente con clases reutilizadas

El sistema SHALL aplicar una identidad visual coherente (colores, tipografía, espaciado, tarjetas, formularios, botones) usando clases reutilizadas para elementos equivalentes en las 5 vistas.

#### Scenario: Coherencia entre vistas

- **WHEN** se abren `#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas` y `#vista-historial`
- **THEN** los elementos equivalentes comparten las mismas clases (ej. `.boton`, `.formulario`, `.tarjeta-libro`) y se ven tipografía, espaciado y botones consistentes.

#### Scenario: Sin estilos inline como mecanismo principal

- **WHEN** se inspecciona el `index.html` resultante
- **THEN** no hay atributos `style` como mecanismo principal de presentación; los estilos viven en `css/`.

### Requirement: R-02 CSS externo con Flexbox/Grid y tablas con scroll propio

El sistema SHALL cargar al menos un CSS externo vía `<link rel="stylesheet">`, usar Flexbox o Grid documentado para el layout, y envolver cada tabla que lo necesite en un contenedor con `overflow-x:auto` sin alterar `caption`/`thead`/`th scope`.

#### Scenario: Hoja externa vinculada

- **WHEN** se abre `index.html` vía `file://` y se inspecciona el `head`
- **THEN** existe `<link rel="stylesheet">` a al menos un archivo bajo `css/` y los estilos se aplican sin red ni build.

#### Scenario: Tabla ancha a 320px con scroll propio

- **WHEN** el viewport es 320px y una tabla (ej. `libros-tabla`) excede el ancho
- **THEN** la tabla se desplaza dentro de su `.tabla-contenedor` y el `body` no genera scroll horizontal, conservando `caption`, `thead` y `th scope` intactos.

#### Scenario: Layout Flexbox/Grid documentado

- **WHEN** se lee `design.md`
- **THEN** consta qué zonas usan Flexbox o Grid y por qué, trazable a las clases del CSS.

### Requirement: R-03 Estados y errores expresados con texto, no solo color

El sistema SHALL expresar mensajes de error y estados (lista vacía, sin resultados, operación correcta/rechazada) con texto visible en contenedores `role="status"`, nunca dependiendo únicamente del color.

#### Scenario: Error distinguible sin color

- **WHEN** un mensaje de error (ej. clase `.mensaje--error`) se ve en escala de grises o lo lee un lector de pantalla
- **THEN** el texto del mensaje comunica el estado por sí solo y el contenedor conserva su `id` y `role="status"`.

#### Scenario: Caso límite error solo-por-color a evitar

- **WHEN** se auditan los estilos de `.mensaje`, `.mensaje--error` y equivalentes
- **THEN** ningún estado se diferencia solo por color: siempre hay texto, icono con texto alternativo o borde/etiqueta textual adicional.

### Requirement: R-04 Adaptable a 320px y 1280px sin scroll horizontal del body

El sistema SHALL mostrar textos y controles legibles a 320px y 1280px sin provocar desplazamiento horizontal del `body`.

#### Scenario: Ancho móvil 320px

- **WHEN** se abre `index.html` a 320px de ancho
- **THEN** textos y controles son legibles y utilizables, el `body` no tiene scroll horizontal; solo los `.tabla-contenedor` pueden desplazar internamente.

#### Scenario: Ancho escritorio 1280px

- **WHEN** se abre `index.html` a 1280px de ancho
- **THEN** el contenido usa el ancho disponible sin estiramientos ilegibles, sin scroll horizontal del `body` y sin pérdida de la identidad visual.

### Requirement: R-05 Foco visible, teclado sin trampas y alt correcto

El sistema SHALL conservar foco visible en controles, permitir recorrido completo por teclado sin trampas ni `tabindex` positivo, y mantener reglas de `alt` (informativa descriptivo, decorativa `alt=""`, ausencia = cumplido por vacuidad).

#### Scenario: Recorrido completo por teclado

- **WHEN** se recorre la página solo con Tab / Shift+Tab por las 5 vistas, formularios y tablas
- **THEN** cada control recibe un indicador de foco visible, el foco nunca queda atrapado y no existe `tabindex` positivo.

#### Scenario: Foco nunca suprimido sin reemplazo

- **WHEN** se auditan las reglas de `:focus` en el CSS
- **THEN** ninguna regla usa `outline:none` sin proveer un reemplazo visible equivalente (borde, sombra o subrayado documentado).

### Requirement: R-06 Verificable sin npm ni servidor, solo tecnologías permitidas

El sistema SHALL verificarse abriendo `index.html` con doble clic (`file://`), sin npm, servidor ni build, usando solo HTML/CSS nativos y recursos locales, sin librerías, frameworks, CDNs ni preprocesadores.

#### Scenario: Apertura directa del archivo

- **WHEN** se abre `index.html` con doble clic sin instalar nada
- **THEN** las 5 vistas, formularios, tablas y mensajes se presentan con estilos y la navegación por anclas funciona.

#### Scenario: Ausencia de tecnologías excluidas

- **WHEN** se inspeccionan las fuentes entregadas
- **THEN** no hay referencias a Bootstrap/Tailwind/CDNs, preprocesadores, ni `<script>` con lógica funcional; solo `<link>` al CSS propio y recursos locales.

### Requirement: R-07 Convención de clases documentada y extensible por JS futuro

El sistema SHALL documentar en `design.md` la convención de clases (BEM-ish: `.bloque`, `.bloque--modificador`, ej. `.tarjeta-libro` `.formulario` `.boton` `.boton--primario` `.mensaje` `.mensaje--error` `.tabla-contenedor`) y reservar la extensión futura Solo como clases reutilizables consumibles por el JS de Ej.3–6, sin implementar comportamiento.

#### Scenario: Convención trazable

- **WHEN** se comparan las clases usadas en `index.html` con `design.md`
- **THEN** cada clase de presentación está definida en la convención y los elementos equivalentes reutilizan la misma clase.

#### Scenario: Reserva para Ejercicios 3–6 sin comportamiento

- **WHEN** se inspecciona el CSS y el HTML entregados
- **THEN** existen clases reutilizables que el JS futuro puede activar (ej. estados de mensaje), pero no hay JS funcional, validaciones, cálculos ni persistencia implementados.
