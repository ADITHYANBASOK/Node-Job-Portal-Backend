const mongoose = require('mongoose');

const SavedJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seeker',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedJob = mongoose.model('SavedJob', SavedJobSchema);

module.exports = SavedJob;