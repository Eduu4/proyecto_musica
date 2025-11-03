// Datos base con letra incluida
const cancionesBase = [
  {
    id: 1,
    nombre: "Sweet Child O' Mine",
    artista: "Guns N' Roses",
    dificultad: "Intermedio",
    tags: ["Rock", "Clásico"],
    letra: "She's got a smile that it seems to me..."
  },
  {
    id: 2,
    nombre: "Shape of You",
    artista: "Ed Sheeran",
    dificultad: "Principiante",
    tags: ["Pop", "Moderno"],
    letra: "The club isn't the best place to find a lover..."
  },
  {
    id: 3,
    nombre: "Bohemian Rhapsody",
    artista: "Queen",
    dificultad: "Avanzado",
    tags: ["Rock", "Épico"],
    letra: "Is this the real life? Is this just fantasy?"
  }
];

// Inicializar desde localStorage si no existe
if (!localStorage.getItem("canciones")) {
  localStorage.setItem("canciones", JSON.stringify(cancionesBase));
}

// Funciones de acceso
function obtenerCanciones() {
  return JSON.parse(localStorage.getItem("canciones"));
}

function guardarCanciones(lista) {
  localStorage.setItem("canciones", JSON.stringify(lista));
}