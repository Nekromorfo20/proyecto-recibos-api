const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares')
const { ReciboController } = require('../controllers')

// Instanciar la clase del controlador "recibo"
const reciboController = new ReciboController()

// Endpoint para obtener un recibo por id
router.get('/recibo', auth, reciboController.obtenerRecibo)

// Endpoint para obtener todos los recibos
router.get('/recibos', auth, reciboController.obtenerTodosLosRecibos)

// Endpoint para obtener un recibo
router.post('/recibo', auth, reciboController.crearRecibo)

// Endpoint para editar un recibo
router.put('/recibo', auth, reciboController.editarRecibo)

// Endpoint para eliminar un recibo por id
router.delete('/recibo', auth, reciboController.eliminarRecibo)

module.exports = router