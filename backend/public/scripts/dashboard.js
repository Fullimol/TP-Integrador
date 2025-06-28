/* FUNCIÓN BOTÓN ALTA PRODUCTO */
document.getElementById("altaproducto-button").addEventListener("click", () => {
    window.location.href = '/juegos/alta-producto';
})

//FUNCIÓN DE BOTONES DE LOS JUEGOS
function activarBotonesDeJuegos() {


    // Botón Modificar
    //Cuando se apreta el botón, se va la URL `/juegos/modificar-producto/númeroDeID` y se ejecuta mostrarFormularioModificar
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
                    const res = await fetch(`/juegos/desactivar/${id}`, {
                        method: 'PUT',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest' //Encabezado especial para indicar que esta es una solicitud AJAX (fetch)
                            // Esto permite que el backend sepa que no debe hacer un "redirect" tradicional
                        }
                    });

                    //Si el token expiró o no es válido, el servidor devuelve estado 401 (no autorizado). Aca verifica el token mediante el middleware de proteccion de rutas (controlDeAccesoJWT). Esta ruta está en "juegosRutas.js"
                    if (res.status === 401) {
                        alert('Los cambios no han podido ser guardados.\nSesión expirada, serás redirigido al login'); //En ese caso, mostramos un mensaje y redirigimos manualmente al login
                        window.location.href = '/usuarios/login?error=' + encodeURIComponent('Sesión expirada. Por favor, vuelva a iniciar sesión.');
                        return; //Cortamos la ejecución del resto del código
                    }

                    const data = await res.json(); //Aguarda la respuesta del servidor
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
                    const res = await fetch(`/juegos/reactivar/${id}`, {
                        method: 'PUT',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest' // Indica que es una solicitud AJAX para evitar redirecciones automáticas
                        }
                    });

                    // Si el token expiró o es inválido, el backend responde con estado 401
                    if (res.status === 401) {
                        alert('Los cambios no han podido ser guardados.\nSesión expirada, serás redirigido al login');
                        window.location.href = '/usuarios/login?error=' + encodeURIComponent('Sesión expirada. Por favor, vuelva a iniciar sesión.');
                        return;
                    }

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
document.getElementById("volverlogin-button").addEventListener("click", async () => {
    //al hacer click, hago una peticion http al servidor de la ruta '/usuarios/logout'
    await fetch('/usuarios/logout'); // llamo al logout para borrar la cookie
    window.location.href = '/usuarios/login'; //una vez que la peticion logout termina, redirijo a '/usuarios/login' y muestro esta ruta en navegador
});

/*funcion boton agregar nuevo admin */
document.getElementById("altaadmin-button").addEventListener("click", () => {
    window.location.href = '/usuarios/alta-admin';
});