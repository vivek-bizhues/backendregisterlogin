const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Import the User model
const jwt = require('jsonwebtoken');
const { default: transporter } = require('../transporter');

// Registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Save the user to the database
  const user = new User({ email, password, isVerified: false });
  await user.save();

  // Send an email with an OTP
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

  // Replace the following with your email sending logic
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
  };

  // Send the email and respond with a JWT token
  // (you should replace this with your email sending logic)
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Email sending failed' });
    } else {
      // Generate a JWT token and send it back to the client for verification
      const token = jwt.sign({ email, otp }, 'your-secret-key', {
        expiresIn: '1h',
      });
      res.json({ message: 'Email sent with OTP', token });
    }
  });
});

// Verification route
router.post('/verify', (req, res) => {
  const { email, otp } = req.body;
  const token = req.headers.authorization;

  // Verify the JWT token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token' });
    } else if (decoded.email === email && decoded.otp === otp) {
      // Update user's registration status to true
      User.updateOne({ email }, { isVerified: true }, (updateErr) => {
        if (updateErr) {
          res.status(500).json({ message: 'Verification failed' });
        } else {
          res.json({ message: 'Email verified successfully' });
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  });
});

module.exports = router;
