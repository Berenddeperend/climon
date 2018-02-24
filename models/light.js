const mongoose = require('mongoose');


const lightSchema = module.exports.lightSchema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	lightValue: {
		type: [Number],
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	}
});

const lightModel = module.exports.lightModel = mongoose.model('Light', lightSchema);

module.exports.addLight = () => {

};



// function parseLight(value){
// 	let voltage = (value / 1024) * 5;
// 	let degs = (voltage - 0.5) * 100;

// 	// console.log(` Value: ${value}\n voltage: ${voltage}\n degs: ${degs.toFixed(1)}\n ------`);

// 	let newTemperature = new temperatureModel({
// 		location: "thuis",
// 		temperature: degs,
// 		timestamp: Date.now()
// 	});

// 	counter++;

// 	temperatureModel.addTemperature(newTemperature, function(){
// 		console.log(`Temperature number ${counter} added.`);
// 	});
// }