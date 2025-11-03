document.getElementById("panel-central").innerHTML += `
  <div class="text-center mb-4">
    <h5>Nota actual: <span class="text-info fs-4">${cancion.notaActual}</span></h5>
    <div class="progress mb-3">
      <div class="progress-bar bg-info" style="width: 35%;">${cancion.tiempoActual}</div>
    </div>
    <div>
      <button class="btn btn-success me-2">▶️ Play</button>
      <button class="btn btn-secondary me-2">⏸ Pause</button>
      <button class="btn btn-outline-light me-2">⏮</button>
      <button class="btn btn-outline-light">⏭</button>
    </div>
  </div>

  <ul class="nav nav-tabs mb-3">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#letra">Letra</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tablatura">Tablatura</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#notas">Notas</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#progreso">Progreso</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#comentarios">Comentarios</a></li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade show active" id="letra"><div class="letra-box">${cancion.letra}</div></div>
    <div class="tab-pane fade" id="tablatura"><div class="tablatura-box">${cancion.tablatura}</div></div>
    <div class="tab-pane fade" id="notas"><div class="notas-box">${cancion.notas.join(", ")}</div></div>
    <div class="tab-pane fade" id="progreso">
      <div class="tablatura-box">
        🎯 Noe: ${cancion.progreso.Noe}% completado<br>
        🎯 Leo: ${cancion.progreso.Leo}% completado
      </div>
    </div>
    <div class="tab-pane fade" id="comentarios">
      <div class="tablatura-box">
        ${cancion.comentarios.map(c => `💬 ${c.usuario}: ${c.texto}`).join("<br>")}
      </div>
    </div>
  </div>
`;

// Escuchar evento 'play'
escucharEvento('play', () => {
  document.querySelector('.progress-bar').classList.add('bg-success');
});

// Escuchar evento 'nota_actual'
escucharEvento('nota_actual', (nota) => {
  document.querySelector('.text-info.fs-4').textContent = nota;
});

// Emitir evento al hacer clic en Play
document.querySelector('.btn-success').addEventListener('click', () => {
  emitirEvento('play', { usuario: 'Noe' });
  emitirEvento('nota_actual', 'G');
});
