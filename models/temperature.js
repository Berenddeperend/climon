const mongoose = require('mongoose');
const moment = require('moment');

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

function buildFullQuery(timestamp){
	return { $gt: 10, $lt: 20 };

	//hierin kan ik van de argument twee nieuwe timestamps maken, eentje een seconde voor de argument, eentje een seconde erna.
}


module.exports.getAll = () => {
	return new Promise(function(resolve, reject){
		Temperature.find({
			// temperature: { $gt: 22 },
			// temperature: buildFullQuery(),
			// timestamp: new Date()
		})
		.exec(function(err, data){
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

};

