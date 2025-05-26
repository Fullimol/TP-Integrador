const { conectar } = require("../db");

//              **************      TABLA USUARIOS       **************
// obtener los usuraios de BD
async function selectUsuarios() {
    const db = await conectar();
    const qry = 'SELECT * FROM usuarios';
    const [rows] = await db.execute(qry);
    await db.end();
    return rows;
} //VER LUEGO SI SE VA A UTILIZAR ESTA FUNCION O NO

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


//              **************      FIN TABLA USUARIOS       **************

module.exports = { selectUsuarios, getUsuarioPorEmail };