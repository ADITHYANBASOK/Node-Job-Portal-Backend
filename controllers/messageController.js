const Message = require("../models/messageModel");

// 
// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { content, sender } = req.body;
// const {content} =req.body;
// const sender = "unknown"

  if (!content || !sender) {
    return res.status(400).json({ error: 'Content and sender are required' });
  }

  try {
    const newMessage = new Message({ content, sender });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

module.exports = { getAllMessages, createMessage };
