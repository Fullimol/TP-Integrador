/* Logica de la pagina donde muestra el ticket */

// obtener carrito, total y nombre del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const total = localStorage.getItem('total');
const nombre = localStorage.getItem('nombre');
const contenedor = document.getElementById('ticket-container');
const btnImprimirTicket = document.getElementById('imprimirTicketButton');


function mostrarTicket() {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    contenedor.innerHTML = `
        <h1>Ticket "Game Store"</h1>
        <p>Fecha: ${fecha}</p>
        <p>Nombre cliente: ${nombre}</p>
        <p>Productos:</p>
        <ul>
            ${carrito.map((p) => `<li>${p.nombre} x ${p.cantidad}</li>`).join('')}
        </ul>
        <p>Total: $${total}</p>
    `;
}

// Generar PDF:
btnImprimirTicket.addEventListener('click', () => {
    html2pdf().from(contenedor).save(); // .from() toma el elemento HTML y .save() lo descarga como PDF
    console.log("Ticket impreso");
});


// guardar ticket en bd con mi url de mi api:
async function guardarVenta() {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const venta = {
        fecha: fecha,
        cliente: nombre,
        productos: carrito,
        total: parseFloat(total)
    };

    try {
        const response = await fetch('http://localhost:3000/ventas/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });

        const data = await response.json();
        console.log('Venta guardada:', data);
    } catch (error) {
        console.error('Error al guardar la venta:', error);
    }
}

mostrarTicket();
guardarVenta()