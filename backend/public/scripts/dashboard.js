/* FUNCIÓN BOTÓN ALTA PRODUCTO */
document.getElementById("altaproducto-button").addEventListener("click", () => {
    window.location.href = '/juegos/alta-producto';
})

/* FUNCIÓN BOTÓNES DE FILTRADO */
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.btn-filtrar');

    botones.forEach(btn => {
        btn.addEventListener('click', async () => {
            const plataforma = btn.dataset.plataforma;

            try {
                const response = await fetch(`/juegos/filtrar?plataforma=${plataforma}`);
                const juegos = await response.json();

                const contenedor = document.getElementById('productos-container');
                contenedor.innerHTML = '';

                juegos.forEach(juego => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <img src="${juego.imagen}" alt="${juego.nombre}">
                        <div class="card-content">
                            <h4>${juego.nombre}</h4>
                            <p>Precio: $${juego.precio}</p>
                            <p>Disponible: ${juego.disponible === 1 ? 'Si' : 'No'}</p>
                            <p>Plataforma: ${juego.plataforma}</p>
                            <div class="acciones-botones">
                                <button class="editar-button" data-id="${juego.id}">Modificar</button>
                                <button class="desactivar-button" data-id="${juego.id}" data-disponible="${juego.disponible}">Desactivar</button>
                                <button class="reactivar-button" data-id="${juego.id}" data-disponible="${juego.disponible}">Reactivar</button>
                            </div>
                        </div>
                    `;

                    contenedor.appendChild(card);
                });

                activarBotones();
            } catch (error) {
                console.error('Error al filtrar:', error);
            }
        });
    });




    //FUNCIÓN DE BOTONES DE LOS JUEGOS
    function activarBotones() {


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
    activarBotones();

    /* FUNCIÓN BOTÓN VOLVER LOGIN */
    document.getElementById("volverlogin-button").addEventListener("click", async () => {
        //al hacer click, hago una peticion http al servidor de la ruta '/usuarios/logout'
        await fetch('/usuarios/logout'); // llamo al logout para borrar la cookie
        window.location.href = '/usuarios/login'; //una vez que la peticion logout termina, redirijo a '/usuarios/login' y muestro esta ruta en navegador
    });



});