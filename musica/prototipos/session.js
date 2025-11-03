document.getElementById("panel-central").innerHTML += `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h4>🎵 Sesión: "${cancion.nombre}"</h4>
    <div>
      <span class="badge bg-success">Activa</span>
      <span class="ms-3 progress-box">⏱ ${cancion.tiempoActual} / ${cancion.duracion}</span>
      <button class="btn btn-danger btn-sm ms-3">Finalizar</button>
    </div>
  </div>
`;