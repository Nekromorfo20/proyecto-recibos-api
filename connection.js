const { Sequelize } = require('sequelize');

const ENV = process.env
const sequelize = new Sequelize(
    ENV.API_DB_NOMBRE,
    ENV.API_DB_USUARIO,
    ENV.API_DB_CONTRASENA,
    {
    host: ENV.API_DB_HOST,
    dialect: ENV.API_DB_DIALECT ,
    operatorsAliases: ENV.API_DB_OPERATOR_ALIASES,
    pool: {
        max: Number(ENV.API_DB_POOL_MAX),
        min: Number(ENV.API_DB_POOL_MIN),
        acquire: Number(ENV.API_DB_POOL_ACQUIRE),
        idle: Number(ENV.API_DB_POOL_IDLE)
    }
})

module.exports = {
  sequelize
}