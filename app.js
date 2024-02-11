const express = require('express')
require('dotenv').config()
const cors = require("cors")
const { sequelize } = require('./connection');
const { UsuarioModel, ReciboModel, UsuarioReciboModel } = require('./models');

const app = express()
const ENV = process.env
const port = Number(ENV.API_PORT) || 8081
var corsOptions = {
    origin: ENV.API_CORS_ORIGIN
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Inicialización de sequelize, apertura de puerto y control de errores de Aplicación
sequelize.authenticate()
  .then(() => {
      console.log('Conexión establecida con exito')
      return sequelize.sync();
  })
  .then(() => {
      console.log('Modelos sincronizados')
      app.listen(port, () => {
      console.log(`Servidor desplegado en http://localhost:${port}`)
  });
})
.catch((error) => {
      console.error('Conexión fallida', error)
})

// Endpoint de prueba inicial
// app.get('/', (req, res) => {
//   res.send('Hola mundo!')
// })

// Endpoint para revisar a todos los usuarios
app.post('/inicio-sesion', async (req, res) => {
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
  })

// Endpoint para obtener todos los recibos, se puede filtrar por nombre de usuario
app.get('/recibos', async (req, res) => {
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
    return res.status(200).json({ respuesta })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: '¡Error de servidor!' })
  }
})

// Endpoint para obtener un recibo por id
app.get('/recibo', async (req, res) => {
  try {
    const id = Number(req.query?.id)
    let respuesta = {}

    if (!id) return res.status(400).json({ message: '¡No se proporciono el id del recibo a buscar!' })

    const recibo = await ReciboModel.findOne({ where: { id: id } })
    if (!recibo) return res.status(404).json({ message: '¡No se encontro el recibo con el id proporcionado!' })

    respuesta = {
      id: recibo.id,
      proveedor: recibo.proveedor,
      monto: recibo.monto,
      moneda: recibo.moneda,
      fecha: recibo.fecha,
      comentario: recibo.comentario
    }
    return res.status(200).json({ respuesta })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: '¡Error de servidor!' })
  }
})

// Endpoint para crear un nuevo recibo
app.post('/recibo', async (req, res) => {
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
    return res.status(200).json({ respuesta })
  } catch (error) {
    console.log(error)
    await trans.rollback()
    return res.status(500).json({ message: '¡Error de servidor!' })
  }
})

// Endpoint para actualizar un recibo existente por id
app.put('/recibo', async (req, res) => {
  const trans = await sequelize.transaction()

  try {
    const { id, proveedor, monto, moneda, fecha, comentario } = req.body
    let respuesta = {}

    if (!id || !proveedor || !monto || !moneda|| !fecha|| !comentario) return res.status(400).json({ message: '¡Todos los campos son obligatorios!' })

    const recibo = await ReciboModel.findOne({ where: { id: id } })
    if (!recibo) return res.status(404).json({ message: '¡No se encontro el recibo con el id proporcionado!' })

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
    return res.status(200).json({ respuesta })
  } catch (error) {
    console.log(error)
    await trans.rollback()
    return res.status(500).json({ message: '¡Error de servidor!' })
  }
})

// Endpoint para eliminar un recibo por id
app.delete('/recibo', async (req, res) => {
  const trans = await sequelize.transaction()

  try {
    const { id, nombre } = req.body
    
    if (!id || !nombre) return res.status(400).json({ message: '¡Todos los campos son obligatorios!' })

    const recibo = await ReciboModel.findOne({ where: { id: id } })
    if (!recibo) return res.status(404).json({ message: '¡No se encontro el recibo con el id proporcionado!' })

    const usuario = await UsuarioModel.findOne({ where: { nombre: nombre } })

    await UsuarioReciboModel.destroy({ where: { usuarioId: usuario.id, reciboId: recibo.id }, transaction: trans })
    await ReciboModel.destroy({ where: { id: id }, transaction: trans })
 
    await trans.commit()
    return res.status(200).json({ message: '¡Se elimino el recibo con exito!' })
  } catch (error) {
    console.log(error)
    await trans.rollback()
    return res.status(500).json({ message: '¡Error de servidor!' })
  }
})