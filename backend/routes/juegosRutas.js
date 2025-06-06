const express = require('express');
const router = express.Router();

const { getJuegos, eliminarJuego, actualizarJuego, agregarJuego, desactivarJuego, reactivarJuego, mostrarFormularioModificar, mostrarPorPagina } = require('../controllers/juegosControllers');
const { controlDeAccesoJWT } = require('../middlewares/middleProteccionRutas');
const { middlewareValidarIdParam } = require ('../middlewares/middleValidacionJuegos');



//            LOGICA:
//---------RUTA PUBLICA---------
// obtener juegos
router.get('/get', getJuegos);

//---------RUTAS PROTEGIDAS---------
router.use(controlDeAccesoJWT); //las rutas que se definan a partir de esta linea pasan por el middleware de proteccion de rutas

// Eliminar un juego por id
router.delete('/delete/:id', eliminarJuego);

//actualizar un juego por id
router.get('/modificar-producto/:id', mostrarFormularioModificar); //Se ejecuta automatico cuando presionamos el botón "modificar" en cualquiera de los productos. Se los redirije al URL modificar-producto/idCorrespondienteDelJuego y por defecto se ejecuta el metodo GET
router.post('/modificar-producto', actualizarJuego);

//agregar un juego nuevo (definición de ruta en servidor express para manejar solicitudes tipo post, la función que se pasa como parametro es para saber que hacer con los datos)
router.post('/add', agregarJuego);

// Ruta para mostrar la vista con los juegos
router.get('/dashboard', mostrarPorPagina);

// Para desactivar juegos
router.put('/desactivar/:id', middlewareValidarIdParam, desactivarJuego);

// Para activar juegos
router.put('/reactivar/:id', middlewareValidarIdParam, reactivarJuego);






//          VISTAS:
/*router.get('/login', (req, res) => {
    res.render('../views/login.ejs');
});*/

/* router.get('/dashboard', (req, res) => {
    res.render('../views/dashboard.ejs');
});  */

router.get('/alta-producto', (req, res) => {
    res.render('../views/alta-producto.ejs');
});

/* router.get('/modificar-producto', (req, res) => {
    res.render('../views/modificar-producto.ejs');
}); */




module.exports = router;
