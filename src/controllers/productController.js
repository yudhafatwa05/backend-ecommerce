const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};
