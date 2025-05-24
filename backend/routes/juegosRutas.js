const express = require('express');
const router = express.Router();
const { getJuegos, eliminarJuego, actualizarJuego, agregarJuego } = require('../controllers/juegosControllers');


//            LOGICA:
//obtener todos los juegos
router.get('/get', getJuegos);

// Eliminar un juego por id
router.delete('/delete/:id', eliminarJuego);

//actualizar un juego por id
router.put('/update/:id', actualizarJuego);

//agregar un juego nuevo
router.post('/add', agregarJuego);



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
