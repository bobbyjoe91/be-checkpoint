const mysql = require('mysql2');

const checkPointDB = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

function executeQuery(connection, query, arguments) {
  return new Promise((resolve, reject) => {
    const callback = (error, results, fields) => {
      error ? reject(error) : resolve(results);
    };

    connection.query(query, arguments, callback);
  });
}

module.exports = { checkPointDB, executeQuery };
