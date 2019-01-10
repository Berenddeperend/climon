//general
require('dotenv').config();
const chalk = require('chalk');
const config = require('./config/database');
const port = process.env.PORT || 4000;

//models
const { initClimonDb } = require('./models/climate'); 
const { startupsModel, initStartups } = require('./models/startups'); 
const { initDb, listDataBases, models, getDataBaseModel, deleteDb } = require('./models/general');

//controllers

//server
const server = require('./server/server');
server.init(port);

//workers
// const mockStream = require('./workers/mockStream');
// const logStream = require('./workers/logger');
// const stringParser = require('./workers/stringParser');
// const stringToInfluxObjs = require('./workers/stringToInfluxObjs');
// const prettyPrintObject = require('./workers/objStreamLogger');
// const objValidator = require('./workers/objValidator');
// const arduino = require('./workers/arduino');
// const dbSaver = require('./workers/dbSaver');

//database 

const retry = require('async').retry;

retry({times: 3, interval: 1000}, initStartups, function(err, result) {
	if(err) console.log(err);
});

// let isLocal = port === 4000;
// initClimonDb().then(()=> {
// 	// mockStream({ multiple: true })
// 	arduino('usb')
// 	// .pipe(logStream({objectMode: false}))
// 	.pipe(stringToInfluxObjs())
// 	// .pipe(objValidator())
// 	// .pipe(prettyPrintObject())
// 	.pipe(logStream({objectMode: true}))
// 	.pipe(dbSaver({ verbose: false }))
// });



// initDb('joepfried')
// 	.then((db) => {
// 		console.log(db);
// 	}
// );

// listDataBases().then(dbs => {
// 	console.log(dbs);
// })


// deleteDb('express_response_db');

// getDataBaseModel('joepfried').then(db => {
// 	console.log(db)
// })

// // SELECT mean("temperature") AS "mean_temperature", mean("humidity") AS "mean_humidity" FROM "climon"."autogen"."lucht" 
// climateModel.query(`
// SELECT mean("temperature") AS "mean_temperature", mean("humidity") AS "mean_humidity" FROM "climon"."autogen"."lucht"
// `).then(result => {
// 	// console.log(result.length)
// 	result.map(entry => {
// 		// console.log(entry, entry.time.toNanoISOString())
// 	})
// });


