// js/session.js

export function validarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) {
    window.location.href = "index.html";
  }
  return usuario;
}

export function validarCancion() {
  const cancion = JSON.parse(localStorage.getItem("cancionSeleccionada"));
  if (!cancion) {
    window.location.href = "biblioteca.html";
  }
  return cancion;
}

function volverABiblioteca() {
  localStorage.removeItem("cancionSeleccionada");
  window.location.href = "biblioteca.html";
}

// make functions available as globals too so old script includes keep working
if (typeof window !== 'undefined') {
  window.validarUsuario = validarUsuario;
  window.validarCancion = validarCancion;
  window.volverABiblioteca = volverABiblioteca;
}

// also export volverABiblioteca for module imports
export { volverABiblioteca };
