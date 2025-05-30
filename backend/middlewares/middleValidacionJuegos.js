// ------------------- Middlewares validaciones ------------------- 
function middlewareValidarJuego(req, res, next) {
    const { nombre, plataforma, precio, imagen } = req.body;

    //Si la req no cuenta con alguno de los datos, lanza error
    if (!nombre || !plataforma || !precio || !imagen) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    next();
}

function middlewareValidarIdParam(req, res, next) {
    const { id } = req.params;

    //isNan verifica que precio sea un número
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }

    next();
}

module.exports = { middlewareValidarJuego, middlewareValidarIdParam };