// Ejercicio 4 — Altas y validación de libros y clientes.
// Requiere js/datos.js y js/catalogo.js cargados antes.

function normalizarIsbn(isbn) {
  var base = isbn === undefined || isbn === null ? "" : String(isbn);
  return base.replace(/\s+/g, "").replace(/-/g, "");
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizarEmail(email) {
  var base = email === undefined || email === null ? "" : String(email);
  return base.trim().toLowerCase();
}

function siguienteIdLibro() {
  var max = 0;
  for (var i = 0; i < libros.length; i++) {
    var m = String(libros[i].id).match(/^lib(\d+)$/);
    if (m) {
      var n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  return "lib" + (max + 1);
}

function siguienteIdCliente() {
  var max = 0;
  for (var i = 0; i < clientes.length; i++) {
    var m = String(clientes[i].id).match(/^cli(\d+)$/);
    if (m) {
      var n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  return "cli" + (max + 1);
}

function validarLibro(datos) {
  if (!datos || typeof datos !== "object") {
    return { ok: false, error: "Datos inválidos." };
  }
  var titulo = String(datos.titulo === undefined || datos.titulo === null ? "" : datos.titulo).trim();
  if (titulo === "") {
    return { ok: false, error: "El título es obligatorio." };
  }
  var isbnNorm = normalizarIsbn(datos.isbn);
  if (isbnNorm === "") {
    return { ok: false, error: "El ISBN es obligatorio." };
  }
  for (var i = 0; i < libros.length; i++) {
    if (normalizarIsbn(libros[i].isbn) === isbnNorm) {
      return { ok: false, error: "El ISBN ya existe." };
    }
  }
  var precio = Number(datos.precio);
  if (isNaN(precio) || precio <= 0) {
    return { ok: false, error: "El precio debe ser numérico mayor a 0." };
  }
  var editorialExiste = editoriales.some(function (e) { return e.id === datos.editorialId; });
  if (!editorialExiste) {
    return { ok: false, error: "La editorial seleccionada no existe." };
  }
  var autorIds = Array.isArray(datos.autorIds) ? datos.autorIds : [];
  if (autorIds.length === 0) {
    return { ok: false, error: "Debe seleccionar al menos un autor." };
  }
  for (var a = 0; a < autorIds.length; a++) {
    var existe = autores.some(function (au) { return au.id === autorIds[a]; });
    if (!existe) {
      return { ok: false, error: "Un autor seleccionado no existe." };
    }
  }
  if (datos.generoId !== null && datos.generoId !== undefined && datos.generoId !== "") {
    var generoExiste = generos.some(function (g) { return g.id === datos.generoId; });
    if (!generoExiste) {
      return { ok: false, error: "El género seleccionado no existe." };
    }
  }
  return { ok: true, error: "" };
}

function validarCliente(datos) {
  if (!datos || typeof datos !== "object") {
    return { ok: false, error: "Datos inválidos." };
  }
  var nombre = String(datos.nombre === undefined || datos.nombre === null ? "" : datos.nombre).trim();
  if (nombre === "") {
    return { ok: false, error: "El nombre completo es obligatorio." };
  }
  var email = String(datos.email === undefined || datos.email === null ? "" : datos.email).trim();
  if (email === "") {
    return { ok: false, error: "El email es obligatorio." };
  }
  if (!emailValido(email)) {
    return { ok: false, error: "El email no tiene un formato válido." };
  }
  var norm = normalizarEmail(email);
  for (var i = 0; i < clientes.length; i++) {
    if (normalizarEmail(clientes[i].email) === norm) {
      return { ok: false, error: "El email ya existe." };
    }
  }
  return { ok: true, error: "" };
}

function mostrarMensaje(elementoId, texto) {
  var el = document.getElementById(elementoId);
  if (!el) return;
  el.textContent = texto === undefined || texto === null ? "" : String(texto);
}

function renderOpcionesLibro() {
  var selEd = document.getElementById("libro-editorial");
  if (selEd) {
    while (selEd.firstChild) selEd.removeChild(selEd.firstChild);
    for (var i = 0; i < editoriales.length; i++) {
      var opt = document.createElement("option");
      opt.value = editoriales[i].id;
      opt.textContent = editoriales[i].nombre;
      selEd.appendChild(opt);
    }
  }
  var selGen = document.getElementById("libro-genero");
  if (selGen) {
    while (selGen.firstChild) selGen.removeChild(selGen.firstChild);
    var sinClas = document.createElement("option");
    sinClas.value = "";
    sinClas.textContent = "Sin clasificar";
    selGen.appendChild(sinClas);
    for (var g = 0; g < generos.length; g++) {
      var optG = document.createElement("option");
      optG.value = generos[g].id;
      optG.textContent = generos[g].nombre;
      selGen.appendChild(optG);
    }
  }
  var selAut = document.getElementById("libro-autores");
  if (selAut) {
    while (selAut.firstChild) selAut.removeChild(selAut.firstChild);
    for (var a = 0; a < autores.length; a++) {
      var optA = document.createElement("option");
      optA.value = autores[a].id;
      optA.textContent = autores[a].nombre;
      selAut.appendChild(optA);
    }
  }
}

function renderOpcionesCliente() {
  var sel = document.getElementById("venta-cliente");
  if (!sel) return;
  while (sel.firstChild) sel.removeChild(sel.firstChild);
  for (var i = 0; i < clientes.length; i++) {
    var opt = document.createElement("option");
    opt.value = clientes[i].id;
    opt.textContent = clientes[i].nombre;
    sel.appendChild(opt);
  }
}

function renderListadoLibros() {
  var tabla = document.getElementById("libros-tabla");
  if (!tabla) return;
  var tbody = tabla.querySelector("tbody");
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
  for (var i = 0; i < libros.length; i++) {
    var libro = libros[i];
    var tr = document.createElement("tr");
    var tdTitulo = document.createElement("td"); tdTitulo.textContent = libro.titulo; tr.appendChild(tdTitulo);
    var tdIsbn = document.createElement("td"); tdIsbn.textContent = libro.isbn; tr.appendChild(tdIsbn);
    var ed = null;
    for (var e = 0; e < editoriales.length; e++) if (editoriales[e].id === libro.editorialId) ed = editoriales[e];
    var tdEd = document.createElement("td"); tdEd.textContent = ed ? ed.nombre : ""; tr.appendChild(tdEd);
    var genNombre = "Sin clasificar";
    if (libro.generoId) {
      for (var g = 0; g < generos.length; g++) if (generos[g].id === libro.generoId) genNombre = generos[g].nombre;
    }
    var tdGen = document.createElement("td"); tdGen.textContent = genNombre; tr.appendChild(tdGen);
    var nombres = [];
    for (var ai = 0; ai < libro.autorIds.length; ai++) {
      for (var aj = 0; aj < autores.length; aj++) if (autores[aj].id === libro.autorIds[ai]) nombres.push(autores[aj].nombre);
    }
    var tdAut = document.createElement("td"); tdAut.textContent = nombres.join(", "); tr.appendChild(tdAut);
    var tdPrecio = document.createElement("td"); tdPrecio.textContent = "$" + libro.precio; tr.appendChild(tdPrecio);
    tbody.appendChild(tr);
  }
}

function renderListadoClientes() {
  var tabla = document.getElementById("clientes-tabla");
  if (!tabla) return;
  var tbody = tabla.querySelector("tbody");
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
  for (var i = 0; i < clientes.length; i++) {
    var c = clientes[i];
    var tr = document.createElement("tr");
    var tdN = document.createElement("td"); tdN.textContent = c.nombre; tr.appendChild(tdN);
    var tdE = document.createElement("td"); tdE.textContent = c.email; tr.appendChild(tdE);
    tbody.appendChild(tr);
  }
}

function altaLibro(datos) {
  var v = validarLibro(datos);
  if (!v.ok) return v;
  var libro = {
    id: siguienteIdLibro(),
    titulo: String(datos.titulo).trim(),
    isbn: String(datos.isbn).trim(),
    editorialId: datos.editorialId,
    generoId: (datos.generoId === "" || datos.generoId === null || datos.generoId === undefined) ? null : datos.generoId,
    autorIds: datos.autorIds.slice(),
    precio: Number(datos.precio)
  };
  libros.push(libro);
  renderListadoLibros();
  if (typeof renderCatalogo === "function") {
    renderCatalogo(typeof libros !== "undefined" ? libros : []);
  }
  renderOpcionesLibro();
  return { ok: true, error: "", id: libro.id };
}

function altaCliente(datos) {
  var v = validarCliente(datos);
  if (!v.ok) return v;
  var cliente = {
    id: siguienteIdCliente(),
    nombre: String(datos.nombre).trim(),
    email: String(datos.email).trim()
  };
  clientes.push(cliente);
  renderListadoClientes();
  renderOpcionesCliente();
  return { ok: true, error: "", id: cliente.id };
}

function conectarFormularios() {
  var formLibros = document.getElementById("libros-form");
  if (formLibros) {
    formLibros.addEventListener("submit", function (e) {
      e.preventDefault();
      var autorSelect = document.getElementById("libro-autores");
      var autoresSel = [];
      if (autorSelect) {
        for (var i = 0; i < autorSelect.options.length; i++) {
          if (autorSelect.options[i].selected) autoresSel.push(autorSelect.options[i].value);
        }
      }
      var datos = {
        titulo: document.getElementById("libro-titulo").value,
        isbn: document.getElementById("libro-isbn").value,
        precio: document.getElementById("libro-precio").value,
        editorialId: document.getElementById("libro-editorial").value,
        generoId: document.getElementById("libro-genero").value,
        autorIds: autoresSel
      };
      var res = altaLibro(datos);
      if (res.ok) {
        mostrarMensaje("libros-mensaje", "Libro registrado correctamente.");
        formLibros.reset();
        renderOpcionesLibro();
      } else {
        mostrarMensaje("libros-mensaje", res.error);
      }
    });
  }
  var formClientes = document.getElementById("clientes-form");
  if (formClientes) {
    formClientes.addEventListener("submit", function (e) {
      e.preventDefault();
      var datos = {
        nombre: document.getElementById("cliente-nombre").value,
        email: document.getElementById("cliente-email").value
      };
      var res = altaCliente(datos);
      if (res.ok) {
        mostrarMensaje("clientes-mensaje", "Cliente registrado correctamente.");
        formClientes.reset();
      } else {
        mostrarMensaje("clientes-mensaje", res.error);
      }
    });
  }
}

(function iniciarAltas() {
  renderOpcionesLibro();
  renderOpcionesCliente();
  renderListadoLibros();
  renderListadoClientes();
  conectarFormularios();
})();
