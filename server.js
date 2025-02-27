const app = require('./index');
const sequelize = require('./src/config/database'); // Database connection
const { User, Product, Order, OrderItem, Payment } = require('./src/models');

// Make sure environment variables are loaded
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Define model associations
const setupAssociations = () => {
  // User <-> Order
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });
  
  // Order <-> OrderItem
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  
  // Product <-> OrderItem
  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
  
  // Order <-> Payment
  Order.hasOne(Payment, { foreignKey: 'orderId' });
  Payment.belongsTo(Order, { foreignKey: 'orderId' });
};

const startServer = async () => {
  try {
    console.log('Setting up database associations...');
    setupAssociations();
    
    console.log('Connecting to database...');
    await sequelize.authenticate(); // Test database connection
    console.log('✅ Database connected successfully');

    // Sync models with database (force:true will drop tables - be careful!)
    await sequelize.sync({ force: true }); 
    console.log('✅ Database models synchronized');

    // Create a test product for demonstration
    await Product.create({
      name: 'Test Product',
      price: 19.99,
      stock: 100
    });
    console.log('✅ Test product created');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🔄 API endpoints should be available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1); // Exit if database connection fails
  }
};

startServer();