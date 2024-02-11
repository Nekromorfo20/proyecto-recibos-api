
const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')
const { UsuarioModel } = require('./usuario.model')
const { ReciboModel } = require('./recibo.model')

const UsuarioReciboModel = sequelize.define('usuarioRecibo', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
    reciboId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'recibo',
            key: 'id'
        }
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    fechaEdicion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, { 
    tableName: 'usuarioRecibo',
    timestamps: false
})

UsuarioModel.hasMany(UsuarioReciboModel, { as: 'usuarioRecibo', foreignKey: 'usuarioId' });
UsuarioReciboModel.belongsTo(UsuarioModel, { foreignKey: "usuarioId" })

ReciboModel.hasMany(UsuarioReciboModel, { as: 'usuarioRecibo', foreignKey: 'reciboId' });
UsuarioReciboModel.belongsTo(ReciboModel, { foreignKey: "reciboId" })

module.exports = {
    UsuarioReciboModel
}