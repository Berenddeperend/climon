//general
require('dotenv').config();
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');

//models
const anyModel = require('./models/any');
const climateModel = require('./models/climate');

//controllers
const tempmonController = require('./controllers/tempmon');

//server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
let isLocal = port === 4000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', tempmonController);
app.listen(port, () => {
	console.log(chalk.gray(`Starting the server at port ${port}`));
});

//views

//workers
const mockStream = require('./workers/mockStream');
const logReadableStream = require('./workers/logger');
const stringParser = require('./workers/stringParser');
const objStreamLogger = require('./workers/objStreamLogger');
const objValidator = require('./workers/objValidator');
const dbSaver = require('./workers/dbSaver');
const arduino2 = require('./workers/arduino2');
const databaseSaver2 = require('./workers/dbsaver2');







mongoose.connect(config.database.mlab, {
	useNewUrlParser: true
}).then(() => {
	console.log(chalk.gray(`Succesfully connected to database ${mongoose.connection.host}`));

	const collections = tempmonController.fetchCollections();

	console.log(collections);


	// anyModel.getAllFromAnyModel(collections[2]).then(data => {
	// 	console.log(data);
	// })

	// anyModel.getAll().then(data => {
	// 	console.log(data);
	// })

	climateModel.getGroupedByHour().then(data => {
		if(!data.length) {
			console.log('no results found.');
		}
		data.map(item => {
			console.log(`${item._id.hour} uur: ${item.Gemiddeld},    aantal: ${item.Aantal}`)
		})
	})

}).catch((error) => {
	console.log(chalk.red(`Connect to database failed:`));
	console.log(chalk.red(error));
});

// mockStream()
arduino2('usb')
// 	.pipe(logReadableStream())
		.pipe(stringParser())
		.pipe(objValidator())
		.pipe(objStreamLogger())
		// .pipe(dbSaver());
		// .pipe(databaseSaver2());