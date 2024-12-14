const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');
// const authMiddleware = require('../middleware/authMiddleware'); // Protect routes with auth


const router = express.Router();

router.get('/:userId', authMiddleware, getUserProfile);
router.put('/:userId', authMiddleware, updateUserProfile);

module.exports = router;
