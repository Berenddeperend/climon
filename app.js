//general
require('dotenv').config();
const chalk = require('chalk');
const config = require('./config/database');
const port = process.env.PORT || 4000;

//models
const { climateModel, initClimonDb } = require('./models/climate'); 
const models = require('./models/general');

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
initClimonDb();


// SELECT mean("temperature") AS "mean_temperature", mean("humidity") AS "mean_humidity" FROM "climon"."autogen"."lucht" 
climateModel.query(`
SELECT mean("temperature") AS "mean_temperature", mean("humidity") AS "mean_humidity" FROM "climon"."autogen"."lucht"
`).then(result => {
	console.log(result.length)
	result.map(entry => {
		console.log(entry, entry.time.toNanoISOString())
	})
});


mockStream()
// arduino('usb')
		// .pipe(logStream({objectMode: false}))
		.pipe(stringToInfluxObjs())
		// .pipe(objValidator())
		// .pipe(prettyPrintObject())
		// .pipe(logStream({objectMode: true}))
		// .pipe(dbSaver());
