const opcionImagen = document.getElementById("seleccion-imagen")
const inputUrl = document.getElementById("input-urlimg");
const formArchivo = document.getElementById("formulario");
const modificarButton = document.getElementById("modificar-button");


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
    const formData = new FormData(form); // Captura todos los campos automáticamente del formulario

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

//Función para modificar elemento
modificarButton.addEventListener("click", async () => {
    const id = document.getElementById("input-id").value;
    const nombre = document.getElementById("input-nombre").value;
    const plataforma = document.getElementById("input-plataforma").value;
    const precio = document.getElementById("input-precio").value;
    const disponible = document.getElementById("input-disponible").value
    let imagen = ""

    // Confirmación antes de continuar
    const confirmacion = confirm("¿Estás seguro que quieres actualizar el juego?");
    if (!confirmacion) {
        return; // Si el usuario cancela confirmación, no se realiza
    }

    //Validación para tomar los datos de la URL o del archivo subido dependiendo de la opción seleccionada
    if(opcionImagen.value == "URL"){
        imagen = document.getElementById("input-urlimg").value
    }else{
        imagen = await uploadImagen();
    }

    const juego = { id, nombre, plataforma, precio, imagen, disponible };

    try{
        const res = await fetch('/juegos/modificar-producto', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(juego)
        })

        if (res.ok) {

            alert("Juego actualizado con exito")

            // Redirigir al dashboard si se agregó con éxito
            window.location.href = '/juegos/dashboard';
        }
    }catch (error) {
        console.error('Error al actualizar el juego:', error);
        alert('Error al actualizar el juego.');
    }
});



// Volver al dashboard
document.getElementById("volver-button").addEventListener("click", () => {
    window.location.href = '/juegos/dashboard';
});


// Ejecuta la función actualizarVisibilidad al cargar la página para poner por defecto la opción de URL al cargar la vista
document.addEventListener("DOMContentLoaded", actualizarVisibilidad);