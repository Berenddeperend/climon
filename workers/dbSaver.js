const { Writable } = require('stream');
const berendModel = require('../models/any');

const dbSaver = function(){
	return new Writable({
		objectMode: true,
		write(obj, encoding, done){
			//an instance of a model is a document.
			let document = new berendModel.BerendModel(obj);
			document.save(err => {
				if(err) {
					console.log(err);
				}
			});

			done();
		}
	});

}; 

module.exports = dbSaver;