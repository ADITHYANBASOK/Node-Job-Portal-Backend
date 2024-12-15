const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Skill', skillSchema);