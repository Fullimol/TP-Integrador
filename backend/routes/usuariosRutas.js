const express = require('express');
const router = express.Router();
const { loginUsuario, logoutUsuario, crearAdmin } = require('../controllers/usuariosControllers');
const { controlDeAccesoJWT } = require('../middlewares/middleProteccionRutas');

router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error || null });
});

router.post('/login', loginUsuario);

router.get('/logout', logoutUsuario);

router.get('/alta-admin', controlDeAccesoJWT, (req, res) => {
  res.render('alta-admin', { error: null });
});

router.post('/alta-admin', controlDeAccesoJWT, crearAdmin);


module.exports = router;