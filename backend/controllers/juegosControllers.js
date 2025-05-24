// aca va las funciones get, post, delete y put

const { selectJuegos, deleteJuego } = require('../db');

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


module.exports = {
    getJuegos,
    eliminarJuego
};