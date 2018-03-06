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

	setInterval(() => {
		if (isAlive) {
			readStream.push(randomStringBuilder());
		}
	}, 1000);

	return readStream;
};


//Arduino should be in charge of normalizing the data, not the backend. 
function randomStringBuilder() {
	return `temperature=${randomNumberAsString()}&temperature=${randomNumberAsString()}&light=${randomNumberAsString()}&location=TRIMM-Kaketoeplant`;

	function randomNumberAsString() {
		return String(Math.round(Math.random() * 1023));
	}
}