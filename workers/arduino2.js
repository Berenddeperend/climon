const { Readable } = require('stream');
const SerialPort = require('serialport');
const chalk = require('chalk');

module.exports = (comPortString) => {
	const stream = new Readable({
		read(){}
	});

	findArduino(comPortString)
		.then(arduino => {
			return connectToArduino(arduino, comPortString);
		})
		.then(connection => {
			connection.on('data', (data) => {
				stream.push(data.toString());
			})
		})
	.catch(err => {
		console.log(chalk.red(err));
	});

	return stream.pipe(new SerialPort.parsers.Readline());
};

async function findArduino(comPortString) {
	return await SerialPort.list()
		.then(ports => {
			return ports.find(port => {
				return port.comName.toLowerCase().includes(comPortString);
			});
		});
}

function connectToArduino(arduino, comPortString) {
	return new Promise((resolve, reject) => {
		if(!arduino) {
			reject(`No comport found which includes the string '${comPortString}'`);
		}

		new SerialPort(arduino.comName, function(err) {
			if (err) {
				reject(`error connecting to Arduino ${arduino.comName}:`);
			} else {
				console.log('connected succesfully');
				resolve(this);
			}
		});
	});
}