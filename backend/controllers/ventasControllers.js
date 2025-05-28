const { guardarVenta } = require('../models/ventasModels');

async function agregarVenta(req, res) {
    try {
        const { fecha, cliente, productos, total } = req.body;
        await guardarVenta(fecha, cliente, productos, total);
        res.status(200).json({ message: 'Venta agregada correctamente' });
    } catch (err) {
        console.error('Error al agregar la venta:', err);
        res.status(500).json({ error: 'Error al agregar la venta' });
    }
}

module.exports = { agregarVenta };