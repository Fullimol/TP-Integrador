/* Logica de la pagina donde se muestran los productos */
const contenedor = document.getElementById('productos-container');
const todosButton = document.querySelector('button[name="todos-button"]');
const xboxButton = document.querySelector('button[name="xbox-button"]');
const playButton = document.querySelector('button[name="play-button"]');

const url = "../../../backend/productos.json";

let carrito = [];
let productos = [];

console.log(localStorage.getItem('nombre')); // obtener nombre del localStorage
localStorage.removeItem('carrito'); //vaciar local storage carrito:


function obtenerProductos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
            console.log("PRODUCTOS", productos);
        })
        .catch(error => console.error('Error al cargar productos:', error));

}

function mostrarProductos(productos) {
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.plataforma = producto.plataforma.toLowerCase(); // necesario para filtrar

        card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-content">
          <h3>${producto.nombre}</h3>
          <p>Plataforma: ${producto.plataforma}</p>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <button class="agregar-button" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;

        contenedor.appendChild(card);
    });
}


// filtrar los productos
todosButton.addEventListener('click', () => {
  filtrarProductos('todos');
});

xboxButton.addEventListener('click', () => {
  filtrarProductos('xbox');
});

playButton.addEventListener('click', () => {
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
contenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar-button')) {
    const productoId = parseInt(e.target.getAttribute('data-id'));
    fetch(url)
      .then(res => res.json())
      .then(productos => {
        const producto = productos.find(p => p.id === productoId);
        if (producto) {
          carrito.push(producto);
          guardarCarrito();
          console.log(carrito);
        }
      });
  }
});

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


obtenerProductos();