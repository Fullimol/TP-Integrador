const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.listar);
router.get('/crear', productosController.mostrarFormulario);
router.post('/crear', productosController.guardarProducto);
router.post('/eliminar/:id', productosController.eliminarProducto);

module.exports = router;