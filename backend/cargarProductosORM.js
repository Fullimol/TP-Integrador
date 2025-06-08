/*
⚠️ Ejecutar este script con "node cargarProductosORM.js" al menos una vez para insertar los juegos en la base de datos.
*/

const { sequelize } = require('./dbORM.js');
const { Juego } = require('./models/juegoORM.js');

async function insertarJuegos() {
    try {
        await sequelize.sync({ force: true }); // esto en true hace que se borren los datos existentes y se creen las tablas de nuevo

        await Juego.bulkCreate([ // bulkCreate es un metodo de sequelize que permite insertar varios registros a la vez
            {
                nombre: 'God of War Ragnarök',
                plataforma: 'Playstation',
                precio: 69.99,
                imagen: 'http://localhost:3000/imgs/gow.jpg',
                disponible: true
            },
            {
                nombre: 'Ratchet & Clank',
                plataforma: 'Playstation',
                precio: 49.99,
                imagen: 'http://localhost:3000/imgs/ratchet.jpg',
                disponible: true
            },
            {
                nombre: 'Horizon Forbidden West',
                plataforma: 'Playstation',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/horizon.jpg',
                disponible: true
            },
            {
                nombre: 'Halo Infinite',
                plataforma: 'Xbox',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/halo.jpg',
                disponible: true
            },
            {
                nombre: 'Forza Horizon 5',
                plataforma: 'Xbox',
                precio: 49.99,
                imagen: 'http://localhost:3000/imgs/forza.jpg',
                disponible: true
            },
            {
                nombre: 'Gears 5',
                plataforma: 'Xbox',
                precio: 39.99,
                imagen: 'http://localhost:3000/imgs/gears.jpg',
                disponible: true
            },
            {
                nombre: 'The Last of Us Part II',
                plataforma: 'Playstation',
                precio: 39.99,
                imagen: 'http://localhost:3000/imgs/ofus.jpg',
                disponible: true
            },
            {
                nombre: 'Forza MotorSport',
                plataforma: 'Xbox',
                precio: 29.99,
                imagen: 'http://localhost:3000/imgs/forzamotor.jpg',
                disponible: true
            },
            {
                nombre: 'Bioshock',
                plataforma: 'Playstation',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/bioshock.jpg',
                disponible: true
            },
            {
                nombre: 'Star Wars',
                plataforma: 'Xbox',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/jedi.jpg',
                disponible: true
            },
            {
                nombre: 'The Witcher 3',
                plataforma: 'Xbox',
                precio: 29.99,
                imagen: 'http://localhost:3000/imgs/witcher.jpg',
                disponible: true
            },
            {
                nombre: 'DOOM',
                plataforma: 'Xbox',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/doom.jpg',
                disponible: true
            },
            {
                nombre: 'Street Fighter 6',
                plataforma: 'Playstation',
                precio: 59.99,
                imagen: 'http://localhost:3000/imgs/street.jpg',
                disponible: true
            },
            {
                nombre: 'GTA VI',
                plataforma: 'Playstation',
                precio: 159.99,
                imagen: 'http://localhost:3000/imgs/gta.jpg',
                disponible: true
            },
            {
                nombre: 'Crash Racing',
                plataforma: 'Playstation',
                precio: 19.99,
                imagen: 'http://localhost:3000/imgs/ctr.jpg',
                disponible: true
            }
        ]);

        console.log('Juegos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar los juegos:', error);
    } finally {
        await sequelize.close(); // aca cerramos la conexión a la base de datos para liberar recursos
    }
}

insertarJuegos();
