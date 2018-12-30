const { Readable } = require('stream');

module.exports = (args = { multiple: true }) => {
	const readStream = new Readable({
		read(size){}
	});

	readStream.push(randomStringBuilder(args.multiple));

	setInterval(() => {
		readStream.push(randomStringBuilder(args.multiple));
	}, 1000);

	return readStream;
};

//Arduino should be in charge of normalizing the data, not the backend. 
function randomStringBuilder(multiple) {
	if(multiple) {
		return `measurement=klimaat&tag/String/location=Testlocatie 1&field/Number/temperature=${randomNumberAsString()}&field/Number/temperature=${randomNumberAsString()}&field/Number/light=${randomNumberAsString()}`;
	} else {
		return `measurement=klimaat&tag/String/location=Testlocatie 1&field/Number/temperature=${randomNumberAsString()}`;
	}
}

//measurement=klimaat&tag/String/location=Testlocatie 1&field/Number/temperature=122&field/Number/temperature=23&field/Number/light=100

function randomNumberAsString() {
	return String(Math.round(Math.random() * 1023));
}