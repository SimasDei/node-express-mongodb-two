// Book Model, import mongoose
const mongoose = require('mongoose');
// Create a book Schema
// Give structure to the Book Document
let bookSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  genre: {
    type: String
  },
  imageUrl: {
    type: String
  },
  date: {
    type: String,
    default: Date.now()
  }
});

// Register the Schema, Use Uppercase, then pass the schema
mongoose.model('Book', bookSchema);