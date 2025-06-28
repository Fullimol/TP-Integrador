const express = require('express');
const router = express.Router();
const { loginUsuario, logoutUsuario, crearAdmin } = require('../controllers/usuariosControllers');
const { controlDeAccesoJWT } = require('../middlewares/middleProteccionRutas');


// Rutas publicas
router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error || null });
});

router.post('/login', loginUsuario);

router.get('/logout', logoutUsuario);


// Rutas protegidas
router.use(controlDeAccesoJWT); //las rutas que se definan a partir de esta linea pasan por el middleware de proteccion de rutas

router.get('/alta-admin', (req, res) => {
  res.render('alta-admin', { error: null }); // renderiza el archivo ejs
});

router.post('/alta-admin', crearAdmin); // la peticion POST se hace con el SUBMIT del form de alta-admin.ejs, que envia los datos que tengan atributo "name" al controlador crearAdmin


module.exports = router;