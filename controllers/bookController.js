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
    viewTitle: 'Create! [-C-] R U D'
  });
});

// POST router, if Id already set, Update the Record
router.post('/', (req, res) => {
  if (req.body._id === '') {
    insertRecord(req, res);

  } else {
    updateRecord(req, res)
  }
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

// Update Selected Record
function updateRecord(req, res) {
  // Use mongoose method to find object, then update it
  // With the new request data
  Book.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc => {
    if (!err) {res.redirect('book/list')}
    else {
      if (err.name === 'ValidationError') {
        handleValidationError(err, req.body)
        res.render('book/addOrEdit', {
          viewTitle: 'Update Book',
          book: req.body
        })
      } else {
        console.log('Error During Book Update' + err)
      }
    }
  }));
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
  Book.find((err, doc) => {
    // all records inside the docs object, if no errors,
    // render the list view
    if (!err) {
      res.render('book/list', {
        list: doc
      });
    } else {
      console.log('Error displaying the Book List ' + err)
    }
  });
})

// Retrieve a book by a specific Id whick is created by MongoDb
router.get('/:id', (req, res) => {
  Book.findById(req.param._id, (err, doc) => {
    // Get id from request parameters, if no error. pass document
    if (!err){
    // Render view with passed data
      res.render('book/addOrEdit', {
        viewTitle: 'Edit Book Details',
        book: doc
      })
    }
  })
})



// Export the route from the controller
module.exports = router;