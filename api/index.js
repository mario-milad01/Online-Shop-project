const db = require('../data/database');
const app = require('../app');

module.exports = async (req, res) => {
  try {
    if (!db.isConnected) {
      await db.connect();
      db.isConnected = true;
    }
    return app(req, res);
  } catch (err) {
    res.status(500).send('Database connection failed.');
  }
};