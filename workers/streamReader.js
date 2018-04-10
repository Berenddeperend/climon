const chalk = require('chalk');

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
	
	const arduino = new SerialPort(arduinoPorts.genuino, {
		baudRate: 9600
	}, (err) => {
		console.log(chalk.gray(`Connecting to Arduino on port ${arduinoPorts.genuino} failed:`));
		console.log(chalk.gray((err)));
	});

	return arduino.pipe(newlineParser);
}