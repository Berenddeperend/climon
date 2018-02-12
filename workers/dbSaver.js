/**
 * Deze module krijgt een stream aan objecten.
 * Deze objecten moeten geparsed worden. 
 * Maak een switch/case voor ieder type data.
 * ieder type data krijgt zijn eigen database model
 * En deze wordt opgeslagen.
 * 
 * Maar eerst sla ik denk ik gewoon de data 'dom' op.
 */


const { Writable } = require('stream');
const mongoose = require('mongoose');
const moment = require('moment');

const RawDataSchema = mongoose.Schema({
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

const model = mongoose.model('MyRawMockData', RawDataSchema);

// temperatureModel.addTemperature(newTemperature, function(){
//   console.log(`Temperature number ${counter} added.`);
// });


const databaseSaver = function(){
  return new Writable({
    objectMode: true,
    write(obj, encoding, done){
      let berend = new model({
        temperature: obj.temp,
        location: obj.location,
        timestamp: Date.now()
      });

      berend.save();
      console.log(obj);
      done();
    }    
  });
}

module.exports = databaseSaver;