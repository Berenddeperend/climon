const express = require('express');
const router = express.Router();
const temperatureModel = require('../models/temperature');
const anyModel = require('../models/any');
const path = require('path');
const mongoose = require('mongoose');


router.get('/', (req, res) => {
	// res.sendFile('../public/index.html');
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/api/collections', (req, res) => {
	console.log('giving the modelnames');
	res.json(fetchCollections());
});

router.get('/climon/data', (req, res) => {
	anyModel.getAll()
					.then((data) => {
						res.json(data);
					});
});

router.get('/climon/data/:modelname', (req, res) => {
	anyModel.getAllFromAnyModel(req.params.modelname)
					.then((data) => {
						res.json(data);
					});
});

router.get('/tempmon/data', (req, res) => {
	console.log('ik heb een request ontvangen');


	temperatureModel.getEachHour().then(function(data){
		res.json(data);
	});
});

function fetchCollections() {
	//might be unneccissary, (mongoose.connection.modelNames();
	return Object.keys(mongoose.connection.collections);
}

module.exports = router;
module.exports.fetchCollections = fetchCollections;