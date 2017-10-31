const express = require('express');
const router = express.Router();
const temperatureModel = require('../models/temperature');

router.get('/', (req, res) => {
	res.send('hello world');
});

let newTemperature = new temperatureModel({
	location: "thuis",
	temperature: 20.2,
	timestamp: Date.now()
});

temperatureModel.addTemperature(newTemperature, function(){
	console.log('ik denk dat ik er een heb toegevoegd.');
});


module.exports = router;