const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const ReciboModel = sequelize.define('recibo', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    proveedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: true,
    },
    moneda: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true,
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
    tableName: 'recibo',
    timestamps: false
})

module.exports = {
    ReciboModel
}

// export { ReciboModel as default }
