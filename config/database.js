const logins = require('./passwords');


// 27017 is the default port number.
module.exports = {
	database: {
		local: 'mongodb://localhost:27017/tempmon',
		// mlab: `mongodb://${logins.mlab.username}:${logins.mlab.password}@ds042527.mlab.com:42527/tempmon`,
		mlab: `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds042527.mlab.com:42527/tempmon`,
	},
	berend: "Deftige knaap"
};