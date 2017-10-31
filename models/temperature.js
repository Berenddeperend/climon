const mongoose = require('mongoose');

const TemperatureSchema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	temperature: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	}
});


const Temperature = module.exports = mongoose.model('Temperature', TemperatureSchema );


module.exports.addTemperature = (newTemperature, callback) => {
	newTemperature.save(callback);
};