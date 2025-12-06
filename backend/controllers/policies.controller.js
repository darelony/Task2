// backend/controllers/policies.controller.js
const { Policy } = require('../models');

exports.getAllPolicies = async (req, res, next) => {
  try {
    const policies = await Policy.findAll({
      attributes: ['id', 'name', 'description', 'monthlyRate'],
      order: [['id', 'ASC']],
    });
    res.json(policies);
  } catch (err) {
    next(err);
  }
};