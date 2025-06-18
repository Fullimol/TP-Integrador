const {getUsuarioPorEmail, agregarUsuario } = require("../models/usuariosModels");
const { generarJWT } = require('../utils/jwt');
const bcrypt = require('bcrypt');



// aca tengo que hacer la función para traer los usuarios
/*async function getUsuarios(req, res) {
    try {
        const usuarios = await selectUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}*/

//funcion de login
async function loginUsuario(req, res) {
  const { email, password } = req.body; //de la request me traigo el email y contraseña

  try {
    const usuario = await getUsuarioPorEmail(email); //obtengo el usuario por su email

    if (!usuario) {
      return res.redirect('/usuarios/login?error=' + encodeURIComponent('Usuario inexistente'));
    }

  const coincideContrasenia = await bcrypt.compare(password, usuario.password);
    if (!coincideContrasenia) {
      return res.redirect('/usuarios/login?error=' + encodeURIComponent('Contraseña incorrecta'));
    }

    //Login exitoso: generacion de token de acceso que contiene la información códificada, en este caso el id y el mail
    const payload = {id: usuario.id, email: usuario.email};
    const token = generarJWT(payload);

    //guardo token en cookie(info que el servidor guarda en el navegador del usuario)
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


//funcion para crear nuevo administrador
async function crearAdmin(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).render('alta-admin', { error: 'Complete todos los campos solicitados' });
    }

    if (password !== confirmPassword) {
      return res.status(400).render('alta-admin', { error: 'Las contraseñas no coinciden' });
    }

    //chequeo si ya hay un usuario creado en la bbdd con ese email
    const usuarioExiste = await getUsuarioPorEmail(email);
    if (usuarioExiste) {
      return res.status(400).render('alta-admin', { error: 'El email ya se encuentra registrado. Registre uno nuevo' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); //hasheo de contraseña
    await agregarUsuario(email, hashedPassword); //guardar usuario en BD

    return res.redirect('/juegos/dashboard?success=' + encodeURIComponent('Administrador creado con exito!'));
  } catch (error) {
    console.error(error);
    return res.status(500).render('alta-admin', { error: 'Error al crear el usuario' });
  }
  
}






module.exports = { loginUsuario, logoutUsuario, crearAdmin };