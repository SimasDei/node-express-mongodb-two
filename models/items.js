const mongoose = require('mongoose');

// Create a Schema fro tasks
const itemSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the model + the model Schema
const Item = module.exports = mongoose.model('Items', itemSchema);

// Get Tasks C<R>UD
module.exports.getItems = function (callback, limit) {
  Item.find(callback).limit(limit);
};