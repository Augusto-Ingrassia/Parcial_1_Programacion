// Ejercicio 4 — Alta de clientes (ficticio).
// Requiere js/datos.js y js/libros.js cargados antes.
// Reutiliza de js/libros.js: coleccionClientes, buscarPorId, actualizarOpcionesVentas.
// Sin innerHTML con datos, sin fetch, sin persistencia, sin ABM, sin ventas.

// --- Validación del alta de clientes ---

var PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizarEmail(texto) {
  var base = texto === undefined || texto === null ? "" : String(texto);
  return base.trim().toLowerCase();
}

function emailDuplicado(email) {
  var normal = normalizarEmail(email);
  if (normal === "") {
    return false;
  }
  var fuente = coleccionClientes();
  for (var i = 0; i < fuente.length; i++) {
    if (normalizarEmail(fuente[i].email) === normal) {
      return true;
    }
  }
  return false;
}

function validarCliente(datos) {
  var errores = [];
  var valor = datos ? datos : {};

  var nombre = valor.nombre === undefined || valor.nombre === null ? "" : String(valor.nombre).trim();
  if (nombre === "") {
    errores.push("El nombre completo no puede estar vacío.");
  }

  var email = valor.email === undefined || valor.email === null ? "" : String(valor.email).trim();
  if (email === "") {
    errores.push("El correo electrónico no puede estar vacío.");
  } else if (!PATRON_EMAIL.test(email)) {
    errores.push("El correo electrónico no tiene un formato válido.");
  } else if (emailDuplicado(email)) {
    errores.push("Ya existe un cliente con ese correo electrónico.");
  }

  return errores;
}

// --- Alta y render de clientes ---

function agregarCliente(cliente) {
  if (validarCliente(cliente).length > 0) {
    return false;
  }
  coleccionClientes().push(cliente);
  return true;
}

function renderClientes() {
  var tabla = document.getElementById("clientes-tabla");
  if (!tabla) {
    return;
  }
  var tbody = tabla.querySelector("tbody");
  if (!tbody) {
    return;
  }
  vaciarElemento(tbody);
  var fuente = coleccionClientes();
  for (var i = 0; i < fuente.length; i++) {
    var fila = document.createElement("tr");
    var celdaNombre = document.createElement("td");
    celdaNombre.textContent = fuente[i].nombre;
    fila.appendChild(celdaNombre);
    var celdaEmail = document.createElement("td");
    celdaEmail.textContent = fuente[i].email;
    fila.appendChild(celdaEmail);
    tbody.appendChild(fila);
  }
}

function mostrarMensajeClientes(texto) {
  var mensaje = document.getElementById("clientes-mensaje");
  if (!mensaje) {
    return;
  }
  mensaje.textContent = texto === undefined || texto === null ? "" : String(texto);
}

function manejarAltaCliente(evento) {
  evento.preventDefault();
  var form = document.getElementById("clientes-form");
  var campoNombre = document.getElementById("cliente-nombre");
  var campoEmail = document.getElementById("cliente-email");

  var nombre = campoNombre ? campoNombre.value : "";
  var email = campoEmail ? campoEmail.value : "";

  var datos = {
    nombre: nombre,
    email: email
  };

  var errores = validarCliente(datos);
  if (errores.length > 0) {
    mostrarMensajeClientes("Error: " + errores.join(" "));
    return;
  }

  var nuevo = {
    id: "cli" + (coleccionClientes().length + 1),
    nombre: String(nombre).trim(),
    email: String(email).trim()
  };

  agregarCliente(nuevo);
  renderClientes();
  actualizarOpcionesVentas();
  if (form) {
    form.reset();
  }
  mostrarMensajeClientes('Cliente "' + nuevo.nombre + '" registrado correctamente.');
}

// --- Arranque (patrón IIFE de js/catalogo.js) ---

(function iniciarClientes() {
  renderClientes();
  actualizarOpcionesVentas();
  var form = document.getElementById("clientes-form");
  if (form) {
    form.addEventListener("submit", manejarAltaCliente);
    form.addEventListener("reset", function () {
      mostrarMensajeClientes("");
    });
  }
})();
