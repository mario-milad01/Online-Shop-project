const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
 const client = await MongoClient.connect(
  process.env.MONGODB_URI
);
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



