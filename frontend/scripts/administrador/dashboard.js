const contenedor = document.getElementById('productos-container');
const todosButton = document.getElementById('todos-button');
const xboxButton = document.getElementById('xbox-button');
const playstationButton = document.getElementById('play-button');
const altaProductoButton = document.getElementById('altaproducto-button');

let productos = [];
const url = "../../../backend/productos.json";

function obtenerProductos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data.filter(p => p.disponible !== false);
            console.log(productos)
            mostrarProductos(productos)
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function mostrarProductos(productos) {
    contenedor.innerHTML = ''; // limpiar antes de mostrar

    /* Agrega la tabla al contenedor */
    contenedor.innerHTML = `
        <table class="tabla-productos">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Plataforma</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(producto =>/* Por cada producto del array, devuelve una fila  con sus celdas correspondientes */ `
                    <tr>

                        <td><img src="${producto.imagen}" alt="${producto.nombre}" class="tabla-img"></td>

                        <td>${producto.nombre}</td>

                        <td>${producto.plataforma}</td>

                        <td>$${producto.precio.toFixed(2)}</td>

                        <td>
                            <div class="acciones-botones">
                                <button class="boton-accion editar-button" data-id="${producto.id}">Editar</button>
                                <button class="boton-accion eliminar-button" data-id="${producto.id}">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    /*--------------------- ACCIONES DE BOTÓNES EDITAR Y ELIMINAR ---------------------*/
    contenedor.querySelectorAll('.editar-button').forEach(btn => {
        btn.addEventListener('click', () => {
            alert("acción botón editar")
            /* Acción de botón "EDITAR" */
        });
    });

    contenedor.querySelectorAll('.eliminar-button').forEach(btn => {
        btn.addEventListener('click', () => {
            alert("acción botón eliminar")
            /* Acción de botón "ELIMINAR" */
        });
    });
    /*--------------------- ACCIONES DE BOTÓNES EDITAR Y ELIMINAR ---------------------*/
}















/* -------------------- ACCIONES DE FILTROS Y ALTA -------------------- */
todosButton.addEventListener('click', () => {
    mostrarProductos(productos);
});

xboxButton.addEventListener('click', () => {
    console.log("clik en xbox")
    const xbox = productos.filter(p => p.plataforma.toLowerCase().trim() === 'xbox');
    mostrarProductos(xbox);
});

playstationButton.addEventListener('click', () => {
    console.log("clik en play")
    const play = productos.filter(p => p.plataforma.toLowerCase().trim() === 'playstation');
    mostrarProductos(play);
});

altaProductoButton.addEventListener('click', ()=> {
    alert("Dar de alta un producto nuevo")
    /* Acción al dar de alta nuevo producto */
})
/* -------------------- ACCIONES DE FILTROS Y ALTA -------------------- */



obtenerProductos()