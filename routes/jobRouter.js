const express = require('express');
const { createJob } = require('../controllers/JobController');
const jobrouter = express.Router();

// POST /api/jobs - Create a job
jobrouter.post('/jobs',createJob);

module.exports = jobrouter;
