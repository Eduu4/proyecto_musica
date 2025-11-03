document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("login-error");

  const usuarios = [
    { email: "noe@guitarraclub.com", password: "1234", nombre: "Noe" },
    { email: "leo@guitarraclub.com", password: "abcd", nombre: "Leo" }
  ];

  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    window.location.href = "biblioteca.html";
  } else {
    errorBox.classList.remove("d-none");
  }
});