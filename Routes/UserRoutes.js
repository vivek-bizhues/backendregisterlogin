const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { default: transporter } = require('../transporter');

const secretKey = 'yourSecretKey';

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword,isVerified:false });

  // Save the user to the database
  await user.save();

  res.json({ message: 'User registered successfully' });


  // // Send an email with an OTP
  // const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

  // // Replace the following with your email sending logic
  // const mailOptions = {
  //   from: 'your-email@example.com',
  //   to: email,
  //   subject: 'Email Verification OTP',
  //   text: `Your OTP for email verification is: ${otp}`,
  // };

  // // Send the email and respond with a JWT token
  // // (you should replace this with your email sending logic)
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Email sending failed' });
  //   } else {
  //     // Generate a JWT token and send it back to the client for verification
  //     const token = jwt.sign({ email, otp }, 'your-secret-key', {
  //       expiresIn: '1h',
  //     });
  //     res.json({ message: 'Email sent with OTP', token });
  //   }
  // });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  // Find the user by username
  const user = await User.findOne({ email});
  console.log(user);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch)

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Generate a JWT token and send it in the response
  const token = jwt.sign({ email }, secretKey);

  res.json({ message: 'Authentication successful', token, user });
});


// Get user details by email
router.get('/:email', async (req, res) => {
  const email = req.params.email;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Send the user's details in the response
  res.json(user);
});


// Change password route
router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided old password with the stored hash
  const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!oldPasswordMatch) {
    return res.status(401).json({ message: 'Old password is incorrect' });
  }

  // Hash the new password using bcrypt
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  user.password = hashedNewPassword;
  await user.save();

  res.json({ message: 'Password changed successfully' });
});



module.exports = router;
