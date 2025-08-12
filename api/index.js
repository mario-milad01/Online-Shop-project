const db = require('../data/database');
const app = require('../app');
const path = require('path');
const express = require('express');
app.use(express.static(path.join(__dirname, '../public')));
let isConnected = false;

module.exports = async function (req,res) {
    if (!isConnected) {
    try {
      await db.connect();
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      res.status(500).send("Database connection failed");
      return;
    }
  }

  app(req, res);
};