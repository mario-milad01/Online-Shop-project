const mongodb = require('mongodb');
const mongodbUrl = process.env.MONGODB_URI;
const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
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
