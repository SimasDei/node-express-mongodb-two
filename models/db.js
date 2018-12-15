// Import mongoose for easy mongoDB manipulation
const mongoose = require('mongoose');

// Connect to mongoDB, Using mongoDB Atlas
mongoose.connect('mongodb+srv://SimasDei:02894145@baltic-react-mongodb-one-l0d3u.mongodb.net/crud?retryWrites=true', {useNewUrlParser: true}, (error) =>{
  // If there are no errors, Console log a success message
  if (!error) {console.log('Connected to MongoDb. Aww Yeah!')}
  else {console.log('Aww jeez, it\'s busted !' + error)}
});

// Require the Book Model and Schema
require('./book.model');