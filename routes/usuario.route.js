const express = require('express')
const router = express.Router()
const { UsuarioController } = require('../controllers')

// Instanciar la clase del controlador "usuario"
const usuarioController = new UsuarioController()

// Endpoint para iniciar sesión de un usuario y comprobar que existe
router.post('/usuario-inicio-sesion', usuarioController.usuarioInicioSesion)

module.exports = router