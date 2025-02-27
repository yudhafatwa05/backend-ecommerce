const express = require('express');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const orderRouter = require('./orderRoutes');
const productRouter = require('./productRoutes');
const paymentRouter = require('./paymentRoutes');

// Create a router instance
const router = express.Router();

// Register all routes
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/payments', paymentRouter);

// Add a test route directly on this router
router.get('/test', (req, res) => {
  res.json({ message: 'API routes are working!' });
});

module.exports = router;