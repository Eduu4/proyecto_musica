// Biblioteca controller: lista, búsqueda, crear/editar, favoritos, historial, compartir
const buscador = document.getElementById("buscador");
const contenedor = document.getElementById("lista-canciones");
const contenedorHistorial = document.getElementById("lista-historial");
const tabTodas = document.getElementById('tab-todas');
const tabFavoritos = document.getElementById('tab-favoritos');
const tabHistorial = document.getElementById('tab-historial');

let currentTab = 'todas'; // 'todas' | 'favoritos' | 'historial'

const usuario = window.validarUsuario ? validarUsuario() : JSON.parse(localStorage.getItem('usuarioActivo'));

let cancionesDisponibles = obtenerCanciones() || [];
let modoEdicion = null;

function keyFavoritos() { return `favoritos_${usuario.email}`; }
function keyHistorial() { return `historial_${usuario.email}`; }

function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(keyFavoritos())) || [];
}

function guardarFavoritos(lista) {
  localStorage.setItem(keyFavoritos(), JSON.stringify(lista));
}

function agregarHistorial(entry) {
  const h = JSON.parse(localStorage.getItem(keyHistorial())) || [];
  h.unshift(entry); // más reciente al inicio
  if (h.length > 50) h.pop();
  localStorage.setItem(keyHistorial(), JSON.stringify(h));
}

function renderCanciones(filtro = "") {
  // delegate to specific renderer based on active tab
  if (currentTab === 'favoritos') {
    renderFavoritos(filtro);
  } else if (currentTab === 'historial') {
    renderHistorial();
  } else {
    renderTodas(filtro);
  }
}

function renderCard(c, favoritos) {
  const isFav = (favoritos || []).includes(c.id);
  const card = document.createElement("div");
  card.className = "col-md-4 mb-3";
  card.innerHTML = `
    <div class="card bg-dark text-white h-100">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="card-title">${c.nombre}</h5>
          <div>
            <button class="btn btn-sm ${isFav ? 'btn-warning' : 'btn-outline-light'} me-1" onclick="toggleFavorito(${c.id})">${isFav ? '★' : '☆'}</button>
            <button class="btn btn-sm btn-outline-success me-1" onclick="compartirCancion(${c.id})">🔗</button>
          </div>
        </div>
        <p class="card-text">🎤 ${c.artista}<br>🎯 ${c.dificultad || ''}</p>
        <div class="mb-2">${(c.tags||[]).map(tag => `<span class="badge bg-info me-1">${tag}</span>`).join("")}</div>
        <div class="mt-auto d-flex justify-content-between">
          <div>
            <button class="btn btn-light btn-sm me-2" onclick="abrirCancion(${c.id})">Abrir</button>
            <button class="btn btn-outline-info btn-sm" onclick="editarCancion(${c.id})">Editar</button>
          </div>
          <small class="text-muted">ID: ${c.id}</small>
        </div>
      </div>
    </div>
  `;
  return card;
}

function renderTodas(filtro) {
  contenedor.innerHTML = "";
  cancionesDisponibles = obtenerCanciones() || [];
  const favoritos = obtenerFavoritos();

  const filtradas = cancionesDisponibles.filter(c => {
    const texto = `${c.nombre} ${c.artista} ${(c.tags || []).join(" ")}`.toLowerCase();
    return texto.includes((filtro || "").toLowerCase());
  });

  if (filtradas.length === 0) {
    contenedor.innerHTML = `<div class="text-center text-muted">No se encontraron canciones.</div>`;
    return;
  }

  filtradas.forEach(c => contenedor.appendChild(renderCard(c, favoritos)));
}

function renderFavoritos(filtro) {
  contenedor.innerHTML = "";
  cancionesDisponibles = obtenerCanciones() || [];
  const favoritos = obtenerFavoritos();
  const favList = cancionesDisponibles.filter(c => favoritos.includes(c.id));
  const filtradas = favList.filter(c => `${c.nombre} ${c.artista} ${(c.tags||[]).join(' ')}`.toLowerCase().includes((filtro||"").toLowerCase()));

  if (filtradas.length === 0) {
    contenedor.innerHTML = `<div class="text-center text-muted">No hay favoritos.</div>`;
    return;
  }

  filtradas.forEach(c => contenedor.appendChild(renderCard(c, favoritos)));
}

function renderHistorial() {
  contenedorHistorial.innerHTML = "";
  const historial = JSON.parse(localStorage.getItem(keyHistorial())) || [];
  if (historial.length === 0) {
    contenedorHistorial.innerHTML = `<div class="text-center text-muted">Historial vacío.</div>`;
    return;
  }

  historial.forEach(h => {
    const row = document.createElement('div');
    row.className = 'col-12 mb-2';
    row.innerHTML = `
      <div class="card bg-dark text-white">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <strong>${h.nombre}</strong> — <small class="text-muted">${h.artista}</small>
            <div class="text-muted small">${new Date(h.fecha).toLocaleString()}</div>
          </div>
          <div>
            <button class="btn btn-sm btn-light me-2" onclick="abrirCancion(${h.id})">Reproducir</button>
          </div>
        </div>
      </div>
    `;
    contenedorHistorial.appendChild(row);
  });
}

