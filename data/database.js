const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'online-shop',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(' MongoDB Connection Failed:', err);
    throw err;
  }
}
function getDb() {
  if (!database) {
    throw { message: 'Database connection not established!' };
  }
  return database;
}




module.exports = {
  connectToDatabase:connectToDatabase,
  getDb:getDb
};





