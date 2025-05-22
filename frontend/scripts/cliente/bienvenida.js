/* Logica de la pagina de bienvenida */

/* obtener nombre y guardarlo en el localStorage. Luego ir a productos.html */

const formBienvenida = document.getElementById('form-bienvenida');
const nombreBienvenida = document.getElementById('nombre-bienvenida');
const btnBienvenida = document.getElementById('btn-bienvenida');


// limpio todo el localStorage cada vez que cargo la pag bienvenida:
localStorage.clear();

formBienvenida.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('nombre', nombreBienvenida.value);
    window.location.href = 'productos.html';
});

// vericar que el input NO esté vacio:

function verificarInputNombre() {
    const nombre = nombreBienvenida.value.trim();

    if (nombre.length < 3) {
        btnBienvenida.classList.add('deshabilitarButton');
    } else {
        btnBienvenida.classList.remove('deshabilitarButton');
    }
}

nombreBienvenida.addEventListener('input', verificarInputNombre);