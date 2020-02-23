const pg = require('pg');

const config = {
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long client can remain idle before closing
};

if (process.env.NODE_ENV === 'development') {
  config.host = 'localhost';
  config.port = 5432;
  config.database = 'booksapi';
  config.user = 'postgres';
  config.password = 'jared';
} else if (process.env.NODE_ENV === 'production') {
  config.host = process.env.HOST_NAME;
  config.port = process.env.RDS_PORT;
  config.database = process.env.RDS_DB_NAME;
  config.user = process.env.RDS_USERNAME;
  config.password = process.env.RDS_PASSWORD;
}

console.log(`connecting to database ${config.database} on host ${config.host}`);

// creating connection pool

const pool = new pg.Pool(config);

// on off chance an error occurs with an idle client, it will emit an error
pool.on('error', (err, client) => { console.error(`idle client error with ${client}:\n message: ${err.message}\n stack: ${err.stack}`); });

module.exports = {
  query: (query, values, callback) => {
    console.log('query:', query, values);
    return pool.query(query, values, callback);
  },
  connect: (callback) => pool.connect(callback),
};
