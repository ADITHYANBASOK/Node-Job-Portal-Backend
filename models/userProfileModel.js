const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
    validate: {
      validator: function (v) {
        return /^\d{10,15}$/.test(v); // Validates phone number length and digits
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
