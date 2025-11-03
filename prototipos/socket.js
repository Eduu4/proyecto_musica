// Simulador de WebSocket usando EventTarget
const socketSimulado = new EventTarget();

// Función para emitir eventos
function emitirEvento(tipo, payload) {
  const evento = new CustomEvent(tipo, { detail: payload });
  socketSimulado.dispatchEvent(evento);
  console.log(`[Emitido] ${tipo}:`, payload);
}

// Función para escuchar eventos
function escucharEvento(tipo, callback) {
  socketSimulado.addEventListener(tipo, (e) => {
    console.log(`[Recibido] ${tipo}:`, e.detail);
    callback(e.detail);
  });
}

setTimeout(() => {
  emitirEvento('nota_actual', 'A');
}, 3000);

setTimeout(() => {
  emitirEvento('chat_mensaje', { usuario: 'Leo', texto: '¡Cambio de ritmo en el compás 8!' });
}, 5000);
