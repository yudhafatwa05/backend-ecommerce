const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false, // Nonaktifkan logging query
});

sequelize.authenticate()
  .then(() => console.log("✅ Database Connected!"))
  .catch(err => console.error("❌ Database Connection Failed:", err));

module.exports = sequelize;
