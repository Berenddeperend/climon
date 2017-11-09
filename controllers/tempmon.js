const express = require('express');
const router = express.Router();
const temperatureModel = require('../models/temperature');

router.get('/', (req, res) => {
	res.send('hello world');
});

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