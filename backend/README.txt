PAQUETES USADOS: (hacer un "npm install" para instalarlos todos)

npm install express
npm install cors
npm install mysql2
npm install -g nodemon
npm install ejs
npm install dotenv
npm install jsonwebtoken
npm install cookie-parser
npm install bcrypt

Usar en consola sobre la carpeta backend "nodemon api.js" para levantar servidor.



******* COMANDO PARA PROBAR EL SQL *******    ⚠️⚠️ AHORA SUBIR A LA BD LOS JUEGOS USANDO EL ARCHIVO "cargarProductosORM.js" ⚠️⚠️

CREATE TABLE IF NOT EXISTS juegos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  plataforma VARCHAR(50),
  precio DECIMAL(10,2),
  imagen TEXT,
  disponible BOOLEAN
);

INSERT INTO juegos (nombre, plataforma, precio, imagen, disponible) VALUES
('God of War Ragnarök', 'Playstation', 69.99, 'http://localhost:3000/imgs/gow.jpg', true),
('Ratchet & Clank', 'Playstation', 49.99, 'http://localhost:3000/imgs/ratchet.jpg', true),
('Horizon Forbidden West', 'Playstation', 59.99, 'http://localhost:3000/imgs/horizon.jpg', true),
('Halo Infinite', 'Xbox', 59.99, 'http://localhost:3000/imgs/halo.jpg', true),
('Forza Horizon 5', 'Xbox', 49.99, 'http://localhost:3000/imgs/forza.jpg', true),
('Gears 5', 'Xbox', 39.99, 'http://localhost:3000/imgs/gears.jpg', true),
('The Last of Us Part II', 'Playstation', 39.99, 'http://localhost:3000/imgs/ofus.jpg', true),
('Forza MotorSport', 'Xbox', 29.99, 'http://localhost:3000/imgs/forzamotor.jpg', true),
('Bioshock', 'Playstation', 59.99, 'http://localhost:3000/imgs/bioshock.jpg', true),
('Star Wars', 'Xbox', 59.99, 'http://localhost:3000/imgs/jedi.jpg', true),
('The Witcher 3', 'Xbox', 29.99, 'http://localhost:3000/imgs/witcher.jpg', true),
('DOOM', 'Xbox', 59.99, 'http://localhost:3000/imgs/doom.jpg', true),
('Street Fighter 6', 'Playstation', 59.99, 'http://localhost:3000/imgs/street.jpg', true),
('GTA VI', 'Playstation', 159.99, 'http://localhost:3000/imgs/gta.jpg', true),
('Crash Racing', 'Playstation', 19.99, 'http://localhost:3000/imgs/ctr.jpg', true);


CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (email, password) VALUES
('admin@gamestore.com', '$2b$10$zyFszxQH6b0i/bE72HTb0.CiMc2YbLG772W7d9RSlMdIaBXO73Vsa');



CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(10),
    cliente VARCHAR(100),
    productos TEXT,
    total DECIMAL(10,2)
);
