const express = require('express');
const router = express.Router();
const moment = require('moment');
const temperatureModel = require('../models/temperature');

router.get('/', (req, res) => {
	res.send('../public/index.html');
});


// mongodb://Berend:vrijdag@ds042527.mlab.com:42527/tempmon

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
	return moment(item.timestamp).format('ss') === '00' && moment(item.timestamp).format('mm') === '00';
}

module.exports = router;