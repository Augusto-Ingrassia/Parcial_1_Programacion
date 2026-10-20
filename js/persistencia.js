// Ejercicio 6 — Persistencia en localStorage de libros, clientes y ventas.
// Requiere js/datos.js cargado antes y js/catalogo.js cargado después, para que
// las colecciones ya estén reemplazadas cuando se dibuja la página.
// Sin innerHTML, sin fetch, sin librerías. Editoriales, géneros y autores no se guardan.

// Una clave por colección: así se puede cambiar un precio en lalibre.libros sin tocar las ventas.
var CLAVES_ALMACENAMIENTO = {
  libros: "lalibre.libros",
  clientes: "lalibre.clientes",
  ventas: "lalibre.ventas"
};

// Guarda la colección completa como arreglo JSON. Devuelve true si pudo guardar.
// Si el navegador bloquea el almacenamiento o está lleno, la operación sigue en memoria.
function guardarColeccion(clave, lista) {
  try {
    localStorage.setItem(clave, JSON.stringify(lista));
    return true;
  } catch (e) {
    console.warn("Persistencia: no se pudo guardar " + clave + "; los datos siguen solo en memoria.", e);
    return false;
  }
}

// Devuelve el arreglo guardado en clave. Si la clave no existe (primer inicio) guarda y
// devuelve los ejemplos. Si no se puede leer, o el valor no es JSON o no es un arreglo,
// devuelve los ejemplos sin escribir: el valor dañado queda intacto hasta el próximo guardado.
function cargarColeccion(clave, ejemplos) {
  var texto = null;
  try {
    texto = localStorage.getItem(clave);
  } catch (e) {
    console.warn("Persistencia: no se pudo leer " + clave + "; se usan los datos de ejemplo.", e);
    return ejemplos;
  }
  if (texto === null) {
    guardarColeccion(clave, ejemplos);
    return ejemplos;
  }
  try {
    var guardado = JSON.parse(texto);
    if (Array.isArray(guardado)) return guardado;
    console.warn("Persistencia: " + clave + " no contiene un arreglo; se usan los datos de ejemplo.");
  } catch (e) {
    console.warn("Persistencia: " + clave + " no es JSON válido; se usan los datos de ejemplo.", e);
  }
  return ejemplos;
}

function guardarLibros() {
  return guardarColeccion(CLAVES_ALMACENAMIENTO.libros, libros);
}

function guardarClientes() {
  return guardarColeccion(CLAVES_ALMACENAMIENTO.clientes, clientes);
}

function guardarVentas() {
  return guardarColeccion(CLAVES_ALMACENAMIENTO.ventas, ventas);
}

// Lo guardado reemplaza a los ejemplos de js/datos.js (nunca se suman).
(function iniciarPersistencia() {
  libros = cargarColeccion(CLAVES_ALMACENAMIENTO.libros, libros);
  clientes = cargarColeccion(CLAVES_ALMACENAMIENTO.clientes, clientes);
  ventas = cargarColeccion(CLAVES_ALMACENAMIENTO.ventas, ventas);
})();
