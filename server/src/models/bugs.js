const { Pool } = require('pg');

// TODO: move this to a .env
const PG_URI = 'postgres://hkpsvvpa:HVvRv1w-Kbe5bHI2qrts1WuUVMFVt8dQ@lallah.db.elephantsql.com';

const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};