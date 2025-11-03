document.getElementById("sidebar-participantes").innerHTML = `
  <h5>👥 Participantes</h5>
  <ul class="list-group list-group-flush">
    ${participantes.map(p => `
      <li class="list-group-item bg-dark text-white d-flex justify-content-between">
        ${p.rol === 'cantante' ? '🎤' : p.rol === 'guitarrista' ? '🎸' : '👀'} ${p.nombre}
        <span class="badge bg-${p.estado === 'conectado' ? 'success' : 'warning'}">${p.rol}</span>
      </li>`).join("")}
  </ul>

  <hr class="text-white">
  <h6>🔧 Herramientas</h6>
  <div class="mb-3">
    <label class="form-label">Afinador</label>
    <select class="form-select form-select-sm">
      <option>C</option><option>D</option><option>E</option><option>F</option><option>G</option><option>A</option><option>B</option>
    </select>
    <div class="text-info mt-1">Nota actual: E (82.41 Hz)</div>
  </div>
  <div>
    <label class="form-label">Metrónomo</label>
    <input type="number" class="form-control form-control-sm" value="120">
  </div>
`;
