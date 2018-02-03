
const { Writable } = require('stream');
const { Readable } = require('stream');
const { Transform } = require('stream');


module.exports.recordStreams = () => {
	readStreams();
};

module.exports.mockStream = () => {
	return mockStream();
};

function readStreams() {
	const arduinoPorts = {
		genuino: "/dev/cu.usbmodem1421",
		nano: "/dev/tty.wchusbserial1420",
		duemilanove: "/dev/tty.usbserial-A9007O98"
	};

	const SerialPort = require('serialport');
	const parser = new SerialPort.parsers.Readline();

	const arduino = new SerialPort(arduinoPorts.duemilanove, {
		baudRate: 9600
	});

	let parsedStream = arduino.pipe(parser);


	//Stream is expected to be a string with this format: "temp=802&light=111&berend=1233&location=woonkamer2"
	parsedStream.on('data', parseValues);

	let counter = 0;

	let string = "temp=802&light=111&berend=1233&location=woonkamer2";
}