const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Routes type:', typeof routes);
console.log('Is routes a function?', typeof routes === 'function');
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
  });

if (typeof routes === 'function') {
  app.use('/api/', routes); // Add routes only if it's a function
} else {
  console.error('Routes is not a middleware function!');
}

module.exports = app;