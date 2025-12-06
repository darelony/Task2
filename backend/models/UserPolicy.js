// backend/models/UserPolicy.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPolicy = sequelize.define('UserPolicy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  policyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'user_policies',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'policyId'],
    },
  ],
});

module.exports = UserPolicy;