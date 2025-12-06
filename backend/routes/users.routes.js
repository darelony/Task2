const router = require('express').Router();
const usersCtrl = require('../controllers/users.controller');

router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.getUserById);
router.post('/:id/policies/:policyId', usersCtrl.assignPolicy);
router.post('/', usersCtrl.createUser);              
router.delete('/:id', usersCtrl.deleteUser);         
router.delete('/:id/policies/:policyId', usersCtrl.removePolicy); 

module.exports = router;