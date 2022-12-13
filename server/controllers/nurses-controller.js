// Import database
const { first } = require('./../db');
const knex = require('./../db');

// Retrieve all nurses
exports.nursesAll = async (req, res) => {
  // Get all nurses from database
  knex
    .select('*') // select all records
    .from('nurses') // from 'nurses' table
    .then(userData => {
      // Send nurses extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving nurses: ${err}` })
    });
};

// Retrieve a nurse given a name 
exports.nursesName = async (req, res) => { // 'where' is undefined
  console.log(req, 'request')
  // Get all nurses from database
  knex
    .select('*') // select all records
    .from('nurses') // from 'nurses' table
    .where(
      'firstName', req.query.firstName
    )
    .orWhere( 
      'lastName', req.query.lastName
    ) // with first name OR last name
    .then(userData => {
      // Send nurses extracted from database in response
      console.log(userData)
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving the nurse(s): ${err}` })
    });
};

// Retrieve all nurses in a given ward
exports.nursesWard = async (req, res) => {
  // Get all nurses from database
  knex
    .select('*') // select all records
    .from('nurses') // from 'nurses' table
    .where({
      ward: req.body.ward
    }) // at this ward
    .orWhere({
      function () {
        this.where( 'firstName', req.body.firstName);
        this.where( 'lastName', req.body.lastName);
      }
    }) // with this name if given
    .then(userData => {
      // Send nurses extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving ward nurses: ${err}` })
    });
};

// Create new nurse
exports.nursesCreate = async (req, res) => {
  // Add new nurse to database
  knex('nurses')
    .insert({ // insert new record, a nurse
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'ward': req.body.ward,
      'email': req.body.email
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `nurse \'${req.body.firstName} ${req.body.lastName}\' created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.firstName} ${req.body.lastName} nurse: ${err}` })
    });
};

// Update specific nurse
exports.nursesUpdate = async (req, res) => {
  // Find specific nurse in the database and update it
  knex('nurses')
    .where('id', req.body.id) // find correct record based on id
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ward: req.body.ward,
      email: req.body.email
    }) // update the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `nurse ${req.body.id} updated.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error updating ${req.body.id} nurse: ${err}` })
    });
};

// Remove specific nurse
exports.nursesDelete = async (req, res) => {
  // Find specific nurse in the database and remove it
  knex('nurses')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `nurse ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} nurse: ${err}` })
    });
};

// Remove all nurses on the list
exports.nursesReset = async (req, res) => {
  // Remove all nurses from database
  knex
    .select('*') // select all records
    .from('nurses') // from 'nurses' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'nurse list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting nurse list: ${err}.` })
    });
};