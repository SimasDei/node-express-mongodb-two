// Controller will deal with CRUD operations regarding Book
// Import Express
const express = require('express');
let router = express.Router();

// Call a router GET function, set response to a JSOn file
// later. will export a Form for user input
router.get('/', (req, res) => {
  res.json('this is a test, woohoo !');
});

// Export the route from the controller
module.exports = router;