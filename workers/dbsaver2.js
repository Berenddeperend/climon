const { Writable } = require('stream');
const mongoose = require('mongoose');

const dataTypes = {
	location: {
		type: String,
		required: true
	},
	temperature: {
		type: Number,
		required: false
	},
	light: {
		type: Number,
		required: false
	},
	moist: {
		type: Number,
		required: false
	},
	humidity: {
		type: Number,
		required: false
	},
	timestamp: {
		type: Date,
		required: true
	}
};

const CreateModel = function(data, modelName) {
	let schemaObj = {};

	for (const prop in data) {
		schemaObj[prop] = dataTypes[prop];
	}

	console.log(schemaObj);

	return new mongoose.model(modelName, new mongoose.Schema(schemaObj));
};

const databaseSaver2 = function(modelName){
	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			let model = CreateModel(obj, modelName);
			model.save();
			done();
		}
	});

};

module.exports = databaseSaver2;