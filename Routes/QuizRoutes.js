const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const Response = require('../Model/Quiz');

const secretKey = 'yourSecretKey';

router.post('/', authenticateUser, (req, res) => {
    const { question, selectedOption } = req.body;
    const userEmail = req.user.email; // Get the user ID from the authenticated user

    if (!question || selectedOption === undefined) {
      return res.status(400).json({ message: 'Invalid request' });
    }
  
    const response = new Response({
      question,
      selectedOption,
      userEmail, // Include the user's ID in the response
    });
  
    response.save()
      .then(savedResponse => {
        res.status(201).json({ message: 'Response saved successfully', savedResponse });
      })
      .catch(err => {
        console.error('Error saving response:', err);
        res.status(500).json({ message: 'Error saving response' });
      });
  });

  router.get('/', authenticateUser, async (req, res) => {
    const userEmail = req.user.email; // Get the user ID from the authenticated user'
    console.log(userEmail);
    try {
      // Fetch user-specific responses from the database
      const userResponses = await Response.find({ userEmail });
      res.status(200).json(userResponses);
    } catch (error) {
      console.error('Error fetching user responses:', error);
      res.status(500).json({ message: 'Error fetching user responses' });
    }
  });
  
  
  router.patch('/:question', authenticateUser, async (req, res) => {
    try {
      const { question } = req.params;
      const { selectedOption, correctOption } = req.body;
      const userEmail = req.user.email; // Get the user's ID from the authenticated user
  
      // Find the existing response by the question and user
      const existingResponse = await Response.findOne({ question, userEmail });
  
      if (!existingResponse) {
        return res.status(404).json({ message: 'Response not found' });
      }
  
      // Update the selectedOption and correctOption
      existingResponse.selectedOption = selectedOption;
      existingResponse.correctOption = correctOption;
  
      // Save the updated response
      await existingResponse.save();
  
      res.status(200).json({ message: 'Response updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/', authenticateUser, async (req, res) => {
    const userEmail = req.user.email; // Get the user ID from the authenticated user
  
    try {
      // Delete all responses that belong to the authenticated user
      await Response.deleteMany({ userEmail });
  
      res.status(200).json({ message: 'All responses deleted successfully' });
    } catch (error) {
      console.error('Error deleting responses:', error);
      res.status(500).json({ message: 'Error deleting responses' });
    }
  });
  

  module.exports = router;