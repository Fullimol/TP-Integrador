// conexion a la base de datos
const mysql = require('mysql2/promise')

//conectar a la base de datos
async function conectar() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'integrador'
    });
    return db
}

module.exports = { conectar } 