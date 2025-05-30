/* FUNCIÓN BOTÓN ALTA PRODUCTO */
document.getElementById("altaproducto-button").addEventListener("click", () => {
    window.location.href = '/juegos/alta-producto';
})

//FUNCIÓN DE BOTONES DE LOS JUEGOS
function activarBotonesDeJuegos() {


    // Botón Modificar
    document.querySelectorAll('.editar-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            window.location.href = `/juegos/modificar-producto/${id}`;
        });
    });


    // Botón Desactivar
    //Selecciona todos los botónes que tengan la clase "desactivar-button"
    document.querySelectorAll('.desactivar-button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id; //retiene el ID del juego correspondiente, tomando el atributo data-id
            const disponible = parseInt(btn.dataset.disponible); //retiene el valor disponible  del juego correspondiente (este puede ser 1(activado) o 0(desactivado)) y lo parsea a entero, tomando el valor del atributo del botón data-disponible

            if (disponible === 1) { //se usa === para asegurar que sea el mismo tipo y valor
                if (!confirm('¿Estás seguro de que querés desactivar este juego?')) return;
                try {
                    //Envia una solicitud PUT a esa ruta del backend para que el juego sea marcado como no disponible.
                    const res = await fetch(`/juegos/desactivar/${id}`, { method: 'PUT' });
                    const data = await res.json(); //Aguarda la respuesta
                    alert(data.message || data.error);
                    if (res.ok) location.reload(); //Si la respuesta dio bien recarga la página con el jugo desactivado
                } catch (error) {
                    console.error('Error al desactivar el juego:', error);
                }
            } else {
                //Si disponible es 0 significa que ya esta desactivado, tira alerta indicando esto
                alert('El juego ya está desactivado.');
            }
        });
    });



    //Botón reactivar
    document.querySelectorAll('.reactivar-button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const disponible = parseInt(btn.dataset.disponible); //retiene el valor disponible  del juego correspondiente (este puede ser 1(activado) o 0(desactivado)) y lo parsea a entero
            if (disponible === 0) { //se usa === para asegurar que sea el mismo tipo y valor
                if (!confirm('¿Estás seguro de que querés reactivar este juego?')) return;

                try {

                    //Envia una solicitud PUT a esa ruta del backend para que el juego sea marcado como disponible.
                    const res = await fetch(`/juegos/reactivar/${id}`, { method: 'PUT' });
                    const data = await res.json(); //Aguarda la respuesta


                    alert(data.message || data.error);
                    if (res.ok) location.reload(); //Si la respuesta dio bien recarga la página con el jugo desactivado
                } catch (error) {
                    console.error('Error al activar el juego:', error);
                }
            } else {
                //Si disponible es 1 significa que ya esta activado, tira alerta indicando esto
                alert('El juego ya está activado.');
            }
        });
    });
}
activarBotonesDeJuegos();

/* FUNCIÓN BOTÓN VOLVER LOGIN */
document.getElementById("volverlogin-button").addEventListener("click", () => {
    window.location.href = '/usuarios/login';
});