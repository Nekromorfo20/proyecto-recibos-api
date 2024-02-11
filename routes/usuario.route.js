const express = require('express')
const router = express.Router()
const { usuarioInicioSesion } = require('../controllers')

// Endpoint para obtener un recibo por id
router.post('/usuario-inicio-sesion', usuarioInicioSesion)

module.exports = router