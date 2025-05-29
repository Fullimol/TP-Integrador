const jwt = require('jsonwebtoken');

const secret = process.env.CLAVE_SECRETA;

//Funcion para generar token
function generarJWT(payload) {
  const token = jwt.sign(payload, secret, {expiresIn: '10m', algorithm: 'HS256'});
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