// Expose functions globally so buttons inline onclick can call them
window.abrirCancion = function(id) {
  const seleccionada = cancionesDisponibles.find(c => c.id === id);
  if (!seleccionada) return alert('Canción no encontrada');
  localStorage.setItem("cancionSeleccionada", JSON.stringify(seleccionada));
  // agregar al historial del usuario
  agregarHistorial({ id: seleccionada.id, nombre: seleccionada.nombre, artista: seleccionada.artista, fecha: new Date().toISOString() });
  window.location.href = "dashboard.html";
}

window.editarCancion = function(id) {
  const c = cancionesDisponibles.find(c => c.id === id);
  if (!c) return alert('No encontrada');
  document.getElementById("form-nombre").value = c.nombre || '';
  document.getElementById("form-artista").value = c.artista || '';
  document.getElementById("form-dificultad").value = c.dificultad || 'Principiante';
  document.getElementById("form-tags").value = (c.tags || []).join(", ");
  document.getElementById("form-letra").value = c.letra || '';
  document.getElementById("form-titulo").textContent = "Editar canción";
  document.getElementById("form-cancelar").classList.remove("d-none");
  modoEdicion = id;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function limpiarFormulario() {
  document.getElementById("form-nombre").value = "";
  document.getElementById("form-artista").value = "";
  document.getElementById("form-dificultad").value = "Principiante";
  document.getElementById("form-tags").value = "";
  document.getElementById("form-letra").value = "";
  document.getElementById("form-titulo").textContent = "Crear nueva canción";
  document.getElementById("form-cancelar").classList.add("d-none");
  modoEdicion = null;
}

document.getElementById("form-guardar").addEventListener("click", () => {
  const nombre = document.getElementById("form-nombre").value.trim();
  const artista = document.getElementById("form-artista").value.trim();
  const dificultad = document.getElementById("form-dificultad").value;
  const tags = document.getElementById("form-tags").value.split(",").map(t => t.trim()).filter(t => t);
  const letra = document.getElementById("form-letra").value.trim();

  if (!nombre || !artista) return alert("Nombre y artista son obligatorios");

  cancionesDisponibles = obtenerCanciones() || [];

  if (modoEdicion) {
    const index = cancionesDisponibles.findIndex(c => c.id === modoEdicion);
    if (index === -1) return alert('No se puede editar, canción no encontrada');
    cancionesDisponibles[index] = { ...cancionesDisponibles[index], nombre, artista, dificultad, tags, letra };
  } else {
    const nuevoId = cancionesDisponibles.length === 0 ? 1 : Math.max(...cancionesDisponibles.map(c => c.id)) + 1;
    cancionesDisponibles.push({ id: nuevoId, nombre, artista, dificultad, tags, letra });
  }

  guardarCanciones(cancionesDisponibles);
  renderCanciones(buscador.value || "");
  limpiarFormulario();
});

document.getElementById("form-cancelar").addEventListener("click", limpiarFormulario);
buscador.addEventListener("input", e => renderCanciones(e.target.value));

// pestañas
tabTodas.addEventListener('click', () => { currentTab = 'todas'; contenedorHistorial.classList.add('d-none'); contenedor.classList.remove('d-none'); renderCanciones(buscador.value || ''); tabTodas.classList.add('active'); tabFavoritos.classList.remove('active'); tabHistorial.classList.remove('active'); });
tabFavoritos.addEventListener('click', () => { currentTab = 'favoritos'; contenedorHistorial.classList.add('d-none'); contenedor.classList.remove('d-none'); renderCanciones(buscador.value || ''); tabFavoritos.classList.add('active'); tabTodas.classList.remove('active'); tabHistorial.classList.remove('active'); });
tabHistorial.addEventListener('click', () => { currentTab = 'historial'; contenedor.classList.add('d-none'); contenedorHistorial.classList.remove('d-none'); renderCanciones(); tabHistorial.classList.add('active'); tabTodas.classList.remove('active'); tabFavoritos.classList.remove('active'); });

// favoritos
window.toggleFavorito = function(id) {
  const fav = obtenerFavoritos();
  const idx = fav.indexOf(id);
  if (idx === -1) fav.push(id); else fav.splice(idx,1);
  guardarFavoritos(fav);
  // re-render current view
  if (currentTab === 'favoritos') renderFavoritos(buscador.value || ''); else renderCanciones(buscador.value || '');
}

// compartir (simulado): genera un token con información mínima
window.compartirCancion = function(id) {
  const c = (cancionesDisponibles || []).find(x => x.id === id);
  if (!c) return alert('No encontrada');
  const token = btoa(JSON.stringify({ id: c.id, nombre: c.nombre, artista: c.artista }));
  const shareUrl = `${location.origin}${location.pathname}#share=${token}`;
  // Simulación: pedimos al usuario copiar el enlace
  window.prompt('Enlace para compartir (copiar y pegar):', shareUrl);
}

// inicializar
renderCanciones();

// expose some helpers for debugging
window.obtenerFavoritos = obtenerFavoritos;
window.obtenerHistorial = function(){ return JSON.parse(localStorage.getItem(keyHistorial())) || []; };
