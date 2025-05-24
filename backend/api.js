const express = require('express');
const app = express();
const juegosRoutes = require('./routes/juegosRutas');


// Middleware
var cors = require('cors');
app.use(cors());//estoy seteando cors como middleware para todas las solicitudes
app.use(express.json());



// ruta juegos
app.use('/juegos', juegosRoutes);



app.listen(3000, () => console.log('API escuchando en http://localhost:3000'));