const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../models/productos.json');

function leerProductos() {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

function guardarProductos(productos) {
    fs.writeFileSync(dbPath, JSON.stringify(productos, null, 2));
}

module.exports = {
    listar: (req, res) => {
        const productos = leerProductos();
        res.render('index', { productos });
    },
    mostrarFormulario: (req, res) => {
        res.render('form');
    },
    guardarProducto: (req, res) => {
        const productos = leerProductos();
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: req.body.nombre,
            plataforma: req.body.plataforma,
            precio: parseFloat(req.body.precio),
            imagen: req.body.imagen,
            disponible: true
        };
        productos.push(nuevoProducto);
        guardarProductos(productos);
        res.redirect('/');
    },
    eliminarProducto: (req, res) => {
        let productos = leerProductos();
        productos = productos.filter(p => p.id != req.params.id);
        guardarProductos(productos);
        res.redirect('/');
    }
}