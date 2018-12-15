// Book Model, import mongoose
const mongoose = require('mongoose');
// Create a book Schema
// Give structure to the Book Document
let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'The title is required.'
  },
  author: {
    type: String,
    required: 'A book needs an Author.'
  },
  genre: {
    type: String
  },
  imageUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Register the Schema, Use Uppercase, then pass the schema
mongoose.model('Book', bookSchema);