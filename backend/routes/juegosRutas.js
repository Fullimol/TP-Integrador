const express = require('express');
const router = express.Router();
const { getJuegos, eliminarJuego, actualizarJuego, agregarJuego, renderJuegos, getJuegosPorPlataforma, desactivarJuego, reactivarJuego, mostrarFormularioModificar} = require('../controllers/juegosControllers');




//            LOGICA:
//obtener todos los juegos
router.get('/get', getJuegos);

// Eliminar un juego por id
router.delete('/delete/:id', eliminarJuego);

//actualizar un juego por id
router.get('/modificar-producto/:id', mostrarFormularioModificar);
router.post('/modificar-producto/:id', actualizarJuego);

//agregar un juego nuevo (definición de ruta en servidor express para manejar solicitudes tipo post, la función que se pasa como parametro es para saber que hacer con los datos)
router.post('/add', agregarJuego);

// Ruta para mostrar la vista con los juegos
router.get('/dashboard', renderJuegos);

//Ruta para filtrar los juegos
router.get('/filtrar', getJuegosPorPlataforma);

//Para desactivar juegos
router.put('/desactivar/:id', desactivarJuego);

//Para activar juegos
router.put('/reactivar/:id', reactivarJuego);





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

/* router.get('/modificar-producto', (req, res) => {
    res.render('../views/modificar-producto.ejs');
}); */




module.exports = router;
