const express = require('express')
const router = express.Router()
const { ReciboController } = require('../controllers')

// Instanciar la clase del controlador "recibo"
const reciboController = new ReciboController()

// Endpoint para obtener un recibo por id
router.get('/recibo', reciboController.obtenerRecibo)

// Endpoint para obtener todos los recibos
router.get('/recibos', reciboController.obtenerTodosLosRecibos)

// Endpoint para obtener un recibo
router.post('/recibo', reciboController.crearRecibo)

// Endpoint para editar un recibo
router.put('/recibo', reciboController.editarRecibo)

// Endpoint para eliminar un recibo por id
router.delete('/recibo', reciboController.eliminarRecibo)

module.exports = router