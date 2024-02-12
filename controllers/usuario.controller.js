const jwt = require('jsonwebtoken')
const { UsuarioModel } = require('../models')
const { responseUtil, validarContrasena  } = require('../utils')

class UsuarioController {

    /**
    * @author Alan Aguilar
    * @description Método para el inicio de sesión de un usuario y comprobar que existe
    * @date 12-02-2024
    * @return {Object}
    * @memberof UsuarioController
    */
    async usuarioInicioSesion(req, res) {
        try {
            const { nombre, contrasena } = req.body
            const ENV = process.env
            let respuesta = {}
            let token = {}
    
            if (!nombre || !contrasena) return res.status(400).json(responseUtil(400, '¡Nombre de usuario o contraseña incorrecto!', {}))
    
            const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })
            if (!usuario) return res.status(400).json(responseUtil(400, '¡Nombre de usuario o contraseña incorrecto!', {}))
    
            const contrasenaValida = await validarContrasena(contrasena, usuario.contrasena)
            if (contrasenaValida !== true) return res.status(400).json(responseUtil(400, '¡Nombre de usuario o contraseña incorrecto!', {}))

            const payload = {
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre
                }
            }

            token = jwt.sign(payload, ENV.API_TOKEN_SECRET, {
                expiresIn: Number(ENV.API_TOKEN_EXPIRATION), // 1 hora
                algorithm: `${ENV.API_TOKEN_ALGORITHM}`
            })

            respuesta = {
                nombre: usuario.nombre,
                token: token
            }
            return res.status(200).json(responseUtil(200, '¡OK!', respuesta))
        } catch (error) {
            console.log( error)
            return res.status(400).json(responseUtil(500, '¡Error de servidor!', {}))
        }
    }
}

module.exports = UsuarioController