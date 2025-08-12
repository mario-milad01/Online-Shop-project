const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;
let isConnected = false;
async function connect() {
    if (isConnected) return;
   const client = await MongoClient.connect(
  'mongodb+srv://mario:database-password@cluster0.pnwkwa7.mongodb.net/online-shop?retryWrites=true&w=majority'
);
isConnected = true;
database = client.db('online-shop');
}

function getDb() {
  if (!database) {
    throw { message: 'Database connection not established!' };
  }
  return database;
}

module.exports = {
  connect: connect,
  getDb: getDb
};








