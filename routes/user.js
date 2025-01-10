const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Middleware per verificare il token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Ottenere informazioni utente
router.get('/me', authenticate, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
});

// Altre rotte per gestire il profilo, referral, etc.

module.exports = router;