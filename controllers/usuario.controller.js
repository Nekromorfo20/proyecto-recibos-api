const { UsuarioModel } = require('../models')

const usuarioInicioSesion = async (req, res) => {
    try {
        const { nombre, contrasena } = req.body
        let respuesta = {}

        if (!nombre || !contrasena) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })

        const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })
        if (!usuario) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })

        if (contrasena !== usuario.contrasena) return res.status(400).json({ message: '¡Nombre de usuario o contraseña incorrecto!' })

        respuesta = {
            id: usuario.id,
            nombre: usuario.nombre,
            fechaCreacion: usuario.fechaCreacion
        }
        return res.status(200).json({ respuesta })
    } catch (error) {
        console.log( error)
        return res.status(500).json({ message: '¡Error de servidor!' })
    }
}

module.exports = {
    usuarioInicioSesion
}