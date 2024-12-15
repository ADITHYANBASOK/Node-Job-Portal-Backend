const express = require('express');
const router = express.Router();
const { getSkills, addSkill } = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch skills for a specific user
router.get('/',authMiddleware, getSkills);

// Add a skill for a specific user
router.post('/',authMiddleware, addSkill);

module.exports = router;
