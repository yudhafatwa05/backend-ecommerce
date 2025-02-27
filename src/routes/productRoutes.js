const express = require('express');
const { body, param } = require('express-validator');
const { User, Product, Order, Payment } = require('../models');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

productRouter.get('/:id', validate([
  param('id').isInt().withMessage('Valid product ID is required'),
]), async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

productRouter.post('/', authMiddleware, validate([
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat().withMessage('Valid price is required'),
  body('stock').isInt().withMessage('Stock must be an integer'),
]), async (req, res) => {
  const { name, price, stock } = req.body;
  const product = await Product.create({ name, price, stock });
  res.status(201).json(product);
});

productRouter.put('/:id', authMiddleware, validate([
  param('id').isInt().withMessage('Valid product ID is required'),
]), async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.update(req.body);
  res.json(product);
});

productRouter.delete('/:id', authMiddleware, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.destroy();
  res.json({ message: 'Product deleted successfully' });
});

module.exports = productRouter;
