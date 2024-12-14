const express = require('express');
const { createJob, getJobs, getJobById, updateJob } = require('../controllers/JobController');
const jobrouter = express.Router();

// POST /api/jobs - Create a job
jobrouter.post('/jobs/:token',createJob);
jobrouter.get('/employerjobs/:token',getJobs)
jobrouter.get('/singleJob/:token/:id',getJobById)
jobrouter.put('/jobs/:jobId/:token', updateJob);


module.exports = jobrouter;
