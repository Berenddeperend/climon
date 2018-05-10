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
}


function test(chunk) {
	if(
		locationIsString(chunk) &&
		hasLocation(chunk) &&
		hasTimestamp(chunk)
	) {
		return chunk;
	} else {
		console.log(chalk.red('chunk invalid!'));
		// console.log(chalk.red(chunk));
		return chunk; //instead of returing, i should reject and log.
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