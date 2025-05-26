const express = require('express');
const app = express();
const path = require('path');

// cors: sirve para permitir la comunicación entre el frontend y el backend
const cors = require('cors');
app.use(cors({
    origin: '*',
}));


// configuro el EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Permitir el acceso a archivos estáticos del frontend (CSS, imágenes, JS)
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Rutas
const juegosRutas = require('./routes/juegosRutas');
app.use('/juegos', juegosRutas); // incluye rutas de vistas y lógica relacionada

const usuariosRutas = require('./routes/usuariosRutas');
app.use('/usuarios', usuariosRutas);


// Renderizar views/dashboard.ejs, para poder ir desde el usuarios/logim
app.get('/dashboard', (req, res) => {
  res.render('dashboard'); 
});

// Escuchar
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
