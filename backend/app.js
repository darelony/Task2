
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes');
const policiesRoutes = require('./routes/policies.routes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', usersRoutes);
app.use('/api/policies', policiesRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;