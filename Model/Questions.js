const mongoose = require('mongoose');

// Define the schema
const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    type: String,
});

// Create the model
const Question = mongoose.model('Question', questionSchema);
