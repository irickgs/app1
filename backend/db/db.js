const mySql = require('mysql2');
const connection = mySql.createConnection(
    {
        host: 'localhost'||'172.20.141.9',
        user: 'root',
        password: 'root',
        database: 'usuarios_db',
        multipleStatements: true
    });


connection.connect((err) => {
    if (err) {
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



            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS usuarios_db (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    apellido VARCHAR(100) NOT NULL,
                    mail VARCHAR(255) NOT NULL
                ); 

                 CREATE TABLE IF NOT EXISTS usuarios5 (
                    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    acepta TINYINT(1) NOT NULL,
                    creado DATETIME DEFAULT CURRENT_TIMESTAMP);       
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
