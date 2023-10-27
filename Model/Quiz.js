const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userEmail: {
        type: String,
        ref: 'User', // Reference to the User model
        required: true
      },
  question: String,
  selectedOption: String,
});

module.exports = mongoose.model('Response', quizSchema);