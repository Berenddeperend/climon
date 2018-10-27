//general
require('dotenv').config();
const chalk = require('chalk');
const config = require('./config/database');
const port = process.env.PORT || 4000;

//models
const climateModel = require('./models/climate');

//controllers

//server
const server = require('./server/server');
server.init(port);

//workers
const mockStream = require('./workers/mockStream');
const logStream = require('./workers/logger');
const stringParser = require('./workers/stringParser');
const stringToInfluxObjs = require('./workers/stringToInfluxObjs');
const prettyPrintObject = require('./workers/objStreamLogger');
const objValidator = require('./workers/objValidator');
const arduino = require('./workers/arduino');
const dbSaver = require('./workers/dbSaver');

//database
let isLocal = port === 4000;

climateModel.query().then(result => {
	console.log(result);
});


mockStream()
// arduino('usb')
// 		.pipe(logStream({objectMode: false}))
		.pipe(stringParser())
		// .pipe(stringToInfluxObjs())
		// .pipe(objValidator())
		// .pipe(prettyPrintObject())
// 		.pipe(logStream({objectMode: true}));
		// .pipe(dbSaver());
