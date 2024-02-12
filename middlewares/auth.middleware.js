const jwt = require('jsonwebtoken')
const { responseUtil } = require('../utils')

/**
* @author Alan Aguilar
* @description Función middleware para validar el token de sesión obtenido de los headers de una petición a un endpoint
* @date 12-02-2024
* @return {Function}
*/
const auth = (req, res, next) => {
     const token = req.header('x-auth-token')
     if (!token) return res.status(403).json(responseUtil(403, '¡Token de sesión no encontrado!', {}))

    try {
        const cifrado = jwt.verify(token, process.env.API_TOKEN_SECRET)
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        return res.status(403).json(responseUtil(403, '¡Token no válido!', {}))
    }
}

module.exports = {
    auth
}