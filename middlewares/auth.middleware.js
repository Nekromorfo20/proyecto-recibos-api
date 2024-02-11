const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
     // Leer el token del header
     const token = req.header('x-auth-token')

     // Validar si exite token en la petición
     if (!token) return res.status(403).json({ message: '¡Token de sesión no encontrado!' })

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.API_TOKEN_SECRET)
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        return res.status(403).json({ message: '¡Token no válido!' })
    }
}

module.exports = {
    auth
}