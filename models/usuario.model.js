const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const UsuarioModel = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'usuario',
    timestamps: false
})

module.exports = {
    UsuarioModel
}