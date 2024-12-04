// routes/userRoutes.js
const express = require('express');
const { getAllUsers, createUser, registerUser, signIn } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/signUp',registerUser)
router.post('/login',signIn)

module.exports = router;
