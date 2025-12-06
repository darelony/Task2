// backend/routes/policies.routes.js
const router = require('express').Router();
const policiesCtrl = require('../controllers/policies.controller');

router.get('/', policiesCtrl.getAllPolicies);

module.exports = router;