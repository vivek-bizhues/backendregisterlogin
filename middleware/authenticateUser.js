// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Use the same secret key as in your registration/login routes

// Define a middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // If the token is valid, add the user information to the request object
    req.user = decoded;
    next();
  });
};
module.exports = authenticateUser;