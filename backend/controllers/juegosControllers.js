// aca va las funciones get, post, delete y put

const { selectJuegos, deleteJuego, actualizar, agregar, actualizarDisponibilidad, obtenerPorId, obtenerJuegosPaginados, contarTotalJuegos } = require('../models/juegosModels');

//obtener todos los juegos de la base de datos:  ⚠️(no se usa porque ahora se traen desde la base de datos con ORM)⚠️
// async function getJuegos(req, res) {
//     try {
//         const juegos = await selectJuegos();

//         // Convertir el campo precio a número (por si viene como string) porque en la bd es decimal y lo pasa solo a string.
//         const juegosConvertidos = juegos.map(j => ({
//             ...j,
//             precio: Number(j.precio)
//         }));

//         res.json(juegosConvertidos);
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener los juegos' });
//     }
// }

// ------------------- ORM ------------------- 
const Juego = require("../models/juegoORM.js");

const getJuegos = async (req, res) => {
    try {
        const juegos = await Juego.findAll(); // esto lo proporciona "sequelize" para traer todos los juegos de la bd.
        res.status(200).json(juegos);
    } catch (error) {
        console.error("Error en getJuegos:", error);
        res.status(500).json({ error: "Error en la consulta" });
    }
};
// ------------------- FIN ORM ------------------- 


// elimino juego segun si id pasado por la url
async function eliminarJuego(req, res) {
    try {
        const { id } = req.params;
        await deleteJuego(id);
        res.redirect('/juegos/dashboard');
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el juego' });
    }
}

//actualizar un juego segun si id:
async function actualizarJuego(req, res) {
    try {
        const { id, nombre, plataforma, precio, imagen, disponible } = req.body;
        await actualizar(id, nombre, plataforma, precio, imagen, disponible);
        res.status(200).json({ mensaje: 'Juego actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el juego' });
        console.log(err);
    }
}

//agregar un juego nuevo a BD:
async function agregarJuego(req, res) {
    try {
        const { nombre, plataforma, precio, imagen } = req.body; //Aca se recibe el cuerpo del post
        await agregar(nombre, plataforma, precio, imagen, 1); // 1 significa que el juego está disponible
        res.json({ message: 'Juego agregado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el juego' });
        console.log(err);
    }
}

// ------------------- Función para pasar los juegos a EJS ------------------- 
//Función para desactivar juego
async function desactivarJuego(req, res) {
    const { id } = req.params;
    try {
        await actualizarDisponibilidad(id, 0); //Se cambia a 0 para desactivar
        res.json({ message: 'Juego desactivado correctamente.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al desactivar el juego' });
    }
}

//Función para activar juego
async function reactivarJuego(req, res) {
    const { id } = req.params;
    try {
        await actualizarDisponibilidad(id, 1);  // Cambiamos a 1 para activar
        res.json({ message: 'Juego reactivado correctamente.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al reactivar el juego' });
    }
}

//Función para mostrar el formulario de modificación
async function mostrarFormularioModificar(req, res) {
    try {
        const { id } = req.params; //Extrae el ID de la URL
        const juego = await obtenerPorId(id);
        res.render('modificar-producto', { juego });//Renderiza (muestra página HTML construida en EJS) la vista modificar-producto.ejs y se le pasa el objeto juego, luego a partir de este en la plantilla se le van pasando todos los datos
    } catch (error) {
        res.status(500).send('Error al obtener el juego para modificar.');
    }
}

//Función para mostrar juegos por página
async function mostrarPorPagina(req, res) {
    const porPagina = 6; //La cantidad de juegos que queremos mostrar
    const pagina = parseInt(req.query.page) || 1; //Devuelve la página actual, por defecto es 1 (obtiene el número de page que esta en la URL, luego del "?". ejemplo dashboard?page=2)
    const offset = (pagina - 1) * porPagina; //Cantidad de juegos a saltarse antes de empezar a contar, por defecto es 0

    const juegos = await obtenerJuegosPaginados(porPagina, offset);
    const totalJuegos = await contarTotalJuegos();
    const totalPaginas = Math.ceil(totalJuegos / porPagina);//Redondea hacia arriba al entero más cercano

    const success = req.query.success || null; //para mostrar mensaje de exito de creacion de usuario

    const emailCompleto = req.usuario?.email || ''; //atrapo el email del usuario logueado para mostrarlo en el dashboard mientras navego
    const usuario = emailCompleto.split('@')[0]; // Extraigo el nombre de usuario antes del @ para mostrarlo en el dashboard

    //Se pasan los datos a la vista
    res.render('dashboard', {
        juegos,
        paginaActual: pagina,
        totalPaginas,
        success,
        usuario
    });
}

// ------------------- FIN Función para pasar los juegos a EJS ------------------- 



module.exports = {
    getJuegos,
    eliminarJuego,
    actualizarJuego,
    agregarJuego,
    desactivarJuego,
    reactivarJuego,
    mostrarFormularioModificar,
    mostrarPorPagina
};