const db = require('../db/db');
const path = require('path');


const ObtenerTodosLosUsuarios = (req, res) => {
    const sql = 'SELECT * FROM contactos';//devuelve un array de objetos

    db.query(sql, (err, results) => {
        if (err)// toma valor de null si no hay hay error, y si hay error toma el valor del mismo
            throw err;//corta la ejecucion del programa y muestra el error

        res.json(results);
    });
}

const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;//destructuring de un objeto que tiene atributo id
    const sql = 'SELECT * FROM contactos WHERE id_contacto = ?'

    db.query(sql, [id], (err, result) => {
        if (err)
            throw err;

        res.json(result);
    });

}

const crearUsuario = (req, res) => {
    const { fk_id_asunto, fk_id_servicio, nombre, fk_id_ciudad, email, mensaje, acepta } = req.body;
    console.log('Datos recibidos:', req.body);
    //const aceptaValor = acepta === '1' ? 1 : 0;
    const sql = 'INSERT INTO contactos (fk_id_asunto, fk_id_servicio, nombre, fk_id_ciudad, email, mensaje, acepta) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [fk_id_asunto, fk_id_servicio, nombre, fk_id_ciudad, email, mensaje, acepta], (err, result) => {
        if (err)
            throw err;

        res.json(
            {
                mensaje: "Usuario Creado con EXITO",
                idUsuario: result.insertId // insertId es un atributo que tiene el objeto result que devuelve el id del usuario que se acaba de crear
            });

    });


}

const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { fk_id_asunto, fk_id_servicio, nombre, fk_id_ciudad, email, mensaje, acepta } = req.body;
    const sql = 'UPDATE contactos SET fk_id_asunto = ?, fk_id_servicio = ?, nombre = ? , fk_id_ciudad = ?, email = ?, mensaje = ?, acepta = ? WHERE id_contacto = ?'

    db.query(sql, [fk_id_asunto, fk_id_servicio, nombre, fk_id_ciudad, email, mensaje, acepta, id], (err, result) => {
        if (err) throw err;

        res.json({
            mensaje: "Usuario EDITADO"

        })
    });
}



const BorrarUsuario = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM contactos WHERE id_contacto = ?';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.json(
            {
                mensaje: "usuario ELIMINADO con EXITO"
            })

    });
}


module.exports =
{
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario
}