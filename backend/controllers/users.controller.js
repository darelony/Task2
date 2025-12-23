// backend/controllers/users.controller.js
const { User, Policy, UserPolicy } = require('../models');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
       attributes: ['id', 'firstName', 'lastName', 'gender', 'avatar', 'birthDate', 'address', 'phone', 'email'],
      order: [['lastName', 'ASC']],
    });
    res.json(users.map(u => u.toJSON()));
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'firstName', 'lastName', 'gender', 'avatar', 'birthDate', 'address', 'phone', 'email'],
      include: {
        model: Policy,
        through: { attributes: [] },
      },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User nije pronađen' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({ message: 'Avatar upload failed', error });
  }
};



exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);   
    res.status(201).json(user);
  } catch (err) { next(err); }
};


exports.deleteUser = async (req, res, next) => {
  try {
    const rows = await User.destroy({ where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Korisnik nije pronađen' });
    res.json({ message: 'Korisnik obrisan' });
  } catch (err) { next(err); }
};


exports.removePolicy = async (req, res, next) => {
  try {
    const { id: userId, policyId } = req.params;
    const rows = await UserPolicy.destroy({ where: { userId, policyId } });
    if (!rows) return res.status(404).json({ message: 'Polisa nije pronađena' });
    res.json({ message: 'Polisa uklonjena' });
  } catch (err) { next(err); }
};

exports.assignPolicy = async (req, res, next) => {
  try {
    const { id: userId, policyId } = req.params;

    const [record, created] = await UserPolicy.findOrCreate({
      where: { userId, policyId },
    });

    if (!created) {
      return res.status(400).json({ message: 'Korisnik već ima ovu polisu.' });
    }

    res.json({ message: 'Polisa uspešno dodeljena.' });
  } catch (err) {
    next(err);
  }
};
