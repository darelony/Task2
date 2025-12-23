const router = require('express').Router();
const multer = require('multer');
const usersCtrl = require('../controllers/users.controller');


const storage = multer.diskStorage({
  destination: 'uploads/avatars',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.getUserById);
router.post('/', usersCtrl.createUser);
router.delete('/:id', usersCtrl.deleteUser);

router.post('/:id/policies/:policyId', usersCtrl.assignPolicy);
router.delete('/:id/policies/:policyId', usersCtrl.removePolicy);


router.post('/:id/avatar', upload.single('avatar'), usersCtrl.uploadAvatar);

module.exports = router;
