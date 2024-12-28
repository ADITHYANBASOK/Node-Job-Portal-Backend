const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to Job model
      required: true,
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model (job seeker)
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model (employer)
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected','reviewing'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
