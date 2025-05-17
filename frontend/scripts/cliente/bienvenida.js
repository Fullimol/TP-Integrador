/* Logica de la pagina de bienvenida */

/* obtener nombre y guardarlo en el localStorage. Luego ir a productos.html */

const formBienvenida = document.getElementById('form-bienvenida');
const nombreBienvenida = document.getElementById('nombre-bienvenida');

formBienvenida.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('nombre', nombreBienvenida.value);
    window.location.href = 'productos.html';
});

