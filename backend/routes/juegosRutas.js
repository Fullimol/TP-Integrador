const express = require('express');
const router = express.Router();
const { getJuegos, eliminarJuego } = require('../controllers/juegosControllers');


//            LOGICA:
//obtener todos los juegos
router.get('/get', getJuegos);

// Eliminar un juego por id
router.delete('/:id', eliminarJuego);




//          VISTAS:
router.get('/login', (req, res) => {
    res.render('../views/login.ejs');
});

router.get('/dashboard', (req, res) => {
    res.render('../views/dashboard.ejs');
});

router.get('/alta-producto', (req, res) => {
    res.render('../views/alta-producto.ejs');
});

router.get('/modificar-producto', (req, res) => {
    res.render('../views/modificar-producto.ejs');
});




module.exports = router;
