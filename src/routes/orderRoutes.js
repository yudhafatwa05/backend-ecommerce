const express = require('express');
const { body, param } = require('express-validator');
const { Order, OrderItem, Product } = require('../models');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

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

orderRouter.post('/', authMiddleware, validate([
  body('userId').notEmpty().withMessage('User ID is required'),
  body('items').isArray().withMessage('Items must be an array'),
]), async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await Order.create({ userId, total: 0 });

    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      
      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      });
      
      total += orderItem.quantity * product.price;
    }

    order.total = total;
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
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