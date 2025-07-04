const { conectar } = require("../db");

//              **************      TABLA USUARIOS       **************
// obtener los usuraios de BD
/*async function selectUsuarios() {
    const db = await conectar();
    const qry = 'SELECT * FROM usuarios';
    const [rows] = await db.execute(qry);
    await db.end();
    return rows;
}*/

//Funcion para obtener el usuario por el email
async function getUsuarioPorEmail(email) {
  const db = await conectar();
  const qry = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
  const [rows] = await db.execute(qry, [email]);
  await db.end();

  if (rows.length > 0) {
    return rows[0];
  }
  return null;
}

//funcion para inssertar usuario en BD
async function agregarUsuario(email, password) {
  const db = await conectar();
  const qry = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
  await db.execute(qry, [email, password]);
  await db.end();
}


//              **************      FIN TABLA USUARIOS       **************

module.exports = { getUsuarioPorEmail, agregarUsuario };