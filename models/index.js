// import UsuarioModel from './usuario.model'
// import ReciboModel from './recibo.model'
// import UsuarioReciboModel from './usuario-recibo.model'

// export default {
//     UsuarioModel,
//     ReciboModel,
//     UsuarioReciboModel
// }

const { UsuarioModel } = require('./usuario.model')
const { ReciboModel } = require('./recibo.model')
const { UsuarioReciboModel } = require('./usuario-recibo.model')

module.exports = {
    UsuarioModel,
    ReciboModel,
    UsuarioReciboModel
}