const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes'); // Import routes from correct path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Mount all routes at /api
app.use('/api', routes);

module.exports = app;