/* Logica de la pagina donde se muestran los productos */
const contenedor = document.getElementById('productos-container');
const todosButton = document.querySelector('button[name="todos-button"]');
const xboxButton = document.querySelector('button[name="xbox-button"]');
const playButton = document.querySelector('button[name="play-button"]');
const siguienteButton = document.getElementById('siguiente-button');
const anteriorButton = document.getElementById('anterior-button');
const textoPaginaActual = document.getElementById('pagina-actual');

const url = "http://localhost:3000/juegos/get";

let carrito = [];
let productos = [];
let paginaActual = 1;
const productosPorPagina = 8;

console.log(localStorage.getItem('nombre')); // obtener nombre del localStorage

function obtenerProductos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Filtrar productos disponibles
            productos = data.filter(p => p.disponible !== false);

            carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            mostrarProductosPaginados();
            console.log("PRODUCTOS", productos);
            console.log("CARRITO", carrito);
        })
        .catch(error => console.error('Error al cargar productos:', error));
}


function mostrarProductosPaginados() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);
    textoPaginaActual.innerHTML = `Pagina ${paginaActual} de ${Math.ceil(productos.length / productosPorPagina)}`;
    mostrarProductos(productosPagina);
}


function paginaSiguiente() {
    paginaActual += 1;
    obtenerProductos();
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual -= 1;
        obtenerProductos();
    }
}

siguienteButton.addEventListener("click", paginaSiguiente);
anteriorButton.addEventListener("click", paginaAnterior);



function mostrarProductos(productos) {
    contenedor.innerHTML = ''; // limpiar antes de mostrar

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.plataforma = producto.plataforma.toLowerCase();

        // Verificar si ya está en el carrito
        const enCarrito = carrito.some(p => p.id === producto.id);

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
              <h3>${producto.nombre}</h3>
              <p>Plataforma: ${producto.plataforma}</p>
              <p>Precio: $${Number(producto.precio).toFixed(2)}</p>

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



// filtrar los productos

//                  (!)   TENGO EL ERROR QUE LA PAGINA NO MUESTRA EL FILTRO SI LA RECARGO, O SI AGREGO UN PRODUCTO AL CARRITO, EL FILTRO SE VA. Tampoco trae los datos de la otras paginas.
let filtro = localStorage.getItem('filtro') || 'todos';
filtrarProductos(filtro);


todosButton.addEventListener('click', () => {
    localStorage.setItem('filtro', 'todos');
    filtrarProductos('todos');
});

xboxButton.addEventListener('click', () => {
    localStorage.setItem('filtro', 'xbox');
    filtrarProductos('xbox');
});

playButton.addEventListener('click', () => {
    localStorage.setItem('filtro', 'playstation');
    filtrarProductos('playstation');
});



function filtrarProductos(filtro) {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const plataforma = card.dataset.plataforma;
        if (filtro === 'todos' || plataforma === filtro) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


// guardar carrito en localStorage
function agregarAlCarrito(id) {
    const index = carrito.findIndex(p => p.id === id); //Si el producto NO ESTA el resultado es -1

    if (index !== -1) { //Si el producto ya esta en el carrito se le suma 1 a la canidad de ese producto
        carrito[index].cantidad += 1;
    } else {
        const producto = productos.find(p => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarProductosPaginados();
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
    mostrarProductosPaginados();
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

obtenerProductos();