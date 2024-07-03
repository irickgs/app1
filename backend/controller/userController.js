const db = require('../db/db');



const ObtenerTodasLasConsultas = (req,res) => {
    const sql = 'SELECT * FROM usuarios';

    db.query(sql, (err,results) => 
    {
        if(err)
            throw err;

        res.json(results);
    });
}

const ObtenerConsultasPorId = (req,res) => 
{
    const {id} = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id = ?'

   db.query(sql, [id] ,(err, result) => 
   {
        if(err) throw err;

        res.json(result);
   });

}

const crearConsulta = (req,res) => 
{
    const {nombre,apellido,mail} = req.body;

    const sql = 'INSERT INTO usuarios (nombre,apellido,mail) VALUES (?,?,?)';

    db.query(sql,[nombre,apellido,mail], (err,result) => 
    {
        if(err) throw err;

        res.json(
            {
                mensaje : "Usuario Creado con EXITO",
                idUsuario : result.insertId
            });

    });


}

const ActualizarConsulta = (req,res) => 
{
    const {id} = req.params;
    const {nombre,apellido,mail} = req.body;

    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ? , mail = ? WHERE id = ?'

    db.query(sql, [nombre,apellido,mail,id], (err,result) => 
    {
        if(err) throw err;

        res.json({
            mensaje : "Usuario EDITADO"
        })
    });
}



const BorrarConsulta = (req,res) => 
{
    const {id} = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';

    db.query(sql,[id],(err,result) => 
    {
        if(err) throw err;

        res.json(
            {
                mensaje : "usuario ELIMINADO con EXITO"
            })

    });
}


module.exports = 
{
    ObtenerTodasLasConsultas,
    ObtenerConsultasPorId,
    crearConsulta,
    ActualizarConsulta,
    BorrarConsulta
}