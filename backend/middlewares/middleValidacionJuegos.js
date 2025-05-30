// ------------------- Middlewares validaciones ------------------- 
function middlewareValidarIdParam(req, res, next) {
    const { id } = req.params;

    //isNan verifica que precio sea un número
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }

    next();
}

module.exports = {middlewareValidarIdParam };