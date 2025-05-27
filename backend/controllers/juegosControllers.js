// aca va las funciones get, post, delete y put

const { selectJuegos, deleteJuego, actualizar, agregar, selectJuegosPorPlataforma, actualizarDisponibilidad, obtenerPorId} = require('../models/juegosModels');

//obtener todos los juegos de la base de datos:
async function getJuegos(req, res) {
    try {
        const juegos = await selectJuegos();

        // Convertir el campo precio a número (por si viene como string) porque en la bd es decimal y lo pasa solo a string.
        const juegosConvertidos = juegos.map(j => ({
            ...j,
            precio: Number(j.precio)
        }));

        res.json(juegosConvertidos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los juegos' });
    }
}


// elimino juego segun si id pasado por la url
async function eliminarJuego(req, res) {
    try {
        const { id } = req.params;
        await deleteJuego(id);
        alert("Juego actualizado correctamente")
        res.redirect('/juegos/dashboard');
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el juego' });
    }
}

//actualizar un juego segun si id:
async function actualizarJuego(req, res) {
    try {
        const { id } = req.params;
        const { nombre, plataforma, precio, imagen, disponible } = req.body;
        await actualizar(id, nombre, plataforma, precio, imagen, disponible);
        res.redirect('/juegos/dashboard');
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el juego' });
        console.log(err);
    }
}

//agregar un juego nuevo a BD:
async function agregarJuego(req, res) {
    try {
        const { nombre, plataforma, precio, imagen} = req.body; //Aca se recibe el cuerpo del post
        await agregar(nombre, plataforma, precio, imagen, 1);
        res.json({ message: 'Juego agregado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el juego' });
        console.log(err);
    }
}

// ------------------- Función para pasar los juegos a EJS ------------------- 
async function renderJuegos(req, res) {
    try {
        const juegos = await selectJuegos(); //Obtener los juegos desde la BD
        res.render('dashboard', { juegos }); // Se pasa los juegos a EJS
    } catch (err) {
        res.status(500).send('Error al renderizar la vista');
    }
}

/* ESTUDIAR PASO A PASO */
async function getJuegosPorPlataforma(req,res){
    const { plataforma } = req.query;

    try {
        const juegos = await selectJuegosPorPlataforma(plataforma);
        res.json(juegos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al filtrar los juegos' });
    }
}


async function desactivarJuego(req, res) {
    const { id } = req.params;
    try {
        await actualizarDisponibilidad(id, 0); //Se cambia a 0 para desativar
        res.json({ message: 'Juego desactivado correctamente.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al desactivar el juego' });
    }
}

async function reactivarJuego(req, res) {
    const { id } = req.params;
    try {
        await actualizarDisponibilidad(id, 1);  // Cambiamos a 1 para activar
        res.json({ message: 'Juego reactivado correctamente.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al reactivar el juego' });
    }
}

async function mostrarFormularioModificar(req, res) {
    try {
        const { id } = req.params;
        const juego = await obtenerPorId(id);
        res.render('modificar-producto', { juego });
    } catch (error) {
        res.status(500).send('Error al obtener el juego para modificar.');
    }
}


// ------------------- Función para pasar los juegos a EJS ------------------- 



module.exports = {
    getJuegos,
    eliminarJuego,
    actualizarJuego,
    agregarJuego,
    renderJuegos,
    getJuegosPorPlataforma,
    desactivarJuego,
    reactivarJuego,
    mostrarFormularioModificar
};