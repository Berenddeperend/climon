const { Writable } = require('stream');
const climateModel = require('../models/climate').climateModel;

const dbSaver = function(){
	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			climateModel.writePoints([
				{
					measurement: 'light(measurement)',
					tags: { location: obj.location },
					fields: { light: obj.light[0] }
				}
			]);

			done();
		}
	});

}; 

module.exports = dbSaver;