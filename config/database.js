const logins = require('./passwords');


// 27017 is the default port number.
module.exports = {
	// database: 'mongodb://localhost:27017/tempmon',
	database: `mongodb://${logins.mlab.username}:${logins.mlab.password}@ds042527.mlab.com:42527/tempmon`,
	berend: "Deftige knaap"
};