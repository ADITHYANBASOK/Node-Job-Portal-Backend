// controllers/experienceController.js

const Experience = require("../models/experienceModel");

// const Experience = require('../models/Experience');


// Get all experiences for a user
exports.getExperiences = async (req, res) => {
  try {
    const  userId  =  req.user.id;
    const experiences = await Experience.find({ user_id: userId });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

// Add a new experience
exports.addExperience = async (req, res) => {
  try {
    console.log("hai")
    const { title, company, startDate, endDate, description } = req.body;
    const user_id = req.user.id

    if (!title || !company || !startDate || !endDate || !user_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newExperience = new Experience({ title, company, startDate, endDate, description, user_id });
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add experience' });
  }
};

// Delete an experience
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};
