const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/', userController.ObtenerTodosLosUsuarios);// consultas gnral
router.get('/:id',userController.ObtenerUsuarioPorId);//consulta por id, especifica
router.post('/',userController.crearUsuario);//crear user
router.put('/:id',userController.ActualizarUsuario);//actualizar/modificar user
router.delete('/:id',userController.BorrarUsuario);// borrar user



module.exports = router;

