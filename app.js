//general
require('dotenv').config();
const chalk = require('chalk');
const config = require('./config/database');
const port = process.env.PORT || 4000;

//models
const anyModel = require('./models/any');
const climateModel = require('./models/climate');

//controllers

//server
const server = require('./server/server');
server.init(port);

//workers
const mockStream = require('./workers/mockStream');
const logStream = require('./workers/logger');
const stringParser = require('./workers/stringParser');
const prettyPrintObject = require('./workers/objStreamLogger');
const objValidator = require('./workers/objValidator');
const arduino = require('./workers/arduino');
const dbSaver = require('./workers/dbSaver');

//database
const mongoose = require('mongoose');
let isLocal = port === 4000;



mongoose.connect(config.database.mlab, {
	useNewUrlParser: true
}).then(() => {
	console.log(chalk.gray(`Succesfully connected to database ${mongoose.connection.host}`));

	const collections = mongoose.connection.modelNames();
	console.log(collections);

}).catch((error) => {
	console.log(chalk.red(`Connect to database failed:`));
	console.log(chalk.red(error));
});

// mockStream()
// arduino('usb')
// 		.pipe(logStream({objectMode: false}))
// 		.pipe(stringParser())
// 		.pipe(objValidator())
// 		.pipe(prettyPrintObject())
// 		.pipe(logStream({objectMode: true}));
// 		.pipe(dbSaver());
