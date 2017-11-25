const express = require('express');
const router = express.Router();
const moment = require('moment');
const temperatureModel = require('../models/temperature');
const path = require('path');

router.get('/', (req, res) => {
	// res.sendFile('../public/index.html');
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});




router.get('/tempmon/data', (req, res) => {
	console.log('ik heb een request ontvangen');



	temperatureModel.getAll().then(function(data){
		let arr = [];

		data.forEach(function(item){
			if ( queryFilter(item) ) {
				arr.push(item);
			}
		});

		res.json(arr);
	});
});


function queryFilter (item) {
	// return true;
	return moment(item.timestamp).format('ss') === '30' && moment(item.timestamp).format('mm') === '00';
}

module.exports = router;