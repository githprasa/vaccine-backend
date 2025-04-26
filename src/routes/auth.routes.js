const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth.service');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    res.json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 