const {getUsuarioPorEmail, selectUsuarios} = require("../models/usuariosModels");


// aca tengo que hacer la función para traer los usuarios
async function getUsuarios(req, res) {
    try {
        const usuarios = await selectUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

//funcion de login
async function loginUsuario(req, res) {
  const { email, password } = req.body; //de la request me traigo el email y contraseña

  try {
    const usuario = await getUsuarioPorEmail(email); //obtengo el usuario por su email

    // Si el usuario no existe o la contraseña no coincide, mostrar error en login
    if (!usuario || password !== usuario.password) {
      return res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }

    //login exitoso: redirige al dashboard
    return res.redirect('/juegos/dashboard');

  } catch (error) {
    console.error(error);
    return res.render('login', { error: 'Error en el servidor. Por favor intente más tarde.' });
  }
}


module.exports = { getUsuarios, loginUsuario };