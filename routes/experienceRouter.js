// routes/experienceRoutes.js
const express = require('express');
const router = express.Router();
const { getExperiences, addExperience, deleteExperience } = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all experiences for a specific user
router.get('/',authMiddleware, getExperiences);

// Add a new experience
router.post('/', authMiddleware, addExperience);

// Delete an experience
router.delete('/:id', authMiddleware, deleteExperience);

module.exports = router;
