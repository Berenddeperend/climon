const { Writable } = require('stream');
const climateModel = require('../models/climate').climateModel;

const dbSaver = function(){
	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			climateModel.writePoints(obj)
			done();
		}
	});

}; 

module.exports = dbSaver;


const desiredOutcome = [
	{
		measurement: 'plantmoisture',
		tags: { 
			location: "woonkamer",
			plantType: "pannekoek",
			sensor: 1
		},
		fields: {
			moisture: 23,
		}
	},
	{
		measurement: 'plantmoisture',
		tags: { 
			location: "woonkamer",
			plantType: "pannekoek",
			sensor: 2
		},
		fields: {
			moisture: 27,
		}
	}
];