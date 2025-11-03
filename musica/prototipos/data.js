const participantes = [
  { nombre: 'Noe', rol: 'cantante', estado: 'conectado' },
  { nombre: 'Leo', rol: 'guitarrista', estado: 'sincronizando' },
  { nombre: 'Ana', rol: 'observador', estado: 'conectado' }
];

const cancion = {
  nombre: "Sweet Child O' Mine",
  duracion: "04:12",
  notaActual: "E",
  tiempoActual: "01:23",
  letra: "She's got a smile that it seems to me...",
  tablatura: "E|----------------|\nB|----------------|\nG|--0--2--4--2--0--|",
  notas: ["E", "G", "A", "B", "C", "D"],
  progreso: { Noe: 85, Leo: 72 },
  comentarios: [
    { usuario: "Noe", texto: "¡Arrancamos en 3, 2, 1!" },
    { usuario: "Leo", texto: "Listo 🎸" },
    { usuario: "Ana", texto: "¡Qué buena intro!" }
  ]
};
