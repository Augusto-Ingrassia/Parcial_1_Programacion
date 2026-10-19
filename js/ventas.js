// Ejercicio 5 — Venta simulada e historial.
// Requiere js/datos.js y js/altas.js cargados antes.
// Sin innerHTML con datos, sin fetch, sin persistencia (Ej. 6).

// Renglones de la venta en curso: { libroId, cantidad } donde cantidad es el
// texto tal como lo escribió el usuario (se valida al calcular y al confirmar).
var renglonesVenta = [];

// --- Cálculos (importes en centavos para evitar errores de coma flotante) ---

function parsearCantidad(texto) {
  var limpio = String(texto === undefined || texto === null ? "" : texto).trim();
  if (!/^\d+$/.test(limpio)) return null;
  var n = parseInt(limpio, 10);
  return n > 0 ? n : null;
}

function calcularSubtotal(precio, cantidad) {
  return (Math.round(precio * 100) * cantidad) / 100;
}

function calcularTotal(subtotales) {
  var centavos = 0;
  for (var i = 0; i < subtotales.length; i++) centavos += Math.round(subtotales[i] * 100);
  return centavos / 100;
}

function formatearImporte(importe) {
  return "$" + Number(importe).toFixed(2);
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleString("es-AR");
}

function buscarLibro(id) {
  return libros.find(function (l) { return l.id === id; }) || null;
}

function buscarCliente(id) {
  return clientes.find(function (c) { return c.id === id; }) || null;
}

function siguienteIdVenta() {
  var max = 0;
  for (var i = 0; i < ventas.length; i++) {
    var m = String(ventas[i].id).match(/^V-(\d+)$/);
    if (m && parseInt(m[1], 10) > max) max = parseInt(m[1], 10);
  }
  return "V-" + String(max + 1).padStart(3, "0");
}

// --- Utilidades de DOM ---

function vaciar(elemento) {
  while (elemento.firstChild) elemento.removeChild(elemento.firstChild);
}

function agregarCelda(tr, texto) {
  var td = document.createElement("td");
  td.textContent = texto;
  tr.appendChild(td);
  return td;
}

function agregarFilaVacia(tbody, columnas, texto) {
  var tr = document.createElement("tr");
  var td = agregarCelda(tr, texto);
  td.colSpan = columnas;
  tbody.appendChild(tr);
}

// tipo: "error" | "exito" | undefined. Los errores llevan el prefijo "Error:"
// para no depender solo del color.
function mostrarMensajeEstado(elementoId, texto, tipo) {
  var el = document.getElementById(elementoId);
  if (!el) return;
  el.textContent = tipo === "error" ? "Error: " + texto : texto;
  el.className = "mensaje" + (tipo ? " mensaje--" + tipo : "");
}

// --- Venta en curso ---

function renderOpcionesVentaLibro() {
  var sel = document.getElementById("venta-libro");
  if (!sel) return;
  var seleccionado = sel.value;
  vaciar(sel);
  for (var i = 0; i < libros.length; i++) {
    var opt = document.createElement("option");
    opt.value = libros[i].id;
    opt.textContent = libros[i].titulo + " — " + formatearImporte(libros[i].precio);
    sel.appendChild(opt);
  }
  if (seleccionado) sel.value = seleccionado;
}

function textoSubtotal(renglon) {
  var libro = buscarLibro(renglon.libroId);
  var cantidad = parsearCantidad(renglon.cantidad);
  if (!libro || cantidad === null) return "Cantidad inválida";
  return formatearImporte(calcularSubtotal(libro.precio, cantidad));
}

function renderTotalVenta() {
  var invalidos = renglonesVenta.filter(function (r) { return parsearCantidad(r.cantidad) === null; });
  if (invalidos.length > 0) {
    mostrarMensajeEstado("ventas-total", "hay cantidades inválidas; corregilas para calcular el total.", "error");
    return;
  }
  var subtotales = renglonesVenta.map(function (r) {
    return calcularSubtotal(buscarLibro(r.libroId).precio, parsearCantidad(r.cantidad));
  });
  mostrarMensajeEstado("ventas-total", "Total: " + formatearImporte(calcularTotal(subtotales)) +
    " (" + renglonesVenta.length + " renglones)");
}

