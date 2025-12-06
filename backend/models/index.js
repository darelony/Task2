// backend/models/index.js
const sequelize = require('../config/database');

const User = require('./User');
const Policy = require('./Policy');
const UserPolicy = require('./UserPolicy');

// Many-to-many
User.belongsToMany(Policy, { through: UserPolicy, foreignKey: 'userId' });
Policy.belongsToMany(User, { through: UserPolicy, foreignKey: 'policyId' });

module.exports = {
  sequelize,
  User,
  Policy,
  UserPolicy,
};