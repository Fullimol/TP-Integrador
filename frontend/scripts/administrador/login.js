document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
const errorMsg = document.getElementById("errorMensaje");

  // Simulación de validacion de credenciales
  const adminValido = {
    email: "admin@gamestore.com",
    password: "1234"
  };

  if (email === adminValido.email && password === adminValido.password) {
    localStorage.setItem("adminLogged", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Correo o contraseña incorrectos.";
  }
});
