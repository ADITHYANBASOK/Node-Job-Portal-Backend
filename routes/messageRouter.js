const express = require('express');
const { getAllMessages, createMessage } = require('../controllers/messageController');
const messageRouter = express.Router();

// GET /api/messages - Get all messages
messageRouter.get('/messages', getAllMessages);

// POST /api/messages - Create a new message
messageRouter.post('/messages', createMessage);

module.exports = messageRouter;
