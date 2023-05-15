const { Pool } = require('pg');


  const pool = new Pool({
    host: 'localhost',
    port:5432,
    user: 'andres',
    password: 'afs1167',
    database: 'aterriza_BD'

  });

module.exports = pool;




