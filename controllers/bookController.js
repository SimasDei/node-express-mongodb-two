// Controller will deal with CRUD operations regarding Book
// Import Express
const express = require('express');
let router = express.Router();
// Import Mongoose to form a request model
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Call a router GET function, set response to a JSOn file
// later. will export a Form for user input
router.get('/', (req, res) => {
  // Remder the book view with the recieved data
  res.render('book/addOrEdit', {
    viewTitle: 'Read or Update. C -R- -U- D'
  });
});

// POST router
router.post('/', (req, res) => {
  insertRecord(req, res);
});

// Insert Request Data into the Database
function insertRecord (req, res) {
  //Hse tbe object Schema
  let book = new Book();
  // Put in values from the request object
  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.imageUrl = req.body.imageUrl;
  // To save Data, Call save from the Schema Object
  // Inside the function. 2 parameters. error and document
  book.save((err, doc) => {
    // if there is no error, redirect to another route
    if (!err){
      res.redirect('/book/list')
    } else {
      // If form va;idation fails, pass the error, and run validation function
      if (err.name === 'ValidationError') {
        handleValidationError(err, req.body);
      };
      res.render('book/addOrEdit', {
        viewTitle: 'Read or Update. C -R- -U- D',
        // Return the posted request,to be edited by user
        book: req.body
      });
    //  Print the error in the console
      console.log('Damn, Coulnt post this.' + err)
    }
  });
}

// Validation Function
function handleValidationError(err, body) {
  // inside the error object there are couple of properties
  for (field in err.errors){
    // Use switch to go through error fields
    switch (err.errors[field].path) {
      case 'title':
        body['titleError'] = err.errors[field].message;
        break;
      case 'author':
        body['authorError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }

}

// Get the List of Books and Route it
router.get('/list', (req, res) => {
  //Use mongoDB Find method on the Book Schema
  Book.find((err, docs) => {
    // all records inside the docs object, if no errors,
    // render the list view
    if (!err) {
      res.render('book/list', {
        list: docs
      });
    } else {
      console.log('Error displaying the Book List ' + err)
    }

  });
})

// Export the route from the controller
module.exports = router;