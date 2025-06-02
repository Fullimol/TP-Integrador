const { verificarJWT, generarJWT } = require('../utils/jwt');

//funcion para autenticar el token enviado al momento del login
function controlDeAccesoJWT(req, res, next) {
  const token = req.cookies?.token;  //obtengo el token que envio por cookie
  const payload = verificarJWT(token); //lo verifico y atrapo el payload

  //encodeURIComponent transforma el texto legible en un formato seguro para URLs
  // (Algunos caracteres, como espacios, tildes, comas o signos especiales, no se pueden usar directamente en una URL)
  
  if (!token || !payload) { //si el token o el payload no existen: redirijo a pantalla login c/msj de sesion expirada
    return res.redirect('/usuarios/login?error=' + encodeURIComponent('Sesión expirada. Por favor, vuelva a iniciar sesión.'));
  }

  //si el token es valido, genero uno nuevo en c/interaccion del admin c/las pantallas
  const nuevoToken = generarJWT({ id: payload.id, email: payload.email });

  //actualizar la cookie
  res.cookie('token', nuevoToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 30 * 1000 //se reinician los 30 segundos
  });

  req.usuario = payload; //guardo la info del usuario p/acceder a la misma si la necesitara desde controladores o rutas

  next(); //continua a la ruta protegida
}

module.exports = { controlDeAccesoJWT };