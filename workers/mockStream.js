const { Readable } = require('stream');

module.exports = () => {
  let isAlive = true;

	const readStream = new Readable({
		// objectMode: true,
		read(size){
			// setTimeout(() => {
			// 	isAlive = false;
			// 	readStream.push(null);
			// }, 2000);
		}
	});

	readStream.push(randomStringBuilder());

	setInterval(() => {
		if (isAlive) {
			readStream.push(randomStringBuilder());
		}
	}, 1000);

	return readStream;
};


//Arduino should be in charge of normalizing the data, not the backend. 
function randomStringBuilder() {

	//note: don't add timestmap here. Arduino doesn't do this for us, we'll do it on obj parse.
	// return `tag/location=Berend&field/temperature=${randomNumberAsString()}&field/temperature=${randomNumberAsString()}&field/light=${randomNumberAsString()}`;
	return `measurement=klimaat&tag/String/location=Testlocatie 1&field/Number/temperature=${randomNumberAsString()}&field/Number/temperature=${randomNumberAsString()}&field/Number/light=${randomNumberAsString()}`;

	function randomNumberAsString() {
		return String(Math.round(Math.random() * 1023));
	}
}