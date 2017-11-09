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

module.exports.getAll = () => {
	return new Promise(function(resolve, reject){
		Temperature.find({
			temperature: { $gt: 28 }
		}, function(err, data){
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

};

