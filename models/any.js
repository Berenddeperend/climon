//a model for getting data of any kind from the database.
// All of the interaction with this model should go here. Creating it, searching through it, etc.

const mongoose = require('mongoose');

//model is the table/collection. 
const climateModel = mongoose.model('climateModel', climateSchema);

//schema is the shape the documents will have
const climateSchema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	temperature: {
		type: [Number],
		required: false
  },
  light: {
		type: [Number],
		required: false
	},
	moist: {
		type: [Number],
		required: false
	},
	humidity: {
		type: [Number],
		required: false
	},
	timestamp: {
		type: Date,
		required: true
	}
});

//document is an entry
const add = function(document, callback) {
    document.save(callback)
}

//get all documents
const getAll = function() {
    return new Promise((resolve, reject) => {
        climateModel
            .find()
            .exec((err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

module.exports.climateModel = climateModel;
module.exports.climateSchema = climateSchema;
module.exports.addClimateDocument = addClimateDocument;
module.exports.add = add;
module.exports.getAll = getAll;