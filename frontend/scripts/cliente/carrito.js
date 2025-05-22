/* Logica de la pagina del carrito */
const contenedor = document.getElementById('carrito-container');
const btnconfirmar = document.querySelector('.footer-btn');

// obtener carrito del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productos = JSON.parse(localStorage.getItem('productos')) || [];
console.log(carrito);


function mostrarEnCarrito() {

    contenedor.innerHTML = ''; // limpiar antes de mostrar

    carrito.forEach(producto => {
        mostrarTotal();
        const card = document.createElement('div');
        const enCarrito = carrito.some(p => p.id === producto.id);
        card.className = 'card';
        card.dataset.plataforma = producto.plataforma.toLowerCase();
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
                <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p>Plataforma: ${producto.plataforma}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                ${enCarrito ? `<p>Cantidad en carrito: ${carrito.find(p => p.id === producto.id).cantidad}</p>` : ''}
                </div>
                <div class="card-buttons">
                <button class="agregar-button" data-id="${producto.id}">
                    ${enCarrito ? 'Agregar otro más' : 'Agregar al carrito'}
                </button>
                <button class="quitar-button ${enCarrito ? '' : 'hidden'}" data-id="${producto.id}">
                    ${enCarrito ? 'Eliminar uno' : ''}
                </button>
                </div>
            </div>
            `;

        contenedor.appendChild(card);
    });
}


// guardar carrito en localStorage
function agregarAlCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        const producto = productos.find(p => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarEnCarrito(productos);
    console.log(carrito);
}

function quitarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1); // eliminar del carrito
        }
    }

    mostrarTotal();
    mostrarConfirmarCompra()
    guardarCarrito();
    mostrarEnCarrito(productos);
    console.log(carrito);
}

contenedor.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);

    if (e.target.classList.contains('agregar-button')) {
        agregarAlCarrito(id);
    }

    if (e.target.classList.contains('quitar-button')) {
        quitarDelCarrito(id);
    }
});


function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Calculo el total del carrito y guardar en localStorage
function calcularTotal() {
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const totalFormateado = parseFloat(total.toFixed(2));
    localStorage.setItem('total', totalFormateado);
    return totalFormateado;
}



function mostrarTotal() {
    const totalElement = document.getElementById('total-container');
    totalElement.textContent = `Total: $${calcularTotal()}`;
}


// si el carrito esta vacio, NO permito confirmar compra: deshabilito el link de confirmar compra

function mostrarConfirmarCompra() {
    if (carrito.length === 0) {
        btnconfirmar.classList.add('hidden');
    } else {
        btnconfirmar.classList.remove('hidden');
    }
}



mostrarConfirmarCompra();
mostrarEnCarrito();