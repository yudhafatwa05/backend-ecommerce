const express = require('express');
const { body, param } = require('express-validator');
const { User, Product, Order, Payment } = require('../models');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const paymentRouter = express.Router();

paymentRouter.get('/', authMiddleware, async (req, res) => {
  const payments = await Payment.findAll();
  res.json(payments);
});

paymentRouter.post('/', authMiddleware, async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json(payment);
});

paymentRouter.delete('/:id', authMiddleware, async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  await payment.destroy();
  res.json({ message: 'Payment deleted successfully' });
});

module.exports =paymentRouter;