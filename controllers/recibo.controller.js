const { sequelize } = require('../connection')
const {
    UsuarioModel,
    ReciboModel,
    UsuarioReciboModel
} = require('../models')
const { responseUtil } = require('../utils')

class ReciboController {

    /**
    * @author Alan Aguilar
    * @description Método para obtener un recibo por Id
    * @date 12-02-2024
    * @return {Object}
    * @memberof ReciboController
    */
    async obtenerRecibo (req, res) {
        try {
            const id = Number(req.query?.id)
            let respuesta = {}
        
            if (!id) return res.status(400).json(responseUtil(400, '¡No se proporciono el id del recibo a buscar!', {}))

            const recibo = await ReciboModel.findOne({ where: { id: id } })
            if (!recibo) return res.status(404).json(responseUtil(404, '¡No se encontro el recibo con el id proporcionado!', {}))

            respuesta = {
                id: recibo.id,
                proveedor: recibo.proveedor,
                monto: recibo.monto,
                moneda: recibo.moneda,
                fecha: recibo.fecha,
                comentario: recibo.comentario
            }
            return res.status(200).json(responseUtil(200, '¡OK!', respuesta))
        } catch (error) {
            console.log(error)
            return res.status(500).json(responseUtil(500, '¡Error de servidor!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Método para obtener todos los recibos, puede filtrarse por nombre de usuario
    * @date 12-02-2024
    * @return {Object}
    * @memberof ReciboController
    */
    async obtenerTodosLosRecibos (req, res) {
        try {
            const nombre = req.query?.nombre
            let recibos = []
            let respuesta = []

            if (nombre) {
            let usuario = await UsuarioModel.findOne({
                where: { nombre: nombre }
            })

            recibos = await UsuarioReciboModel.findAll({
                include:[
                    { model: ReciboModel },
                    { model: UsuarioModel }
                ],
                where: { usuarioId: usuario.id },
                order: [['fechaCreacion','DESC']]
            })

            for (let i = 0; i < recibos.length; i++) {
                respuesta.push({
                    id: recibos[i].recibo.id,
                    proveedor: recibos[i].recibo.proveedor,
                    monto: recibos[i].recibo.monto,
                    moneda: recibos[i].recibo.moneda,
                    fecha: recibos[i].recibo.fecha,
                    comentario: recibos[i].recibo.comentario
                })
            }

            } else {
            recibos = await ReciboModel.findAll({
                order: [['fechaCreacion','DESC']]
            })

            for (let i = 0; i < recibos.length; i++) {
                respuesta.push({
                    id: recibos[i].id,
                    proveedor: recibos[i].proveedor,
                    monto: recibos[i].monto,
                    moneda: recibos[i].moneda,
                    fecha: recibos[i].fecha,
                    comentario: recibos[i].comentario
                })
            }
            }
            return res.status(200).json(responseUtil(200, '¡OK!', respuesta))
        } catch (error) {
            console.log(error)
            return res.status(500).json(responseUtil(500, 'Error de servidor!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Método para crear un nuevo recibo
    * @date 12-02-2024
    * @return {Object}
    * @memberof ReciboController
    */
    async crearRecibo (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { nombre, proveedor, monto, moneda, fecha, comentario } = req.body
            let respuesta = {}

            if (!nombre || !proveedor || !monto || !moneda|| !fecha|| !comentario) return res.status(400).json({ message: '¡Todos los campos son obligatorios!' })

            const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })

            const nuevoRecibo = await ReciboModel.create({
                proveedor: proveedor,
                monto: monto,
                moneda: moneda,
                fecha: fecha,
                comentario: comentario
            }, { transaction: trans })

            await UsuarioReciboModel.create({
                usuarioId: usuario.id,
                reciboId: nuevoRecibo.id
            }, { transaction: trans })

            respuesta = {
                id: nuevoRecibo.id,
                proveedor: nuevoRecibo.proveedor,
                monto: nuevoRecibo.monto,
                moneda: nuevoRecibo.moneda,
                fecha: nuevoRecibo.fecha,
                comentario: nuevoRecibo.comentario
            }
            await trans.commit()
            return res.status(200).json(responseUtil(200, '¡OK!', respuesta))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, 'Error de servidor!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Método para editar un recibo por id
    * @date 12-02-2024
    * @return {Object}
    * @memberof ReciboController
    */
    async editarRecibo (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { id, proveedor, monto, moneda, fecha, comentario } = req.body
            let respuesta = {}

            if (!id || !proveedor || !monto || !moneda|| !fecha|| !comentario) return res.status(400).json(responseUtil(400, 'Todos los campos son obligatorios!', {}))

            const recibo = await ReciboModel.findOne({ where: { id: id } })
            if (!recibo) return res.status(404).json(responseUtil(404, 'No se encontro el recibo con el id proporcionado!', {}))

            await ReciboModel.update({
                proveedor: proveedor,
                monto: monto,
                moneda: moneda,
                fecha: fecha,
                comentario: comentario,
                fechaEdicion: new Date()
            }, { where: { id: recibo.id  }, transaction: trans })

            respuesta = {
                id: recibo.id,
                proveedor: proveedor,
                monto: monto,
                moneda: moneda,
                fecha: fecha,
                comentario: comentario
            }
            await trans.commit()
            return res.status(200).json(responseUtil(200, '¡OK!', respuesta))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, 'Error de servidor!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Método para eliminar un recibo por id
    * @date 12-02-2024
    * @return {Object}
    * @memberof ReciboController
    */
    async eliminarRecibo (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { id, nombre } = req.body
            
            if (!id || !nombre) return res.status(400).json(responseUtil(400, 'Todos los campos son obligatorios!', {}))

            const recibo = await ReciboModel.findOne({ where: { id: id } })
            if (!recibo) return res.status(404).json(responseUtil(404, 'No se encontro el recibo con el id proporcionado!', {}))

            const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })

            await UsuarioReciboModel.destroy({ where: { usuarioId: usuario.id, reciboId: recibo.id }, transaction: trans })
            await ReciboModel.destroy({ where: { id: id }, transaction: trans })
        
            await trans.commit()
            return res.status(200).json(responseUtil(200, 'Se elimino el recibo con exito!', {}))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, 'Error de servidor!', {}))
        }
    }
}

module.exports = ReciboController