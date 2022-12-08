// Import express
const express = require('express');

// Import nurses-controller
const nursesRoutes = require('./../controllers/nurses-controller.js');

// Create router
const router = express.Router();

// Add route for GET request to retrieve all nurses
// In server.js, nurses route is specified as '/nurses'
// this means that '/all' translates to '/nurses/all'
router.get('/all', nursesRoutes.nursesAll);

// Add route for GET request to retrieve one nurse
// In server.js, nurses route is specified as '/nurses'
// this means that '/name' translates to '/nurses/name'
router.get('/name', nursesRoutes.nursesName);

// Add route for GET request to retrieve nurse(s) on a ward
// In server.js, nurses route is specified as '/nurses'
// this means that '/ward' translates to '/nurses/ward'
router.get('/ward', nursesRoutes.nursesWard);

// Add route for POST request to create a new nurse
// In server.js, nurses route is specified as '/nurses'
// this means that '/create' translates to '/nurses/create'
router.post('/create', nursesRoutes.nursesCreate);

// Add route for PUT request to update a specific nurse
// In server.js, nurses route is specified as '/nurses'
// this means that '/update' translates to '/nurses/update'
router.put('/update', nursesRoutes.nursesUpdate);

// Add route for PUT request to delete a specific nurse
// In server.js, nurses route is specified as '/nurses'
// this means that '/delete' translates to '/nurses/delete'
router.put('/delete', nursesRoutes.nursesDelete);

// Add route for PUT request to reset nurseshelf list
// In server.js, nurses route is specified as '/nurses'
// this means that '/reset' translates to '/nurses/reset'
router.put('/reset', nursesRoutes.nursesReset);

// Export router
module.exports = router;

