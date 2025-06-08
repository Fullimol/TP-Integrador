// este archivo es el encargado de conectar la base de datos con el ORM Sequelize, que es una librería de Node.js para trabajar con bases de datos SQL de manera más sencilla y eficiente. Aquí se configura la conexión a la base de datos MySQL llamada "integrador" con el usuario "root" y sin contraseña, utilizando el host "localhost".
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("integrador", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = { sequelize };