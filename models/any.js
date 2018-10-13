//a model for getting data of any kind from the database.
// All of the interaction with this model should go here. Creating it, searching through it, etc.

const mongoose = require('mongoose');

//schema is the shape the documents will have
const temperatureSchema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	temperature: {
		type: [Number],
		default: undefined,
		required: false
	},
	light: {
		type: [Number],
		default: undefined,
		required: false
	},
	moist: {
		type: [Number],
		default: undefined,
		required: false
	},
	humidity: {
		type: [Number],
		default: undefined,
		required: false
	},
	timestamp: {
		type: Date,
		required: true
	}
});

//model is the table/collection. An instance of a modal is a document.
const TemperatureModel = mongoose.model('temperatureModel', temperatureSchema, 'temperatures');

//document is an entry
const add = function(document, callback) {
    document.save(callback);
};

//get all documents
const getAll = function() {
  return new Promise((resolve, reject) => {
    TemperatureModel
      .find()
      .exec((err, res) => {
          if(err) {
              reject(err);
          }
          resolve(res);
      });
  });
};

const getGroupedByHour = function() {
	console.log('getting...');

	return new Promise((resolve, reject) => {
		TemperatureModel
			.aggregate(
				[{
					$group: {
						_id: {
								'hour': { $hour: '$timestamp' }
							},
						Gemiddeld: { $avg: { $avg: '$temperature' } },
						Aantal: { $sum: 1 }
					}
				}, {
					$sort: { '_id': 1}
				}
			])
			.exec((err, res) => {
				console.log('execcing...');

				if(err) {
					reject(err);
				}
				resolve(res);
			});
	});
};

const getAllFromAnyModel = function(modelName) {
	return new Promise((resolve, reject) => {
		mongoose.model(modelName)
			.find()
			.exec((err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
	});
};

module.exports.test = "hello";

// module.exports.BerendModel = BerendModel;
// module.exports.climateSchema = climateSchema;
module.exports.add = add;
module.exports.getAll = getAll;

module.exports.getGroupedByHour = getGroupedByHour;

//shouldn't be here probably
module.exports.getAllFromAnyModel = getAllFromAnyModel;