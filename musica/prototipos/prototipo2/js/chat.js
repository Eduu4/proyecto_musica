document.getElementById("sidebar-chat").innerHTML = `
  <h6>💬 Chat en vivo</h6>
  <div class="chat-box mb-3" id="chat-mensajes">
    <div><strong>Noe:</strong> ¿Repetimos el puente?</div>
    <div><strong>Leo:</strong> Dale, desde el compás 12</div>
  </div>
  <input type="text" class="form-control" id="chat-input" placeholder="Escribe un mensaje...">
`;

escucharEvento('chat_mensaje', (msg) => {
  const chatBox = document.getElementById("chat-mensajes");
  chatBox.innerHTML += `<div><strong>${msg.usuario}:</strong> ${msg.texto}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});

document.getElementById("chat-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const texto = e.target.value.trim();
    if (texto !== "") {
      emitirEvento('chat_mensaje', { usuario: 'Tú', texto });
      e.target.value = "";
    }
  }
});