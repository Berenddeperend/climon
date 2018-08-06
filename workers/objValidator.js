const { Transform } = require('stream');
const chalk = require('chalk');

module.exports = () => {
	return new Transform({
		objectMode: true,
		transform(chunk, encoding, done) {
			this.push(test(chunk));
			done();
		}
	});
};


function test(chunk) {
	if (chunk === undefined) {
		console.log(chalk.red(`Chunk is 'undefined'.`));

	} else if(!hasLocation(chunk)) {
		console.log(chalk.red(`Doesn't contain a location.`));
		return chunk; //todo: instead of returning, reject and log.

	} else if (!locationIsString(chunk)){
		console.log(chalk.red(`property 'location' is not a string`));
		return chunk; //todo: instead of returning, reject and log.

	} else if(!hasTimestamp(chunk)) {
		console.log(chalk.red(`Doesn't contain a timestamp.`));
		return chunk; //todo: instead of returning, reject and log.

	} else {
		//everything went well.
		return chunk;
	}
}




//tests below
function locationIsString(chunk) {
	return typeof chunk.location === 'string';
}

function hasLocation(chunk) {
	return chunk.location.length > 0;
}

function hasTimestamp(chunk) {
	return typeof chunk.timestamp === 'number' && chunk.timestamp > 0;
}