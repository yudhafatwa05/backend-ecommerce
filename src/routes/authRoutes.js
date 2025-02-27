const express = require('express');
const { body, param } = require('express-validator');
const { User, Product, Order, Payment } = require('../models');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const authRouter = express.Router();
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

authRouter.post('/register', validate([
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]), async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ user, token: generateToken(user) });
});

authRouter.post('/login', validate([
  body('email').isEmail().withMessage('Valid email is required'),

  body('password').notEmpty().withMessage('Password is required'),
]), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ user, token: generateToken(user) });
});

module.exports = authRouter;
