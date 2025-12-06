const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
    },
    adress: {
        type: DataTypes.STRING(100),
    },
    phone: {
        type: DataTypes.STRING(20),
    },
    email: {
        type: DataTypes.STRING(50),
    },
},{
    tableName: 'users',
    timestamps: false,
});

module.exports = User;