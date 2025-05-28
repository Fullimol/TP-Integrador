const { conectar } = require("../db");

async function guardarVenta(fecha, cliente, productos, total) {
    const db = await conectar();

    const productosJSON = JSON.stringify(productos); // convertir array a JSON (porque sino tiraba error al pasarlo a la BD)

    const qry = 'INSERT INTO ventas (fecha, cliente, productos, total) VALUES (?, ?, ?, ?)';
    const resultado = await db.execute(qry, [fecha, cliente, productosJSON, total]); //  usar el string

    await db.end();
    console.log(resultado);
}


module.exports = { guardarVenta };