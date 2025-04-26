const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required']
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provider ID is required']
  },
  vaccineName: {
    type: String,
    required: [true, 'Vaccine name is required'],
    trim: true
  },
  vaccinationDate: {
    type: Date,
    required: [true, 'Vaccination date is required']
  },
  nextDoseDue: {
    type: Date
  },
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination; 