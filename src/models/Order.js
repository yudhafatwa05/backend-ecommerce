const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  total: { 
    type: DataTypes.FLOAT, 
    allowNull: false,
    defaultValue: 0 
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    allowNull: false
  }
});

module.exports = Order;