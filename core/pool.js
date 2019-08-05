const util = require('util');
const mysql = require('mysql');

/**
 * Database Connection
 * */

const pool = mysql.createPool({
	connectionlimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_spinelhouse'
});

pool.getConnection((err, connection) => {
	if(err)
		console.log('Error in establishing database connection.');

	if(connection)
		connection.release();
	return
});

pool.query = util.promisify(pool.query);

module.exports = pool;