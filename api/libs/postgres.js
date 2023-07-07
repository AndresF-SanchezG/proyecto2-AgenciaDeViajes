const { Pool } = require('pg');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`


  // const pool = new Pool({
  //   host: 'localhost',
  //   port:5452,
  //   user: 'andress',
  //   password: 'afs11677',
  //   database: 'DB-clients',

  // });

const pool = new Pool({ connectionString: URI });

module.exports = pool;




