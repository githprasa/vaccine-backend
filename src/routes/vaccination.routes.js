const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');
const Vaccination = require('../models/vaccination.model');

// Get all vaccinations (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const vaccinations = await Vaccination.find()
      .populate('patientId', 'username email')
      .populate('providerId', 'username email');
    res.json({
      status: 'success',
      data: vaccinations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create new vaccination record (provider only)
router.post('/', authMiddleware, roleMiddleware(['provider']), async (req, res) => {
  try {
    const vaccination = await Vaccination.create({
      ...req.body,
      providerId: req.user.id
    });
    res.status(201).json({
      status: 'success',
      data: vaccination
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update vaccination record (provider only)
router.patch('/:id', authMiddleware, roleMiddleware(['provider']), async (req, res) => {
  try {
    const vaccination = await Vaccination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!vaccination) {
      return res.status(404).json({
        status: 'error',
        message: 'Vaccination record not found'
      });
    }
    res.json({
      status: 'success',
      data: vaccination
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get patient's vaccination records
router.get('/patient/:patientId', authMiddleware, async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ patientId: req.params.patientId })
      .populate('providerId', 'username email');
    res.json({
      status: 'success',
      data: vaccinations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 