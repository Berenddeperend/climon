//logs a readable stream.

const { Transform } = require('stream');

module.exports = (args) => {
	return new Transform({
		objectMode: args.objectMode,
		transform(chunk, encoding, done) {
			if(args.objectMode) {
				console.log(chunk);
			} else {
				console.log(chunk.toString());
			}
			this.push(chunk);
			done();
		}
	});
};