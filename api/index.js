const express = require('express');
const path = require('path');
const connectToDatabase = require('../data/database');

const app = express();

// Serve static files from "public"
app.use(express.static(path.join(__dirname, '../public')));

// Ignore favicon requests to avoid 500 spam
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Example API route
app.get('/api/products', async (req, res) => {
  try {
    await connectToDatabase();
    // Example: Fetch products from your MongoDB collection
    res.json({ message: 'Products loaded successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Handle all other requests (e.g., frontend pages)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Vercel requires a handler export
module.exports = app;
