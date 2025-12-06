// backend/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',   // fajl će se kreirati u backend/
  logging: false,
});

module.exports = sequelize;