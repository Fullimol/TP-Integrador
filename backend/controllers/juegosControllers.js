// aca va las funciones get, post, delete y put

const { selectJuegos, deleteJuego, actualizar, agregar, selectJuegosPorPlataforma } = require('../models/juegosModels');

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
        res.json({ message: 'Juego eliminado correctamente' });
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
        res.json({ message: 'Juego actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el juego' });
        console.log(err);
    }
}

//agregar un juego nuevo a BD:
async function agregarJuego(req, res) {
    try {
        const { nombre, plataforma, precio, imagen, disponible } = req.body;
        await agregar(nombre, plataforma, precio, imagen, disponible);
        res.json({ message: 'Juego agregado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el juego' });
        console.log(err);
    }
}

// ------------------- Función para pasar los juegos a EJS ------------------- 
async function renderJuegos(req, res) {
    try {
        const juegos = await selectJuegos(); //Obtiene los juegos desde la BD
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



// ------------------- Función para pasar los juegos a EJS ------------------- 



module.exports = {
    getJuegos,
    eliminarJuego,
    actualizarJuego,
    agregarJuego,
    renderJuegos,
    getJuegosPorPlataforma
};