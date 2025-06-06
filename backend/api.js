const express = require('express');
const multer = require('multer');//npm install multer
const app = express();
const path = require('path');

require('dotenv').config();

// importacion de cookie-parser para poder parsear la cookie recibida
const cookieParser = require('cookie-parser');

// cors: sirve para permitir la comunicación entre el frontend y el backend
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true //para permitir cookies
}));

// Middleware para parsear cookies
app.use(cookieParser());


// configuro el EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Permitir el acceso a archivos estáticos del frontend (CSS, imágenes, JS)
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const juegosRutas = require('./routes/juegosRutas');
app.use('/juegos', juegosRutas); // incluye rutas de vistas y lógica relacionada

const usuariosRutas = require('./routes/usuariosRutas');
app.use('/usuarios', usuariosRutas);

const ventasRutas = require('./routes/ventasRutas');
app.use('/ventas', ventasRutas);

/*------------------- MULTER ------------------*/

// Configuración del almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'imgs')); // Para redirigir a la carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => { //Se ejecuta cada vez que se guarda un archivo
        const uniqueName = Date.now() + '-' + file.originalname; //Date.now() genera un número único basado en la fecha y hora actual en milisegundos
        cb(null, uniqueName);//Se llama al callback para pasarle el nombre definitivo del archivo multer
    }
});

const upload = multer({ storage }); //Se crea instancia de multer y se le pasa storage para que use dicha configuración para guardar archivos

// Ruta para subir un archivo (campo 'archivo' en el form)
app.post('/upload', upload.single('archivo'), (req, res) => {
    if (!req.file) return res.status(400).send('No se subió ningún archivo');
    res.send(req.file.filename);
});

/*------------------- MULTER ------------------*/

// Escuchar
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
