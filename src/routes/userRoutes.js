const express = require('express');
const { body, param } = require('express-validator');
const { User, Product, Order, Payment } = require('../models');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRouter = express.Router();

userRouter.get('/', authMiddleware, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.get('/:id', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

userRouter.put('/:id', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.update(req.body);
  res.json(user);
});

userRouter.delete('/:id', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.destroy();
  res.json({ message: 'User deleted successfully' });
});

module.exports = userRouter;
