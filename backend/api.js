const express = require('express');
const app = express();
const path = require('path');

// configuro el EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas
const juegosRutas = require('./routes/juegosRutas');
app.use('/juegos', juegosRutas); // incluye rutas de vistas y lógica relacionada

// Escuchar
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
