const express = require('express');
const router = express.Router();
const temperatureModel = require('../models/temperature');
const path = require('path');


router.get('/', (req, res) => {
	// res.sendFile('../public/index.html');
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});


router.get('/tempmon/data', (req, res) => {
	console.log('ik heb een request ontvangen');

	temperatureModel.getEachHour().then(function(data){
		res.json(data);
	});
});

module.exports = router;