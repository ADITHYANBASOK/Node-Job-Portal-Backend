const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'remote'], required: true },
  location: { type: String, required: true },
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  benefits: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
