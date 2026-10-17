// Ejercicio 4 — Alta de libros (ficticio).
// Requiere js/datos.js cargado antes (editoriales, generos, autores, libros, clientes).
// Expone utilidades reutilizadas por js/clientes.js (coleccionClientes, buscarPorId,
// vaciarElemento, crearOpcion, llenarOpciones, actualizarOpcionesVentas).
// Sin innerHTML con datos, sin fetch, sin persistencia, sin ABM, sin ventas.

// --- Acceso al modelo (guardas typeof, igual que js/catalogo.js) ---

function coleccionLibros() {
  return typeof libros !== "undefined" ? libros : [];
}

function coleccionEditoriales() {
  return typeof editoriales !== "undefined" ? editoriales : [];
}

function coleccionGeneros() {
  return typeof generos !== "undefined" ? generos : [];
}

function coleccionAutores() {
  return typeof autores !== "undefined" ? autores : [];
}

function coleccionClientes() {
  return typeof clientes !== "undefined" ? clientes : [];
}

function buscarPorId(lista, id) {
  var items = Array.isArray(lista) ? lista : [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return null;
}

// --- Utilidades de DOM y opciones (compartidas con js/clientes.js) ---

function vaciarElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function crearOpcion(valor, texto) {
  var opcion = document.createElement("option");
  opcion.value = valor;
  opcion.textContent = texto;
  return opcion;
}

function llenarOpciones(select, items, leerTexto) {
  if (!select) {
    return;
  }
  vaciarElemento(select);
  var lista = Array.isArray(items) ? items : [];
  for (var i = 0; i < lista.length; i++) {
    select.appendChild(crearOpcion(lista[i].id, leerTexto(lista[i])));
  }
}

// --- Opciones del formulario de libros ---

function renderOpcionesLibro() {
  var selEditorial = document.getElementById("libro-editorial");
  if (selEditorial) {
    vaciarElemento(selEditorial);
    var eds = coleccionEditoriales();
    for (var i = 0; i < eds.length; i++) {
      selEditorial.appendChild(crearOpcion(eds[i].id, eds[i].nombre));
    }
  }

  var selGenero = document.getElementById("libro-genero");
  if (selGenero) {
    vaciarElemento(selGenero);
    // «Sin clasificar» = ausencia de género (value vacío).
    selGenero.appendChild(crearOpcion("", "Sin clasificar"));
    var gens = coleccionGeneros();
    for (var j = 0; j < gens.length; j++) {
      selGenero.appendChild(crearOpcion(gens[j].id, gens[j].nombre));
    }
  }

  var selAutores = document.getElementById("libro-autores");
  if (selAutores) {
    vaciarElemento(selAutores);
    var auts = coleccionAutores();
    for (var k = 0; k < auts.length; k++) {
      selAutores.appendChild(crearOpcion(auts[k].id, auts[k].nombre));
    }
  }
}

// --- Validación del alta de libros ---

function normalizarIsbn(texto) {
  var base = texto === undefined || texto === null ? "" : String(texto);
  // Sin espacios ni guiones; no se valida el dígito de control.
  return base.replace(/\s+/g, "").replace(/-/g, "");
}

function isbnDuplicado(isbn) {
  var normal = normalizarIsbn(isbn);
  if (normal === "") {
    return false;
  }
  var fuente = coleccionLibros();
  for (var i = 0; i < fuente.length; i++) {
    if (normalizarIsbn(fuente[i].isbn) === normal) {
      return true;
    }
  }
  return false;
}

function validarLibro(datos) {
  var errores = [];
  var valor = datos ? datos : {};

  var titulo = valor.titulo === undefined || valor.titulo === null ? "" : String(valor.titulo).trim();
  if (titulo === "") {
    errores.push("El título no puede estar vacío.");
  }

  var isbn = valor.isbn === undefined || valor.isbn === null ? "" : String(valor.isbn).trim();
  if (isbn === "") {
    errores.push("El ISBN no puede estar vacío.");
  } else if (isbnDuplicado(isbn)) {
    errores.push("El ISBN ya existe en el catálogo.");
  }

  var precio = Number(valor.precio);
  if (!isFinite(precio) || precio <= 0) {
    errores.push("El precio debe ser un número mayor que cero.");
  }

  if (!buscarPorId(coleccionEditoriales(), valor.editorialId)) {
    errores.push("La editorial seleccionada no existe.");
  }

  var autorIds = Array.isArray(valor.autorIds) ? valor.autorIds : [];
  if (autorIds.length === 0) {
    errores.push("Debe seleccionar al menos un autor.");
  } else {
    for (var i = 0; i < autorIds.length; i++) {
      if (!buscarPorId(coleccionAutores(), autorIds[i])) {
        errores.push("Uno de los autores seleccionados no existe.");
        break;
      }
    }
  }

  // El género es opcional: vacío o nulo se acepta; si viene, debe existir.
  if (valor.generoId !== undefined && valor.generoId !== null && valor.generoId !== "") {
    if (!buscarPorId(coleccionGeneros(), valor.generoId)) {
      errores.push("El género seleccionado no existe.");
    }
  }

  return errores;
}

// --- Alta y render de libros ---

function agregarLibro(libro) {
  if (validarLibro(libro).length > 0) {
    return false;
  }
  coleccionLibros().push(libro);
  return true;
}

function nombreEditorial(id) {
  var editorial = buscarPorId(coleccionEditoriales(), id);
  return editorial ? editorial.nombre : "";
}

function nombreGenero(id) {
  if (id === undefined || id === null || id === "") {
    return "Sin clasificar";
  }
  var genero = buscarPorId(coleccionGeneros(), id);
  return genero ? genero.nombre : "Sin clasificar";
}

function nombresAutores(autorIds) {
  var ids = Array.isArray(autorIds) ? autorIds : [];
  var nombres = [];
  for (var i = 0; i < ids.length; i++) {
    var autor = buscarPorId(coleccionAutores(), ids[i]);
    if (autor) {
      nombres.push(autor.nombre);
    }
  }
  return nombres.join(", ");
}

function crearCelda(texto) {
  var celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function renderLibros() {
  var tabla = document.getElementById("libros-tabla");
  if (!tabla) {
    return;
  }
  var tbody = tabla.querySelector("tbody");
  if (!tbody) {
    return;
  }
  vaciarElemento(tbody);
  var fuente = coleccionLibros();
  for (var i = 0; i < fuente.length; i++) {
    var libro = fuente[i];
    var fila = document.createElement("tr");
    fila.appendChild(crearCelda(libro.titulo));
    fila.appendChild(crearCelda(libro.isbn));
    fila.appendChild(crearCelda(nombreEditorial(libro.editorialId)));
    fila.appendChild(crearCelda(nombreGenero(libro.generoId)));
    fila.appendChild(crearCelda(nombresAutores(libro.autorIds)));
    fila.appendChild(crearCelda("$" + libro.precio));
    tbody.appendChild(fila);
  }
}

function mostrarMensajeLibros(texto) {
  var mensaje = document.getElementById("libros-mensaje");
  if (!mensaje) {
    return;
  }
  mensaje.textContent = texto === undefined || texto === null ? "" : String(texto);
}

function leerAutoresSeleccionados(select) {
  var seleccion = [];
  if (!select || !select.options) {
    return seleccion;
  }
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      seleccion.push(select.options[i].value);
    }
  }
  return seleccion;
}

