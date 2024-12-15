const Skill = require("../models/skillModel");

// const Skill = require('../models/Skill');


// Get all skills for a specific user
exports.getSkills = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from request params
    const skills = await Skill.find({ user_id: userId });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

// Add a new skill for a specific user
exports.addSkill = async (req, res) => {
  try {
    const { name, level } = req.body;
    const user_id = req.user.id;

    if (!name || level === undefined || !user_id) {
      return res.status(400).json({ error: 'Name, level, and user_id are required' });
    }

    const skill = new Skill({ name, level, user_id });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add skill' });
  }
};
