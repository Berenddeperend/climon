//logs a readable stream.

const { Writable } = require('stream');

module.exports = () => {
	return new Writable({
		write(chunk, encoding, done) {
			console.log('from our logger:');
			console.log(chunk.toString());
			done();
		}
	});
};