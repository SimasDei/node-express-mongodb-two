// Add the database request statement
require('./models/db');
// Import Body Parser for form submissions
const bodyParser = require('body-parser');
// Add request Statement for Express
const express = require('express');
// import Path from NodeJs
const path = require('path');
// Import express-Handlebars
const exphbs = require('express-handlebars');

// Assign express to app
let app = express();

// Put from data into the request callback
app.use(bodyParser.urlencoded({
  extended: true
}));
// Convert the data into a JSON Request object. Body attribute
app.use(bodyParser.json());

//Import Book Controller
const bookController = require('./controllers/bookController');


// Set the View Directory
app.set('views', path.join(__dirname, '/views/'));
// Configure express for Handlebars view engine, Set main layout
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: __dirname + '/views/layouts/'}));
// Set the view engine
app.set('view engine', 'hbs');

// Init the listen function and set the port
app.listen(3000, () => {
  // Print the success message and the port
  console.log('Server started ! port: 3000')
});

//Configure the Routing, apply .use, pass the Book Controller
app.use('/book', bookController);