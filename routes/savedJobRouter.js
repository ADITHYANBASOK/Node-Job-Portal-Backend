const express = require('express');

const { saveJob, checkSavedStatus } = require('../controllers/savedJobController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', authMiddleware, saveJob);
router.get('/:jobId', authMiddleware, checkSavedStatus);


module.exports = router;