function manejarAltaLibro(evento) {
  evento.preventDefault();
  var form = document.getElementById("libros-form");
  var campoTitulo = document.getElementById("libro-titulo");
  var campoIsbn = document.getElementById("libro-isbn");
  var campoPrecio = document.getElementById("libro-precio");
  var campoEditorial = document.getElementById("libro-editorial");
  var campoGenero = document.getElementById("libro-genero");

  var titulo = campoTitulo ? campoTitulo.value : "";
  var isbn = campoIsbn ? campoIsbn.value : "";
  var generoId = campoGenero ? campoGenero.value : "";

  var datos = {
    titulo: titulo,
    isbn: isbn,
    precio: campoPrecio && campoPrecio.value !== "" ? Number(campoPrecio.value) : NaN,
    editorialId: campoEditorial ? campoEditorial.value : "",
    generoId: generoId,
    autorIds: leerAutoresSeleccionados(document.getElementById("libro-autores"))
  };

  var errores = validarLibro(datos);
  if (errores.length > 0) {
    mostrarMensajeLibros("Error: " + errores.join(" "));
    return;
  }

  var nuevo = {
    id: "lib" + (coleccionLibros().length + 1),
    titulo: String(titulo).trim(),
    isbn: String(isbn).trim(),
    editorialId: datos.editorialId,
    generoId: generoId === "" ? null : generoId,
    autorIds: datos.autorIds.slice(),
    precio: Number(datos.precio)
  };

  agregarLibro(nuevo);
  renderLibros();
  actualizarOpcionesVentas();
  if (form) {
    form.reset();
  }
  mostrarMensajeLibros('Libro "' + nuevo.titulo + '" registrado correctamente.');
}

// --- Opciones relacionadas (vista Ventas) — P-02 = Opción A ---

function actualizarOpcionesVentas() {
  llenarOpciones(document.getElementById("venta-libro"), coleccionLibros(), function (libro) {
    return libro.titulo;
  });
  llenarOpciones(document.getElementById("venta-cliente"), coleccionClientes(), function (cliente) {
    return cliente.nombre;
  });
}

// --- Arranque (patrón IIFE de js/catalogo.js) ---

(function iniciarLibros() {
  renderOpcionesLibro();
  renderLibros();
  actualizarOpcionesVentas();
  var form = document.getElementById("libros-form");
  if (form) {
    form.addEventListener("submit", manejarAltaLibro);
    form.addEventListener("reset", function () {
      mostrarMensajeLibros("");
    });
  }
})();
