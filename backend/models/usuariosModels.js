const { conectar } = require("../db");

//              **************      TABLA USUARIOS       **************
// obtener los usuraios de BD:
async function selectUsuarios() {
    const db = await conectar();
    const qry = 'SELECT * FROM usuarios';
    const [rows] = await db.execute(qry);
    await db.end();
    return rows;
} 

//              **************      FIN TABLA USUARIOS       **************

module.exports = { selectUsuarios };