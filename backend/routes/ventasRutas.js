const express = require('express');
const router = express.Router();
const { agregarVenta } = require('../controllers/ventasControllers');

router.post('/add', agregarVenta);

module.exports = router;