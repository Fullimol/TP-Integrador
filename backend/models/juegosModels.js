const { conectar } = require("../db");

//              **************      TABLA JUEGOS       **************
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
    const resultado = await db.execute(qry,[nombre, plataforma, precio, imagen, disponible]);
    await db.end();
    console.log(resultado);
}

//Realizar SELECT filtrando por plataforma
const selectJuegosPorPlataforma = async (plataforma) => {
    const db = await conectar();

    let query = 'SELECT * FROM juegos';
    let valores = [];

    if (plataforma && plataforma !== 'Todos') {
        query += ' WHERE plataforma = ?';
        valores.push(plataforma);
    }

    const [filas] = await db.query(query, valores);
    return filas; // devuelve el array de resultados
};

//Función para actualizar disponibilidad (Se usa en los botones para reactivar y desactivar)
async function actualizarDisponibilidad(id, disponible) {
    const db = await conectar();
    await db.query('UPDATE juegos SET disponible = ? WHERE id = ?', [disponible, id]);
}

async function obtenerPorId(id) {
    const db = await conectar();
    const [result] = await db.execute('SELECT * FROM juegos WHERE id = ?', [id]);
    await db.end();
    return result[0]; // retorna el 1er y unico resultado
}


module.exports = {
    selectJuegos,
    deleteJuego,
    actualizar,
    agregar,
    selectJuegosPorPlataforma,
    actualizarDisponibilidad,
    obtenerPorId
};