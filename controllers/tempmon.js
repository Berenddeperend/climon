const express = require('express');
const router = express.Router();
const moment = require('moment');
const temperatureModel = require('../models/temperature');

router.get('/', (req, res) => {
	temperatureModel.getAll().then(function(data){
		let arr = [];

		data.forEach(function(item){
			if ( queryFilter(item) ) {
				arr.push(item);
			}
		});

		arr.forEach(function(item){
			console.log(`${item.timestamp}, it was ${item.temperature}`);
		});

		res.json(arr);
	});
});



function queryFilter (item) {
	return moment(item.timestamp).format('ss') === '00' && moment(item.timestamp).format('mm') === '00';
}


// router.post('/', (req, res) => {
// 	console.log(req.body);
//
// 	let newTemperature = new temperatureModel({
// 		location: "thuis",
// 		temperature: 20.2,
// 		timestamp: Date.now()
// 	});
//
// 	temperatureModel.addTemperature(newTemperature, function(){
// 		console.log('ik denk dat ik er een heb toegevoegd.');
// 	});
//
// 	res.send('thanks ik heb je submit binnen gekregen.');
// });

module.exports = router;