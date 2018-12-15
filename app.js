const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Getthe Models for the DB
Task = require('./models/tasks');
Item = require('./models/items');

// Connect to Mongoose
mongoose.connect('mongodb+srv://SimasDei:02894145@baltic-react-mongodb-one-l0d3u.mongodb.net/crud?retryWrites=true', { useNewUrlParser: true });

const db = mongoose.connection;

// Get HTTP request C<R>UD
app.get('/', (req, res) => {
  res.send('Ahoy there, Sailor o/. Use the /api/tasks path')
});

// Route to get Tasks from DB
app.get('/api/tasks', (req, res) => {
  Task.getTasks((err, tasks) =>{
    if (err) {
      throw err;
    }
    res.json(tasks);
  });
});

// Route to get Task By ID
// Route to get Tasks from DB
app.get('/api/tasks/:_id', (req, res) => {
  Task.getTaskById(req.params._id, (err, task) => {
    if (err){
      throw err;
    }
    res.json(task);
  }
)})

//Route to ADD a task <C>RUD
app.post('/api/task', (req, res) => {
  let task = req.body;
  Task.addTask(task,(err, task) =>{
    if (err) {
      throw err;
    }
    res.json(task);
  });
});



// Route to get Items from DB
app.get('/api/items', (req, res) => {
  Item.getItems((err, tasks) =>{
    if (err) {
      throw err;
    }
    res.json(tasks);
  });
});


app.listen(3000);
console.log('I am Alive ! port: 3000');