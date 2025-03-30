const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuring dotenv
dotenv.config();

// Declaring connection string stored in .env file
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // No extra options needed
    console.log('✅ MONGODB CONNECTED');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
