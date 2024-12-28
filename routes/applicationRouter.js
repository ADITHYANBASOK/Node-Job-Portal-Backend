const express = require('express');
const {
  applyForJob,
  getSeekerApplications,
  getEmployerApplications,
  getCheckApplications,
  updateApplicationStatus,
  getApplicationCountBySeeker,
  getApplicationCountByEmployer,
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to apply for a job
router.post('/', authMiddleware, applyForJob);

// Route to get all job applications for a seeker
router.get('/', authMiddleware, getSeekerApplications);

// Route to get all job applications for an employer
router.get('/employer', authMiddleware, getEmployerApplications);
router.get('/check/:jobId', authMiddleware, getCheckApplications);
router.put('/update-status', authMiddleware, updateApplicationStatus);
router.get('/applivationCount', authMiddleware, getApplicationCountBySeeker);
router.get('/applivationCountEmployer', authMiddleware, getApplicationCountByEmployer);






module.exports = router;
