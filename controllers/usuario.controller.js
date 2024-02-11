const jwt = require('jsonwebtoken')
const { UsuarioModel } = require('../models')

class UsuarioController {

    // Método para el inicio de sesión de un usuario y comprobar que existe
    async usuarioInicioSesion(req, res) {
        try {
            const { nombre, contrasena } = req.body
            const ENV = process.env
            let respuesta = {}
            let token = {}
    
            if (!nombre || !contrasena) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })
    
            const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })
            if (!usuario) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })
    
            if (contrasena !== usuario.contrasena) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })
    
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
                id: usuario.id,
                nombre: usuario.nombre,
                token: token
            }
            return res.status(200).json({ respuesta })
        } catch (error) {
            console.log( error)
            return res.status(500).json({ message: '¡Error de servidor!' })
        }
    }
}

module.exports = UsuarioController