function crearFilaRenglon(renglon) {
  var libro = buscarLibro(renglon.libroId);
  var tr = document.createElement("tr");
  agregarCelda(tr, libro.titulo);

  var tdCantidad = document.createElement("td");
  var input = document.createElement("input");
  input.className = "campo__control";
  input.type = "number";
  input.min = "1";
  input.step = "1";
  input.value = renglon.cantidad;
  input.setAttribute("aria-label", "Cantidad de " + libro.titulo);
  tdCantidad.appendChild(input);
  tr.appendChild(tdCantidad);

  agregarCelda(tr, formatearImporte(libro.precio));
  var tdSubtotal = agregarCelda(tr, textoSubtotal(renglon));

  input.addEventListener("input", function () {
    renglon.cantidad = input.value;
    tdSubtotal.textContent = textoSubtotal(renglon);
    renderTotalVenta();
  });

  var tdAcciones = document.createElement("td");
  var quitar = document.createElement("button");
  quitar.type = "button";
  quitar.className = "boton boton--peligro";
  quitar.textContent = "Quitar renglón";
  quitar.setAttribute("aria-label", "Quitar renglón de " + libro.titulo);
  quitar.addEventListener("click", function () { quitarRenglon(renglon.libroId); });
  tdAcciones.appendChild(quitar);
  tr.appendChild(tdAcciones);
  return tr;
}

function renderRenglones() {
  var tbody = document.querySelector("#ventas-renglones tbody");
  if (!tbody) return;
  vaciar(tbody);
  if (renglonesVenta.length === 0) {
    agregarFilaVacia(tbody, 5, "La venta todavía no tiene renglones.");
  }
  for (var i = 0; i < renglonesVenta.length; i++) {
    tbody.appendChild(crearFilaRenglon(renglonesVenta[i]));
  }
  renderTotalVenta();
}

function agregarRenglon() {
  var libroId = document.getElementById("venta-libro").value;
  var inputCantidad = document.getElementById("venta-cantidad");
  var libro = buscarLibro(libroId);
  if (!libro) {
    mostrarMensajeEstado("ventas-mensaje", "seleccioná un libro existente.", "error");
    return;
  }
  var cantidad = parsearCantidad(inputCantidad.value);
  if (cantidad === null) {
    mostrarMensajeEstado("ventas-mensaje", "la cantidad debe ser un número entero mayor que cero.", "error");
    return;
  }
  var repetido = renglonesVenta.some(function (r) { return r.libroId === libroId; });
  if (repetido) {
    mostrarMensajeEstado("ventas-mensaje", "«" + libro.titulo + "» ya está en la venta; modificá la cantidad en su renglón.", "error");
    return;
  }
  renglonesVenta.push({ libroId: libroId, cantidad: String(cantidad) });
  inputCantidad.value = "1";
  renderRenglones();
  mostrarMensajeEstado("ventas-mensaje", "Renglón agregado: " + libro.titulo + " × " + cantidad + ".", "exito");
}

function quitarRenglon(libroId) {
  renglonesVenta = renglonesVenta.filter(function (r) { return r.libroId !== libroId; });
  renderRenglones();
  mostrarMensajeEstado("ventas-mensaje", "Renglón quitado.");
}

function limpiarVenta() {
  renglonesVenta = [];
  document.getElementById("venta-cliente").value = "";
  document.getElementById("venta-cantidad").value = "1";
  renderRenglones();
}

// Devuelve { ok, error, venta }. Copia título, ISBN y precio unitario al
// renglón: el historial no vuelve a leer el catálogo.
function armarVenta(clienteId, renglones) {
  var cliente = buscarCliente(clienteId);
  if (!cliente) return { ok: false, error: "seleccioná un cliente antes de confirmar." };
  if (renglones.length === 0) return { ok: false, error: "agregá al menos un renglón antes de confirmar." };
  var copia = [];
  for (var i = 0; i < renglones.length; i++) {
    var libro = buscarLibro(renglones[i].libroId);
    var cantidad = parsearCantidad(renglones[i].cantidad);
    if (!libro) return { ok: false, error: "un libro de la venta ya no existe." };
    if (cantidad === null) {
      return { ok: false, error: "la cantidad de «" + libro.titulo + "» debe ser un número entero mayor que cero." };
    }
    copia.push({
      libroId: libro.id,
      titulo: libro.titulo,
      isbn: libro.isbn,
      cantidad: cantidad,
      precioUnitario: libro.precio,
      subtotal: calcularSubtotal(libro.precio, cantidad)
    });
  }
  return {
    ok: true,
    venta: {
      id: siguienteIdVenta(),
      fecha: new Date().toISOString(),
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      clienteEmail: cliente.email,
      renglones: copia,
      total: calcularTotal(copia.map(function (r) { return r.subtotal; }))
    }
  };
}

