const opcionImagen = document.getElementById("seleccion-imagen")
const inputUrl = document.getElementById("input-urlimg");
const formArchivo = document.getElementById("formulario");

//Función para cambiar metodo de carga de imagen 
function actualizarVisibilidad() {
    if (opcionImagen.value === "URL") {
        inputUrl.classList.remove("hidden");
        formArchivo.classList.add("hidden");
    } else {
        formArchivo.classList.remove("hidden");
        inputUrl.classList.add("hidden");
    }
}

// Por defecto selecciona la opción URL dentro de las opciones de carga de imagen
opcionImagen.addEventListener("change", actualizarVisibilidad);

//Función para subir imagen
async function uploadImagen() {
    const form = formulario;
    const formData = new FormData(form); // Captura todos los campos automáticamente

    try {
        const respuesta = await fetch('/upload', {
            method: 'POST',
            body: formData, // fetch automáticamente usa multipart/form-data
        });

        const texto = await respuesta.text();
        return "http://localhost:3000/imgs/" + texto;
    } catch (err) {
        console.error('Error al enviar:', err);
    }
}

/* Función para agregar elemento */
document.getElementById("agregar-button").addEventListener("click", async () => {
    const nombre = document.getElementById("input-nombre").value;
    const plataforma = document.getElementById("input-plataforma").value;
    const precio = document.getElementById("input-precio").value;
    let imagen = ""

    //Validación para tomar los datos de la URL o del archivo subido dependiendo de la opción seleccionada
    if(opcionImagen.value == "URL"){
        imagen = document.getElementById("input-urlimg").value
    }else{
        imagen = await uploadImagen();
    }

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

/* Función para volver al dashboard al presionar el botón "VOLVER" */
document.getElementById("volver-button").addEventListener("click", () => {
    window.location.href = '/juegos/dashboard';
})

// Ejecuta la función actualizarVisibilidad al cargar la página para poner por defecto la opción de URL al cargar la vista
document.addEventListener("DOMContentLoaded", actualizarVisibilidad);