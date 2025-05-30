const express = require('express');
const router = express.Router();

const { getJuegos, eliminarJuego, actualizarJuego, agregarJuego, renderJuegos, getJuegosPorPlataforma, desactivarJuego, reactivarJuego, mostrarFormularioModificar, mostrarPorPagina } = require('../controllers/juegosControllers');
const { controlDeAccesoJWT } = require('../middlewares/middleProteccionRutas');
const { middlewareValidarIdParam } = require ('../middlewares/middleValidacionJuegos');



//            LOGICA:

// Eliminar un juego por id
router.delete('/delete/:id', controlDeAccesoJWT, eliminarJuego);

//actualizar un juego por id
router.get('/modificar-producto/:id', controlDeAccesoJWT, mostrarFormularioModificar);
router.post('/modificar-producto/:id', controlDeAccesoJWT, actualizarJuego);

//agregar un juego nuevo (definición de ruta en servidor express para manejar solicitudes tipo post, la función que se pasa como parametro es para saber que hacer con los datos)
router.post('/add', controlDeAccesoJWT, agregarJuego);

// Ruta para mostrar la vista con los juegos
router.get('/dashboard',controlDeAccesoJWT, mostrarPorPagina);

//Ruta para filtrar los juegos
router.get('/filtrar', controlDeAccesoJWT, getJuegosPorPlataforma);

// Para desactivar juegos
router.put('/desactivar/:id', controlDeAccesoJWT, middlewareValidarIdParam, desactivarJuego);

// Para activar juegos
router.put('/reactivar/:id', controlDeAccesoJWT, middlewareValidarIdParam, reactivarJuego);






//          VISTAS:
router.get('/login', (req, res) => {
    res.render('../views/login.ejs');
});

/* router.get('/dashboard', controlDeAccesoJWT, (req, res) => {
    res.render('../views/dashboard.ejs');
});  */

router.get('/alta-producto', controlDeAccesoJWT, (req, res) => {
    res.render('../views/alta-producto.ejs');
});

/* router.get('/modificar-producto', (req, res) => {
    res.render('../views/modificar-producto.ejs');
}); */




module.exports = router;
