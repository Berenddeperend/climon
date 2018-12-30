const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const Influx = require('influx'); //todo: remove later


const climateModel = require('../models/climate').climateModel;
const initDb = require('../models/general').initDb;
const getDataBaseModel = require('../models/general').getDataBaseModel;
const listDataBases = require('../models/general').listDataBases;


//declare routes here
//routes should use controllers
//controllers could also be used elsewhere.

// router.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/../public/index.html'));
// });
// 
// 
router.get('/api/collections', (req, res) => {
	listDataBases().then(dbNames => {
		res.json(dbNames);
	})
});

router.get('/api/:collection/query', (req, res) => {
	const query = req.headers.query
	const model = new Influx.InfluxDB({ //shouldn't happen here
		host: 'localhost',
		database: req.params.collection,
	 });
	 return model.query(query).then(result => {
		 res.json(result);
	 });
})

router.get('/api/:dbName/measurements', (req, res) => {
	getDataBaseModel(req.params.dbName)
		.then(model => {
			return model.getMeasurements();
		}).then(measurements => {
			console.log('measurements:', measurements)
			res.json(measurements);
		});
});

router.post('/api/:collection/entry', (req, res) => {
	res.send('Hier heb je een response.')
	// climateModel.writePoints();
	
	initDb(req.params.collection)
		.then(model => {
			model.writePoints(req.body);
		});
})

module.exports.init = function(port){
	const app = express();
	app.use(cors());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, '../public')));
	app.use('/', router);
	app.listen(port, () => {
		console.log(chalk.gray(`Starting the server at port ${port}`));
	});
}; 