const express = require('express');
const router = express.Router();
const { loginUsuario, logoutUsuario } = require('../controllers/usuariosControllers');


router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error || null });
});

router.post('/login', loginUsuario);

router.get('/logout', logoutUsuario);

module.exports = router;