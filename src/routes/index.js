const express = require('express');
const { authRouter, userRouter, orderRouter, productRouter, paymentRouter } = require('./routesSetup');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/payments', paymentRouter);

module.exports = router;
