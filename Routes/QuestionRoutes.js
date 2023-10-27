const express = require('express');
const router = express.Router();
const Question = require('../Model/Questions');


router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});
  
  module.exports = router;