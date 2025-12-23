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
    address: {
        type: DataTypes.STRING(100),
    },
    phone: {
        type: DataTypes.STRING(20),
    },
    email: {
        type: DataTypes.STRING(50),
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'male'
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'users',
    timestamps: false,
});

// Hook koji dodeljuje default avatar pre kreiranja jednog korisnika
User.beforeCreate(user => {
    if (!user.avatar) {
        user.avatar = user.gender === 'female'
            ? '/uploads/avatars/default_female.png'
            : '/uploads/avatars/default_male.png';
    }
});

// Hook koji dodeljuje default avatar pre bulk kreiranja korisnika
User.beforeBulkCreate(users => {
    users.forEach(user => {
        if (!user.avatar) {
            user.avatar = user.gender === 'female'
                ? '/uploads/avatars/default_female.png'
                : '/uploads/avatars/default_male.png';
        }
    });
});

module.exports = User;
