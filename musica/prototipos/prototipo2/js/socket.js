const socketSimulado = new EventTarget();

function emitirEvento(tipo, payload) {
  const evento = new CustomEvent(tipo, { detail: payload });
  socketSimulado.dispatchEvent(evento);
  console.log(`[Emitido] ${tipo}:`, payload);
}

function escucharEvento(tipo, callback) {
  socketSimulado.addEventListener(tipo, (e) => {
    console.log(`[Recibido] ${tipo}:`, e.detail);
    callback(e.detail);
  });
}

// Simulación automática
setTimeout(() => emitirEvento('nota_actual', 'A'), 3000);
setTimeout(() => emitirEvento('chat_mensaje', { usuario: 'Leo', texto: '¡Cambio de ritmo en el compás 8!' }), 5000);
