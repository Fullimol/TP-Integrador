// Este archivo define el modelo de datos para un juego en la base de datos usando Sequelize ORM.
const { sequelize } = require('../dbORM');
const { DataTypes } = require('sequelize');

const Juego = sequelize.define('juego', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Juego;