function confirmarVenta() {
  var res = armarVenta(document.getElementById("venta-cliente").value, renglonesVenta);
  if (!res.ok) {
    mostrarMensajeEstado("ventas-mensaje", res.error + " La venta no se confirmó.", "error");
    return;
  }
  ventas.push(res.venta);
  limpiarVenta();
  renderHistorial();
  mostrarMensajeEstado("ventas-mensaje", "Venta " + res.venta.id + " confirmada para " + res.venta.clienteNombre +
    ". Total: " + formatearImporte(res.venta.total) + ".", "exito");
}

function cancelarVenta() {
  limpiarVenta();
  mostrarMensajeEstado("ventas-mensaje", "Venta cancelada; el formulario quedó vacío.");
}

// --- Historial (solo lectura) ---

function renderHistorial() {
  var tbody = document.querySelector("#historial-tabla tbody");
  if (!tbody) return;
  vaciar(tbody);
  if (ventas.length === 0) {
    agregarFilaVacia(tbody, 5, "Todavía no hay ventas confirmadas.");
  }
  ventas.forEach(function (venta) {
    var tr = document.createElement("tr");
    agregarCelda(tr, venta.id);
    agregarCelda(tr, formatearFecha(venta.fecha));
    agregarCelda(tr, venta.clienteNombre);
    agregarCelda(tr, formatearImporte(venta.total));
    var td = document.createElement("td");
    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton";
    boton.textContent = "Ver detalle";
    boton.setAttribute("aria-label", "Ver detalle de la venta " + venta.id);
    boton.addEventListener("click", function () { mostrarDetalleVenta(venta.id); });
    td.appendChild(boton);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

function mostrarDetalleVenta(ventaId) {
  var contenedor = document.getElementById("historial-detalle");
  if (!contenedor) return;
  vaciar(contenedor);
  var venta = ventas.find(function (v) { return v.id === ventaId; });
  if (!venta) {
    mostrarMensajeEstado("historial-detalle-mensaje", "la venta " + ventaId + " no existe.", "error");
    return;
  }
  mostrarMensajeEstado("historial-detalle-mensaje", "");

  var titulo = document.createElement("h4");
  titulo.textContent = "Venta " + venta.id;
  titulo.tabIndex = -1;
  contenedor.appendChild(titulo);
  var fecha = document.createElement("p");
  fecha.textContent = "Fecha: " + formatearFecha(venta.fecha);
  contenedor.appendChild(fecha);
  var cliente = document.createElement("p");
  cliente.textContent = "Cliente: " + venta.clienteNombre + " (" + venta.clienteEmail + ")";
  contenedor.appendChild(cliente);

  var envolvente = document.createElement("div");
  envolvente.className = "tabla-contenedor";
  var tabla = document.createElement("table");
  tabla.className = "tabla";
  var caption = document.createElement("caption");
  caption.textContent = "Renglones de la venta " + venta.id;
  tabla.appendChild(caption);
  var thead = document.createElement("thead");
  var trHead = document.createElement("tr");
  ["Libro", "ISBN", "Cantidad", "Precio unitario", "Subtotal"].forEach(function (texto) {
    var th = document.createElement("th");
    th.scope = "col";
    th.textContent = texto;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  tabla.appendChild(thead);
  var tbody = document.createElement("tbody");
  venta.renglones.forEach(function (r) {
    var tr = document.createElement("tr");
    agregarCelda(tr, r.titulo);
    agregarCelda(tr, r.isbn);
    agregarCelda(tr, String(r.cantidad));
    agregarCelda(tr, formatearImporte(r.precioUnitario));
    agregarCelda(tr, formatearImporte(r.subtotal));
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
  envolvente.appendChild(tabla);
  contenedor.appendChild(envolvente);

  var total = document.createElement("p");
  total.textContent = "Total: " + formatearImporte(venta.total);
  contenedor.appendChild(total);
  titulo.focus();
}

function mostrarDetalleInicial() {
  var contenedor = document.getElementById("historial-detalle");
  if (!contenedor) return;
  vaciar(contenedor);
  var p = document.createElement("p");
  p.textContent = "Elegí «Ver detalle» en una venta para consultar sus renglones.";
  contenedor.appendChild(p);
}

(function iniciarVentas() {
  renderOpcionesVentaLibro();
  renderRenglones();
  renderHistorial();
  mostrarDetalleInicial();
  document.getElementById("venta-agregar").addEventListener("click", agregarRenglon);
  document.getElementById("ventas-confirmar").addEventListener("click", confirmarVenta);
  document.getElementById("ventas-cancelar").addEventListener("click", cancelarVenta);
})();
