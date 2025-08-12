// const mongoose = require('mongoose');

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // already connected or connecting
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'online-shop',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection established');
  } catch (err) {
    console.error(' MongoDB connection error', err);
    throw err;
  }
}

module.exports = connectDB;
