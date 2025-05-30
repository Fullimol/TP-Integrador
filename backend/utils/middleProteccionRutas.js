const { verificarJWT } = require('./jwt');

//funcion para autenticar el token enviado al momento del login
function controlDeAccesoJWT(req, res, next) {
  const token = req.cookies?.token;  //obtengo el token que envio por cookie
  const payload = verificarJWT(token); //lo verifico y atrapo el payload

  //encodeURIComponent transforma el texto legible en un formato seguro para URLs
  // (Algunos caracteres, como espacios, tildes, comas o signos especiales, no se pueden usar directamente en una URL)
  
  if (!token || !payload) { //si el token o el payload no existen: redirijo a pantalla login c/msj de sesion expirada
    return res.redirect('/usuarios/login?error=' + encodeURIComponent('Sesión expirada. Por favor, vuelva a iniciar sesión.'));
  }

  req.usuario = payload; //usuario autenticado(para utilizar si necesito luego)

  next(); //continua a la ruta protegida
}

module.exports = { controlDeAccesoJWT };