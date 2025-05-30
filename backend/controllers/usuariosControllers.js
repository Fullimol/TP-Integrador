const {getUsuarioPorEmail, selectUsuarios} = require("../models/usuariosModels");
const { generarJWT } = require('../utils/jwt');


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

    //Si el usuario no existe o la contraseña no coincide, lanzo error
    if (!usuario || password !== usuario.password) {
      return res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }

    //Login exitoso: generacion de token
    const payload = {id: usuario.id, email: usuario.email};
    const token = generarJWT(payload);

    //guardo token en cookie
    res.cookie('token', token, {
      httpOnly: true, //para que no pueda ser leido por JS del cliente
      secure: false, //cambiar a true en produccion con HTTPS
      sameSite: 'Lax', 
      maxAge: 30 * 1000 // duracion cookie 30seg
    });

    //redirigir al dashboard luego del login exitoso
    return res.status(200).redirect('/juegos/dashboard');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

//funcion de deslogueo y eliminacion de cookie
function logoutUsuario(req, res) {
    res.clearCookie('token', { //borro la cookie llamada 'token'
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/'
    });
    
  res.redirect('/usuarios/login'); //esta redireccion vá aca por si alguien ingresa al endpoint '/usuarios/logout' directamente
}

module.exports = { getUsuarios, loginUsuario, logoutUsuario };