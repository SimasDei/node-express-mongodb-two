const mongoose = require('mongoose');

// Create a Schema fro tasks
const taskSchema = mongoose.Schema({
  title:{
    type: String
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
const Task = module.exports = mongoose.model('Tasks', taskSchema);

// Get Tasks C<R>UD
module.exports.getTasks = function (callback, limit) {
  Task.find(callback).limit(limit);
};

// Get a single Task By Id
module.exports.getTaskById = function (id, callback) {
  Task.findById(id, callback);
};

// Add a  task, <C>RUD ! Will take a Task object. Data from a Form
module.exports.addTask =  (task, callback) => {
  Task.create(task, callback);
};
