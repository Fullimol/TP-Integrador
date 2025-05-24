const { selectUsuarios } = require("../db");


// aca tengo que hacer la función para traer los usuarios
async function getUsuarios(req, res) {
    try {
        const usuarios = await selectUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}


//            (!)   PENSAR COMO HACER PARA QUE SOLO UN USUARIO EN LA BD PUEDA LOGUEARSE, ADEMAS.. ENCRIPTAR CONTRASEÑA.



module.exports = { getUsuarios };