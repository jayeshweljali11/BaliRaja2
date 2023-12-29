require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');
const imageRoutes = require('./routes/image.route');
const path = require('path');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Auth routes (login, register)
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Protected routes (require authentication)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
