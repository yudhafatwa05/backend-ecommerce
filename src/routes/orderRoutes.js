const express = require('express');
const { body, param } = require('express-validator');
const { User, Product, Order, Payment } = require('../models');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const orderRouter = express.Router();

orderRouter.get('/', authMiddleware, async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

orderRouter.get('/:id', authMiddleware, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

orderRouter.post('/', authMiddleware, async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

orderRouter.put('/:id', authMiddleware, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  await order.update(req.body);
  res.json(order);
});

orderRouter.delete('/:id', authMiddleware, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  await order.destroy();
  res.json({ message: 'Order deleted successfully' });
});

module.exports = orderRouter;
// backend/src/routes/authRoutes.js