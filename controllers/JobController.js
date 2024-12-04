const Job = require("../models/jobModel");



// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      location,
      salaryMin,
      salaryMax,
      description,
      requirements,
      benefits,
    } = req.body;

    const newJob = new Job({
      title,
      type,
      location,
      salaryMin,
      salaryMax,
      description,
      requirements: requirements.split('\n').filter(Boolean), // Splitting lines
      benefits: benefits.split('\n').filter(Boolean), // Splitting lines
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};
