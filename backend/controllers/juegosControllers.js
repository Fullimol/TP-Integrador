// aca va las funciones get, post, delete y put

const { selectJuegos, deleteJuego, actualizar, agregar } = require('../db');

//obtener todos los juegos de la base de datos:
async function getJuegos(req, res) {
    try {
        const juegos = await selectJuegos();
        res.json(juegos);
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
async function agregarJuego(req, res){
    try {
        const {nombre, plataforma, precio, imagen, disponible } = req.body;
        await agregar(nombre, plataforma, precio, imagen, disponible);
        res.json({ message: 'Juego agregado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el juego' });
        console.log(err);
    }
}


module.exports = {
    getJuegos,
    eliminarJuego,
    actualizarJuego,
    agregarJuego
};