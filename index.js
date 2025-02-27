const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const routes = require('./routes'); // Panggil folder routes, bukan file yang tidak ada

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api', routes); // Semua routes ada di bawah /api

module.exports = app;
