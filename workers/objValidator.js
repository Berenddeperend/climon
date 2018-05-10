const { Transform } = require('stream');


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
		console.log('chunk invalid!');
		console.log(chunk);
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