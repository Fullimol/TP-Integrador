/* Logica de la pagina del carrito */
const contenedor = document.getElementById('carrito-container');
const btnConfirmar = document.getElementById("confirmarCompraButton")
const btnGenerarTicket = document.getElementById("generarTicketButton");
const modal = document.getElementById("modalConfirmarCompra");
const confirmarCompraButton = document.getElementById("confirmarCompraButton");
const cancelarCompraButton = document.getElementById("cancelarCompraButton");

// obtener carrito del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productos = [];
console.log(carrito);



function mostrarEnCarrito() {

    contenedor.innerHTML = ''; // limpiar antes de mostrar

    carrito.forEach(producto => {
        mostrarTotal();
        const card = document.createElement('div');
        const enCarrito = carrito.some(p => p.id === producto.id); //devuelve true si el producto ya está en el carrito
        card.className = 'card';
        card.dataset.plataforma = producto.plataforma.toLowerCase();
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
                <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p>Plataforma: ${producto.plataforma}</p>
                <p>Precio: $${Number(producto.precio).toFixed(2)}</p>
                ${enCarrito ? `<p>Cantidad en carrito: ${carrito.find(p => p.id === producto.id).cantidad}</p>` : ''}
                </div>
                <div class="card-buttons">
                <button class="agregar-button button" data-id="${producto.id}">
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
    const index = carrito.findIndex(p => p.id === id); //Si el producto NO ESTA el resultado es -1

    if (index !== -1) { //Si el producto ya esta en el carrito se le suma 1 a la cantidad de ese producto
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

    if (index !== -1) { //Si el índice no es -1, entonces existe y se puede eliminar.
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1; //resto 1 cantidad y actualizo el carrito
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

contenedor.addEventListener('click', (e) => { // Escucha todos los clics que ocurren dentro del elemento contenedor
    const id = parseInt(e.target.dataset.id); // aca abtengo el id del producto (card) al que se le dio click

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
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0); //recorre todo el array y acumula el resultado.
    const totalFormateado = parseFloat(total.toFixed(2)); //convierte el número a string con 2 decimales
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
        btnConfirmar.classList.add('hidden');
    } else {
        btnConfirmar.classList.remove('hidden');
    }
}

confirmarCompraButton.addEventListener("click", () => {
    modal.classList.add("mostrar");
});

cancelarCompraButton.addEventListener("click", () => {
    modal.classList.remove("mostrar");
});

generarTicketButton.addEventListener("click", () => {
    window.location.href = "ticket.html";
});


mostrarConfirmarCompra();
mostrarEnCarrito();