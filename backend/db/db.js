const mySql = require('mysql2');
const connection = mySql.createConnection(
    {
        //host: 'localhost'||'172.20.141.9',
        host: '172.20.141.9',
        user: 'root',
        password: 'root',
        database: 'usuarios_db',
        multipleStatements: true
    });


    connection.connect((err) => 
    {
        if (err) 
        {
            console.error("Error conectando a la base de datos", err);
            return;
        }


        console.log("Conectado a la base de datos");


        connection.query('CREATE DATABASE IF NOT EXISTS usuarios_db', (err, results) => {
        if (err) {
            console.log("Error creando la base de datos");
            return;
        }


        console.log("Base de datos asegurada");


        connection.changeUser({ database: 'usuarios_db' }, (err) => {
            if (err) {
                console.error("Error al cambiar a usuarios_db", err);
                return;
            }


// La tabla usuarios_db, borrarla cuando no se use mas.
            const createTableQuery = `                
                    CREATE TABLE IF NOT EXISTS usuarios (
                    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    acepta BOOLEAN NOT NULL,
                    creado DATETIME DEFAULT CURRENT_TIMESTAMP
                );
                
                CREATE TABLE IF NOT EXISTS ciudades (
                    id_ciudad INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL
                ); 
                
                CREATE TABLE IF NOT EXISTS asuntos (
                    id_asunto INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL
                );
                
                CREATE TABLE IF NOT EXISTS mensajes (
                    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
                    mensaje TEXT NOT NULL,
                    fk_id_usuario INT,
                    fk_id_asunto INT,
                    fk_id_ciudad INT,
                    creado DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario),
                    FOREIGN KEY (fk_id_asunto) REFERENCES asuntos(id_asunto),
                    FOREIGN KEY (fk_id_ciudad) REFERENCES ciudades(id_ciudad)
                ); 
                
                CREATE TABLE IF NOT EXISTS contactos (
                    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
                    asunto VARCHAR(255) NOT NULL,
                    nombre VARCHAR(255) NOT NULL,
                    fk_id_ciudad INT,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    mensaje TEXT NOT NULL,
                    acepta BOOLEAN NOT NULL,
                    creado DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (fk_id_ciudad) REFERENCES ciudades(id_ciudad)
                );

            `;


            connection.query(createTableQuery, (err, results) => {
                if (err) {
                    console.log("Error creando la tabla: ", err);
                    return;
                }


                console.log("Tabla asegurada");
            });
        });


    });


});


module.exports = connection;
