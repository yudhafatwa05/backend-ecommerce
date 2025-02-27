const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;
  const order = await Order.create({ userId, total: 0 });

  let total = 0;
  for (const item of items) {
    const orderItem = await OrderItem.create({ orderId: order.id, productId: item.productId, quantity: item.quantity });
    total += orderItem.quantity * item.price;
  }

  order.total = total;
  await order.save();
  res.status(201).json(order);
};
