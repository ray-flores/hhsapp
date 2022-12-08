// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "nurses"
knex.schema
  // Make sure no "nurses" table exists
  // before trying to create new
  .hasTable('nurses')
    .then((exists) => {
      if (!exists) {
        // If no "nurses" table exists
        // create new, with "id", "first name", "last name",
        // "ward" and "email" columns
        // and use "id" as a primary key
        // and increment "id" with every new record (nurse)
        return knex.schema.createTable('nurses', (table)  => {
          table.increments('id').primary()
          table.string('firstName')
          table.string('lastName')
          table.string('ward')
          table.string('email')
        })
        .then(() => {
          // Log success message
          console.log('Table \'nurses\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// For debugging purposes:
// Log all data in "nurses" table
// knex.select('*').from('nurses')
//   .then(data => console.log('data:', data))
//   .catch(err => console.log(err))

// Export the database
module.exports = knex