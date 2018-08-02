const { Writable } = require('stream');
const mongoose = require('mongoose');
const climateModel = require('../models/any');

const databaseSaver2 = function(){
	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			//an instance of a model is a document.
			let document = new climateModel.ClimateModel(obj)
			document.save(err => {
				console.log(err);
			});

			done();
		}
	});

}; 

module.exports = databaseSaver2;