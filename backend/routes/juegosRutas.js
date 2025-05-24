const express = require('express');
const router = express.Router();
const { getJuegos, eliminarJuego } = require('../controllers/juegosControllers');

//obtener todos los juegos
router.get('/', getJuegos);

// Eliminar un juego por id
router.delete('/:id', eliminarJuego);

module.exports = router;
