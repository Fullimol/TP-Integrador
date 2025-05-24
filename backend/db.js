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

async function selectJuegos() {
    // 1. Crear una nueva conexión a la base de datos.
    const db = await conectar();
    // 2. Ejecutar la consulta SQL para obtener todos los registros de la tabla "juegos".
    //    La función `db.execute()` devuelve un arreglo donde el primer elemento es la lista de filas (rows)
    //    y el segundo son los metadatos. Aquí usamos destructuración para obtener solo las filas.
    const [rows] = await db.execute('SELECT * FROM juegos');
    // 3. Cerrar la conexión a la base de datos para liberar recursos.
    await db.end();

    return rows;
}


//eliminar un juegos segun su id:
async function deleteJuego(id) {
    const db = await conectar();
    const qry = 'delete from juegos where id=?';
    const resultado = await db.execute(qry, [id]);
    await db.end();
    console.log(resultado);
}

//actualizar un juego segun su id:
async function actualizar(id, nombre, plataforma, precio, imagen, disponible){
    const db = await conectar();
    const qry = 'UPDATE juegos SET nombre=?, plataforma=?, precio=?, imagen=?, disponible=? WHERE id=?';
    const resultado = await db.execute(qry,[nombre, plataforma, precio, imagen, disponible, id]);
    await db.end();
    console.log(resultado);
}

//agregar un juego nuevo a un id nuevo:
async function agregar(nombre, plataforma, precio, imagen, disponible){
    const db = await conectar();
    const qry = 'INSERT INTO juegos (nombre, plataforma, precio, imagen, disponible) VALUES (?, ?, ?, ?, ?)';
    const resultado = await db.execute(qry,[, nombre, plataforma, precio, imagen, disponible]);
    await db.end();
    console.log(resultado);
}


module.exports = {
    selectJuegos,
    deleteJuego,
    actualizar,
    agregar
};