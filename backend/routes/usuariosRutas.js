const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/usuariosControllers');


router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', loginUsuario);

module.exports = router;