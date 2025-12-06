// backend/controllers/users.controller.js
const { User, Policy, UserPolicy } = require('../models');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      order: [['lastName', 'ASC']],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
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