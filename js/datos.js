// Ejercicio 3 — Modelo de datos local (ficticio).
// Solo declara las 5 colecciones; sin DOM, sin fetch, sin persistencia.
// Libros, clientes y ventas son valores iniciales: js/persistencia.js los reemplaza por lo guardado (Ej. 6).
var editoriales = [
  { id: "ed1", nombre: "Sur Ejemplar" },
  { id: "ed2", nombre: "Cosmos Ficticio" },
  { id: "ed3", nombre: "Hoja Ficticia" }
];

var generos = [
  { id: "gen1", nombre: "Novela" },
  { id: "gen2", nombre: "Cuentos" }
];

var autores = [
  { id: "aut1", nombre: "A. Ejemplo" },
  { id: "aut2", nombre: "B. Muestra" },
  { id: "aut3", nombre: "C. Prueba" },
  { id: "aut4", nombre: "D. Ensayo" }
];

var libros = [
  {
    id: "lib1",
    titulo: "El jardín de los senderos",
    isbn: "978-999-000001-1",
    editorialId: "ed1",
    generoId: "gen1",
    autorIds: ["aut1"],
    precio: 12500
  },
  {
    id: "lib2",
    titulo: "Manual básico de astronomía",
    isbn: "978-999-000002-8",
    editorialId: "ed2",
    generoId: null,
    autorIds: ["aut2"],
    precio: 8900
  },
  {
    id: "lib3",
    titulo: "Cuentos breves para tardes largas",
    isbn: "978-999-000003-5",
    editorialId: "ed3",
    generoId: "gen2",
    autorIds: ["aut3", "aut4"],
    precio: 6750
  },
  {
    id: "lib4",
    titulo: "Crónicas del faro interior",
    isbn: "978-999-000004-2",
    editorialId: "ed1",
    generoId: "gen1",
    autorIds: ["aut1", "aut3"],
    precio: 9900
  },
  {
    id: "lib5",
    titulo: "Ensayos sobre el tiempo breve",
    isbn: "978-999-000005-9",
    editorialId: "ed3",
    generoId: "gen2",
    autorIds: ["aut4"],
    precio: 7400
  },
  {
    id: "lib6",
    titulo: "Cartas desde el observatorio",
    isbn: "978-999-000006-6",
    editorialId: "ed2",
    generoId: "gen1",
    autorIds: ["aut2", "aut4"],
    precio: 11200
  }
];

var clientes = [
  { id: "cli1", nombre: "Ana Pérez Ejemplo", email: "ana.ejemplo@ficticio.com" },
  { id: "cli2", nombre: "Bruno Gómez Muestra", email: "bruno.muestra@ficticio.com" },
  { id: "cli3", nombre: "Carla Ruiz Prueba", email: "carla.prueba@ficticio.com" }
];

// Ejercicio 5 — Ventas confirmadas. Cada renglón guarda una copia del título y
// del precio unitario al confirmar (valor histórico, no se relee del catálogo).
var ventas = [];
