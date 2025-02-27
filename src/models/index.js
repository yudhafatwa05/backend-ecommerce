const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Add associations
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  User,
  Product,
  Order,
  OrderItem
};

