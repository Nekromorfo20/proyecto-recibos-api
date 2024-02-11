const { 
    obtenerRecibo,
    obtenerTodosLosRecibos,
    crearRecibo,
    editarRecibo,
    eliminarRecibo
} = require('./recibo.controller')
const {
    usuarioInicioSesion
} = require('./usuario.controller')

module.exports = {
    obtenerRecibo,
    obtenerTodosLosRecibos,
    crearRecibo,
    editarRecibo,
    eliminarRecibo,
    usuarioInicioSesion
}