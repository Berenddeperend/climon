const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const Influx = require('influx'); //todo: remove later


const climateModel = require('../models/climate').climateModel;


//declare routes here
//routes should use controllers
//controllers could also be used elsewhere.

// router.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/../public/index.html'));
// });
// 
// 
router.get('/api/collections', (req, res) => {
	climateModel.getDatabaseNames().then(dbNames => {
		res.json(dbNames);
	})
});

router.get('/api/:dbName/query', (req, res) => {
	const query = req.headers.query
	const model = new Influx.InfluxDB({ //shouldn't happen here
		host: 'localhost',
		database: req.params.dbName,
	 });
	 return model.query(query).then(result => {
		 res.json(result)
	 });
})

router.post('/api', (req, res) => {
	console.log(req.body)
	res.send('Hier heb je een response.')
	// console.log('recieved post request, saving to db..');
	// climateModel.writePoints();
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