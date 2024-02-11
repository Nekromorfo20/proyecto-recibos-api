const express = require('express')
const router = express.Router()
const {
    obtenerRecibo,
    obtenerTodosLosRecibos,
    crearRecibo,
    editarRecibo,
    eliminarRecibo
} = require('../controllers')

// Endpoint para obtener un recibo por id
router.get('/recibo', obtenerRecibo)

// Endpoint para obtener todos los recibos
router.get('/recibos', obtenerTodosLosRecibos)

// Endpoint para obtener un recibo
router.post('/recibo', crearRecibo)

// Endpoint para editar un recibo
router.put('/recibo', editarRecibo)

// Endpoint para eliminar un recibo por id
router.delete('/recibo', eliminarRecibo)

module.exports = router