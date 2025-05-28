/* Función para volver al dashboard al presionar el botón "VOLVER" */
document.getElementById("volver-button").addEventListener("click", () => {
    window.location.href = '/juegos/dashboard';
})

/* Función para agregar elemento */
document.getElementById("agregar-button").addEventListener("click", async () => {
    const nombre = document.getElementById("input-nombre").value;
    const plataforma = document.getElementById("input-plataforma").value;
    const precio = document.getElementById("input-precio").value;
    const imagen = document.getElementById("input-urlimg").value;

    /* Creación de objeto juego con los valores obtenidos */
    const juego = { nombre, plataforma, precio, imagen };


    // Validación para chequear que esten los campos correctos
    //isNan verifica que precio sea un número. Si algo falla, tira alerta y la función se finaliza con un return 
    if (!nombre || isNaN(precio) || !imagen) {
        alert("Por favor, completá todos los campos correctamente.");
        return;
    }

    //Hace una solicitud al servidor POST enviando el objeto juego en el cuerpo del mensaje
    try {
        const res = await fetch('/juegos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(juego)
        });

        //Espera respuesta del servidor y lo convierte en JSON
        const data = await res.json();
        alert(data.message || data.error);

        if (res.ok) {
            // Redirigir al dashboard si se agregó con éxito
            window.location.href = '/juegos/dashboard';
        }
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Error al agregar el producto.');
    }
});