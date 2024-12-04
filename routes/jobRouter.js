const express = require('express');
const { createJob, getJobs } = require('../controllers/JobController');
const jobrouter = express.Router();

// POST /api/jobs - Create a job
jobrouter.post('/jobs/:token',createJob);
jobrouter.get('/employerjobs/:token',getJobs)

module.exports = jobrouter;
