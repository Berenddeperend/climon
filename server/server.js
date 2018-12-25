const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();

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
	console.log('giving the modelnames');
	climateModel.getDatabaseNames().then(dbNames => {
		res.json(dbNames);
	})
});


router.get('/climon/data/:modelname', (req, res) => {
	console.log(req.params.modelname)
	climateModel.query(`
		SELECT * FROM lucht
	`).then(data => {
		res.json(data)
	})
});


//
// router.get('/tempmon/data', (req, res) => {
// 	console.log('ik heb een request ontvangen');
//
//
// 	temperatureModel.getEachHour().then(function(data){
// 		res.json(data);
// 	});
// });


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