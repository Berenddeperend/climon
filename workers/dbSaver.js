const { Writable } = require('stream');
const climateModel = require('../models/climate').climateModel;
const chalk = require('chalk');

const dbSaver = function(args = {verbose: false}){
	const verbose = args.verbose;

	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			if(verbose) {
				console.log(chalk.gray('Saving ') + chalk.yellow(obj.length) + chalk.gray(' point(s) to influxDB.'))
			}
			// climateModel.writePoints(obj)
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