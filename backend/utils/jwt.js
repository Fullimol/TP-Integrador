const jwt = require('jsonwebtoken');

const secret = process.env.CLAVE_SECRETA;

//Funcion para generar token
function generarJWT(payload) {
  const token = jwt.sign(payload, secret, {expiresIn: '30s', algorithm: 'HS256'}); // "secret" es la clave secreta que se usa para firmar el token, "expiresIn" es el tiempo de expiración del token (en este caso 30 segundos), y "algorithm" es el algoritmo de firma que se utiliza (HS256 en este caso).
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