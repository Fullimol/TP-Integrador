PAQUETES USADOS: (hacer un "npm install" para instalarlos todos)

npm install express
npm install cors
npm install mysql2
npm install -g nodemon
npm install ejs
npm install dotenv
npm install jsonwebtoken
npm install cookie-parser

Usar en consola sobre la carpeta backend "nodemon api.js" para levantar servidor.



******* COMANDO PARA PROBAR EL SQL *******

CREATE TABLE IF NOT EXISTS juegos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  plataforma VARCHAR(50),
  precio DECIMAL(10,2),
  imagen TEXT,
  disponible BOOLEAN
);


INSERT INTO juegos (nombre, plataforma, precio, imagen, disponible) VALUES
('God of War Ragnarök', 'Playstation', 69.99, 'https://juegosdigitalesargentina.com/files/images/productos/1655484530-god-of-war-ragnarok-ps5-pre-orden-0.jpg', true),
('Ratchet & Clank', 'Playstation', 49.99, 'https://juegosdigitalesargentina.com/files/images/productos/1624750215-ratchet-clank-una-dimension-aparte-ps5.jpg', true),
('Horizon Forbidden West', 'Playstation', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1631120527-horizon-forbidden-west-ps5-pre-orden.jpg', true),
('Halo Infinite', 'Xbox', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1644613688-halo-infinite-xbox-series-xs.jpg', true),
('Forza Horizon 5', 'Xbox', 49.99, 'https://juegosdigitalesargentina.com/files/images/productos/1658270695-forza-horizon-5-xbox-series-xs-0.jpg', true),
('Gears 5', 'Xbox', 39.99, 'https://juegosdigitalesargentina.com/files/images/productos/1723144620-gears-5-game-of-the-year-edition-xbox-series-xs-0.webp', true),
('The Last of Us Part II', 'Playstation', 39.99, 'https://juegosdigitalesargentina.com/files/images/productos/1623456225-the-last-of-us-part-ii-ps5.jpg', true),
('Forza MotorSport', 'Xbox', 29.99, 'https://juegosdigitalesargentina.com/files/images/productos/1673911737-forza-motorsport-xbox-series-xs-pre-orden-0.jpg', true),
('Bioshock', 'Playstation', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1649288377-bioshock-the-collection-xbox-series-xs-0.jpg', true),
('Star Wars', 'Xbox', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1651789450-star-wars-jedi-fallen-order-xbox-series-xs-0.jpg', true),
('The Witcher 3', 'Xbox', 29.99, 'https://juegosdigitalesargentina.com/files/images/productos/1651787088-the-witcher-3-wild-hunt-complete-edition-xbox-series-xs-0.jpg', true),
('DOOM', 'Xbox', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1737753783-doom-the-dark-ages-xbox-series-xs-pre-orden-0.webp', true),
('Street Fighter 6', 'Playstation', 59.99, 'https://juegosdigitalesargentina.com/files/images/productos/1685745024-street-fighter-vi-ps5-0.jpg', true),
('GTA VI', 'Playstation', 159.99, 'https://juegosdigitalesargentina.com/files/images/productos/1746638760-grand-theft-auto-vi-ps5-pre-orden-0.webp', true),
('Crash Racing', 'Playstation', 19.99, 'https://juegosdigitalesargentina.com/files/images/productos/1624656741-crash-team-racing-nitro-fueled-ps5.jpg', true);


CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (email, password) VALUES
('admin@gamestore.com', '1234');



CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(10),
    cliente VARCHAR(100),
    productos TEXT,
    total DECIMAL(10,2)
);
