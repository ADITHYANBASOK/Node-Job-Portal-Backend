const UserProfile = require("../models/userProfileModel");

// const UserProfile = require('../models/userProfileModel');


// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const  userId  = req.user.id;

    // Fetch profile by userId
    const profile = await UserProfile.findOne({ userId }).select('bio location phone');;

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    console.log('req',req.user.id)
    const userId = req.user.id;
    const { bio, location, phone } = req.body;
    console.log(bio,location,phone)

    // Find the profile by user ID
    let userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
      // Update existing profile
      userProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { bio, location, phone },
        { new: true, runValidators: true }
      );

      if (!userProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      res.status(200).json(userProfile);
    } else {
      // Create a new profile if it does not exist
      const newProfile = new UserProfile({ userId, bio, location, phone });
      await newProfile.save();
      res.status(201).json(newProfile);
    }
  } catch (error) {
    console.error('Error handling profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
