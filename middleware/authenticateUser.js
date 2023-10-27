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

// const jwt = require('jsonwebtoken');
// const User = require('../Model/User'); // Import your User model
// const secretKey = 'yourSecretKey';

// const authenticateUser = async (req, res, next) => {
//   // Extract the token from the request header or wherever it's stored
//   const token = req.headers.authorization || '';

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, secretKey);

//     // If the token is valid, find the user by ID
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     // Attach the user object to the request for further use
//     req.user = user;

//     // Continue with the next middleware or route handler
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
// };

// module.exports = authenticateUser;
