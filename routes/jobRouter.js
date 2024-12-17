const express = require('express');
const { createJob, getJobs, getJobById, updateJob, AllgetJobs, getUserJobById, getJobsByCompany } = require('../controllers/JobController');
const jobrouter = express.Router();

// POST /api/jobs - Create a job
jobrouter.post('/jobs/:token',createJob);
jobrouter.get('/employerjobs/:token',getJobs)
jobrouter.get('/singleJob/:token/:id',getJobById)
jobrouter.put('/jobs/:jobId/:token', updateJob);
jobrouter.get('/alljobs', AllgetJobs);
jobrouter.get('/singleuserJob/:id',getUserJobById)
jobrouter.get('/Jobbycompany/:companyId',getJobsByCompany)





module.exports = jobrouter;
