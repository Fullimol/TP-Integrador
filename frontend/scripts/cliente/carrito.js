/* Logica de la pagina del carrito */
    const contenedor = document.getElementById('carrito-container');

// obtener carrito del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productos = JSON.parse(localStorage.getItem('productos')) || [];
console.log(carrito);


function mostrarEnCarrito(){

    contenedor.innerHTML = ''; // limpiar antes de mostrar

    carrito.forEach(producto => {
        const card = document.createElement('div');
        const enCarrito = carrito.some(p => p.id === producto.id);
        card.className = 'card';
        card.dataset.plataforma = producto.plataforma.toLowerCase();
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
              <h3>${producto.nombre}</h3>
              <p>Plataforma: ${producto.plataforma}</p>
              <p>Precio: $${producto.precio.toFixed(2)}</p>

              <button class="agregar-button" data-id="${producto.id}">
                ${enCarrito ? 'Agregar otro más' : 'Agregar al carrito'}
              </button>

              ${enCarrito ? `<p>Cantidad en carrito: ${carrito.find(p => p.id === producto.id).cantidad}</p>` : ''}

            <button class="quitar-button ${enCarrito ? '' : 'hidden'}" data-id="${producto.id}">
                ${enCarrito ? 'Eliminar uno' : ''}
              </button>

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

mostrarEnCarrito();