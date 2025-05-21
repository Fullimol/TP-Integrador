/* Logica de la pagina donde muestra el ticket */

// obtener carrito, total y nombre del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const total = localStorage.getItem('total');
const nombre = localStorage.getItem('nombre');

const contenedor = document.getElementById('ticket-container');


function mostrarTicket() {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    contenedor.innerHTML = `
        <h1>Ticket</h1>
        <p>Fecha: ${fecha}</p>
        <p>Nombre cliente: ${nombre}</p>
        <p>Productos:</p>
        <ul>
            ${carrito.map((p) => `<li>${p.nombre} x ${p.cantidad}</li>`).join('')}
        </ul>
        <p>Total: $${total}</p>
    `;
}


mostrarTicket();