const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const Influx = require('influx'); //todo: remove later


const { initDb, getDataBaseModel, listDataBases, query, deleteDb } = require('../models/general');




//declare routes here
//routes should use controllers
//controllers could also be used elsewhere.

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});
// 
// 
router.get('/api/collections', (req, res) => {
	listDataBases().then(dbNames => {
		res.json(dbNames);
	}).catch((reason) => {
		console.log('list databases went wrong:')
		console.log(reason)
	})
});

router.post('/api/collections/:collectionName', (req, res) => {
	initDb(req.params.collectionName).then(response => {
		res.json(response);
	}).catch(reason => {
		console.log(`couldnt make db: ${req.params.collectionName}`);
		console.log(reason);
	})
})

router.delete('/api/:collection', (req, res) => {
	const dbName = req.params.dbName;
	deleteDb(dbName).then(()=> {
		res.json(`sucessfully removed database ${dbName}.`)
	}).catch((reason => {
		console.log(`couldnt remove database ${dbname}`);
		console.log(reason);
	})
);

router.get('/api/:collection/query', (req, res) => {
	const userQuery = req.headers.query;
	query(req.params.collection, userQuery)
		.then(result => res.json(result))
		.catch(reason => {
			console.log('failed to query:');
			console.log(reason);
		});
});

router.get('/api/:dbName/measurements', (req, res) => {
	getDataBaseModel(req.params.dbName)
		.then(model => {
			return model.getMeasurements();
		}).then(measurements => {
			console.log('measurements:', measurements)
			res.json(measurements);
		}).catch(reason => {
			reject(reason);
		});;
});

router.post('/api/collections/:collection/entry', (req, res) => {
	res.send('Hier heb je een response.')
	// climateModel.writePoints();
	
	initDb(req.params.collection)
		.then(model => {
			console.log(model);
			model.writePoints(req.body);
		}).catch(reason => {
			console.log('failed initdb because:');
			console.log(reason);
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