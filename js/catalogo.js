// Ejercicio 3 — Catálogo generado desde el modelo (ficticio).
// Requiere js/datos.js cargado antes (editoriales, generos, autores, libros).
// Sin innerHTML con datos, sin fetch, sin persistencia.

var editorialPorId = new Map(
  (typeof editoriales !== "undefined" ? editoriales : []).map(function (e) {
    return [e.id, e];
  })
);
var generoPorId = new Map(
  (typeof generos !== "undefined" ? generos : []).map(function (g) {
    return [g.id, g];
  })
);
var autorPorId = new Map(
  (typeof autores !== "undefined" ? autores : []).map(function (a) {
    return [a.id, a];
  })
);

function normalizarBusqueda(texto) {
  var base = texto === undefined || texto === null ? "" : String(texto);
  return base.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarPorTitulo(lista, consulta) {
  var todos = Array.isArray(lista) ? lista : [];
  var norma = normalizarBusqueda(consulta);
  if (norma === "") {
    return todos.slice();
  }
  return todos.filter(function (libro) {
    return normalizarBusqueda(libro.titulo).indexOf(norma) !== -1;
  });
}

function mostrarMensajeCatalogo(texto) {
  var mensaje = document.getElementById("catalogo-mensaje");
  if (!mensaje) {
    return;
  }
  mensaje.textContent = texto === undefined || texto === null ? "" : String(texto);
}

function crearTarjetaLibro(libro) {
  var editorial = editorialPorId.get(libro.editorialId);
  if (!editorial) {
    console.warn("Catálogo: editorial inexistente, se omite libro.", libro.id);
    return null;
  }
  var autoresResueltos = [];
  var ids = Array.isArray(libro.autorIds) ? libro.autorIds : [];
  for (var i = 0; i < ids.length; i++) {
    var autor = autorPorId.get(ids[i]);
    if (!autor) {
      console.warn("Catálogo: autor inexistente, se omite libro.", libro.id, ids[i]);
      return null;
    }
    autoresResueltos.push(autor.nombre);
  }
  if (autoresResueltos.length === 0) {
    console.warn("Catálogo: libro sin autores, se omite.", libro.id);
    return null;
  }
  var generoNombre = "Sin clasificar";
  if (libro.generoId !== undefined && libro.generoId !== null) {
    var genero = generoPorId.get(libro.generoId);
    if (!genero) {
      console.warn("Catálogo: género inexistente, se omite libro.", libro.id);
      return null;
    }
    generoNombre = genero.nombre;
  }

  var tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-libro";
  tarjeta.setAttribute("data-ejemplo", "true");

  var titulo = document.createElement("h4");
  titulo.textContent = libro.titulo;
  tarjeta.appendChild(titulo);

  var isbn = document.createElement("p");
  isbn.textContent = "ISBN: " + libro.isbn;
  tarjeta.appendChild(isbn);

  var editorialP = document.createElement("p");
  editorialP.textContent = "Editorial: " + editorial.nombre;
  tarjeta.appendChild(editorialP);

  var generoP = document.createElement("p");
  generoP.textContent = "Género: " + generoNombre;
  tarjeta.appendChild(generoP);

  var autoresP = document.createElement("p");
  autoresP.textContent = "Autores: " + autoresResueltos.join(", ");
  tarjeta.appendChild(autoresP);

  var precioP = document.createElement("p");
  precioP.textContent = "Precio: $" + libro.precio;
  tarjeta.appendChild(precioP);

  return tarjeta;
}

function renderCatalogo(lista) {
  var contenedor = document.getElementById("catalogo-lista");
  if (!contenedor) {
    return;
  }
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
  var items = Array.isArray(lista) ? lista : [];
  for (var i = 0; i < items.length; i++) {
    var tarjeta = crearTarjetaLibro(items[i]);
    if (tarjeta) {
      contenedor.appendChild(tarjeta);
    }
  }
}

function buscarEnCatalogo() {
  var input = document.getElementById("catalogo-busqueda");
  var consultaOriginal = input ? input.value : "";
  var fuente = typeof libros !== "undefined" ? libros : [];
  var resultados = filtrarPorTitulo(fuente, consultaOriginal);
  renderCatalogo(resultados);
  if (resultados.length === 0) {
    mostrarMensajeCatalogo('No se encontraron libros para "' + consultaOriginal + '".');
  } else {
    mostrarMensajeCatalogo("");
  }
}

function limpiarBusquedaCatalogo() {
  var input = document.getElementById("catalogo-busqueda");
  if (input) {
    input.value = "";
  }
  renderCatalogo(typeof libros !== "undefined" ? libros : []);
  mostrarMensajeCatalogo("");
}

(function iniciarCatalogo() {
  var btnBuscar = document.getElementById("catalogo-buscar");
  var btnLimpiar = document.getElementById("catalogo-limpiar");
  var input = document.getElementById("catalogo-busqueda");
  if (btnBuscar) {
    btnBuscar.addEventListener("click", buscarEnCatalogo);
  }
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", limpiarBusquedaCatalogo);
  }
  if (input) {
    input.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        evento.preventDefault();
        buscarEnCatalogo();
      }
    });
  }
  renderCatalogo(typeof libros !== "undefined" ? libros : []);
  mostrarMensajeCatalogo("");
})();
