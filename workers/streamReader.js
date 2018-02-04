
const { Writable } = require('stream');
const { Readable } = require('stream');
const { Transform } = require('stream');


module.exports = () => {
	return readStreams();
};

function readStreams() {
	const arduinoPorts = {
		genuino: "/dev/cu.usbmodem1421",
		nano: "/dev/tty.wchusbserial1420",
		duemilanove: "/dev/tty.usbserial-A9007O98"
	};

	const SerialPort = require('serialport');
	const newlineParser = new SerialPort.parsers.Readline();
	
	const arduino = new SerialPort(arduinoPorts.duemilanove, {
		baudRate: 9600
	}, (err) => {console.log(`Connecting to Arduino on port ${arduinoPorts.duemilanove} failed.`)});

	return arduino.pipe(newlineParser);
}