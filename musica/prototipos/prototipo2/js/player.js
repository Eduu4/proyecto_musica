// Render player view using localStorage (no reliance on globals)
const cancion = JSON.parse(localStorage.getItem('cancionSeleccionada')) || {};
const usuario = JSON.parse(localStorage.getItem('usuarioActivo')) || { email: 'anon' };

function keyFavoritos() { return `favoritos_${usuario.email}`; }
function obtenerFavoritos() { return JSON.parse(localStorage.getItem(keyFavoritos())) || []; }
function guardarFavoritos(lista) { localStorage.setItem(keyFavoritos(), JSON.stringify(lista)); }
function isFavorito(id) { return obtenerFavoritos().includes(id); }
function toggleFavoritoLocal(id) {
  const fav = obtenerFavoritos();
  const idx = fav.indexOf(id);
  if (idx === -1) fav.push(id); else fav.splice(idx,1);
  guardarFavoritos(fav);
  return fav.includes(id);
}

const favoritoInicial = isFavorito(cancion.id);

document.getElementById("panel-central").innerHTML += `
  <div class="d-flex justify-content-between align-items-start mb-3">
    <div>
      <h3 class="mb-0">${cancion.nombre || 'Sin canción'}</h3>
      <div class="text-muted">${cancion.artista || ''}</div>
    </div>
    <div>
      <button id="btn-favorito" class="btn ${favoritoInicial ? 'btn-warning' : 'btn-outline-light'} me-2">${favoritoInicial ? '★ Favorito' : '☆ Favorito'}</button>
      <button id="btn-compartir" class="btn btn-outline-success">🔗 Compartir</button>
    </div>
  </div>

  <ul class="nav nav-tabs mb-3" id="contentTabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#letra" type="button">Letra</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tablatura" type="button">Tablatura</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#notas" type="button">Notas</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#progreso" type="button">Progreso</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#comentarios" type="button">Comentarios</button>
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade show active" id="letra">
      <div class="letra-box">${cancion.letra || ''}</div>
    </div>
    <div class="tab-pane fade" id="tablatura">
      <div class="tablatura-box">${cancion.tablatura || ''}</div>
    </div>
    <div class="tab-pane fade" id="notas">
      <div class="notas-box">${(cancion.notas || []).join(', ')}</div>
    </div>
    <div class="tab-pane fade" id="progreso">
      <div class="tablatura-box">
        ${cancion.progreso ? `🎯 ${Object.entries(cancion.progreso).map(([u,v]) => `${u}: ${v}%`).join('<br>')}` : ''}
      </div>
    </div>
    <div class="tab-pane fade" id="comentarios">
      <div class="tablatura-box">
        ${(cancion.comentarios || []).map(c => `💬 ${c.usuario}: ${c.texto}`).join('<br>')}
      </div>
    </div>
  </div>
`;

// favorite button behavior
const btnFav = document.getElementById('btn-favorito');
if (btnFav) {
  btnFav.addEventListener('click', () => {
    const nowFav = toggleFavoritoLocal(cancion.id);
    btnFav.className = nowFav ? 'btn btn-warning' : 'btn btn-outline-light';
    btnFav.textContent = nowFav ? '★ Favorito' : '☆ Favorito';
  });
}

// compartir
const btnShare = document.getElementById('btn-compartir');
if (btnShare) {
  btnShare.addEventListener('click', () => {
    const token = btoa(JSON.stringify({ id: cancion.id, nombre: cancion.nombre, artista: cancion.artista }));
    const shareUrl = `${location.origin}${location.pathname}#share=${token}`;
    window.prompt('Enlace para compartir (copiar y pegar):', shareUrl);
  });
}

function volverABiblioteca() {
  localStorage.removeItem("cancionSeleccionada");
  window.location.href = "biblioteca.html";
}