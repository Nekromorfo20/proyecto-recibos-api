const express = require('express')
require('dotenv').config()
const cors = require("cors")
const { sequelize } = require('./connection')

// Crear el servidor
const app = express()
const ENV = process.env
const port = Number(ENV.API_PORT) || 8081
const corsOptions = {
    origin: ENV.API_CORS_ORIGIN,
    credentials: ENV.API_CORS_CREDENTIALS
}

// Habilitar cors, express-json y urlencoded
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Inicialización de sequelize, apertura de puerto y control de errores de Aplicación
sequelize.authenticate()
  .then(() => {
      console.log('Conexión establecida con exito')
      return sequelize.sync()
  })
  .then(() => {
      console.log('Modelos sincronizados')
      app.listen(port, () => {
          console.log(`Servidor desplegado en http://localhost:${port}`)
      })
  })
.catch((error) => {
    console.error('Conexión fallida', error)
    process.exit(1)
})

// Importar rutas y establecer prefijo /api
app.use('/api', require('./routes/recibo.route'))
app.use('/api', require('./routes/usuario.route'))