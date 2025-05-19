/*
Se usa típicamente para funciones reutilizables o herramientas auxiliares que no dependen de una página específica. Ejemplos:
- Formateo de fechas.
- Validación de formularios.
- Funciones matemáticas comunes.
- Manipulación de strings.

*/

// al dar click en "Salir" borro el nombre del localStorage
const btnSalir = document.querySelector('.salir-button');
btnSalir.addEventListener('click', () => {
    localStorage.removeItem('nombre');
});



/* MODO OSCURO */
const btnDarkMode = document.getElementById("btn-darkMode");
const body = document.body;
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const productosContainer = document.getElementById('productos-container');
const carritoContainer = document.getElementById('carrito-container');

// Función para aplicar o quitar el modo oscuro
function aplicarModoOscuro(activo) {
    const elementos = [body, nav, header, productosContainer, carritoContainer];

    elementos.forEach(el => {
        if (!el) return;
        el.classList.toggle('dark-mode', activo);
    });

    // Guardar el estado en el localStorage
    localStorage.setItem('darkMode', activo ? 'true' : 'false');

    // Cambiar ícono del botón
    btnDarkMode.textContent = activo ? '🌙' : '☀️';
}

// Al cargar la página, aplicar modo oscuro si está activo
const darkModeGuardado = localStorage.getItem('darkMode') === 'true';
aplicarModoOscuro(darkModeGuardado);

// Evento del botón: alterna el modo
btnDarkMode.addEventListener('click', () => {
    const modoActivo = body.classList.contains('dark-mode');
    aplicarModoOscuro(!modoActivo);
});

/* FIN MODO OSCURO */