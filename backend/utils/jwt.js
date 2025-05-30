const jwt = require('jsonwebtoken');

const secret = process.env.CLAVE_SECRETA;

//Funcion para generar token
function generarJWT(payload) {
  const token = jwt.sign(payload, secret, {expiresIn: '30s', algorithm: 'HS256'}); //token expira en 30seg
  return token;
}

//Funcion verificacion token
function verificarJWT(token) {
  try {
    const payload = jwt.verify(token, secret)
    return payload;
  } catch (e) {
    return null;
  }
}

module.exports = { generarJWT, verificarJWT };