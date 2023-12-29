require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Auth routes (login, register)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
