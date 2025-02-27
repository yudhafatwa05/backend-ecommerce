const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');

// Note: Associations are now defined in server.js for better initialization control

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  Payment
};