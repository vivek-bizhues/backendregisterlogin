const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isVerified: Boolean,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;