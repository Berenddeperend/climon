const { Readable } = require('stream');
const SerialPort = require('serialport');


module.exports = async (comPortString) => {
	return new Promise((resolve) => {
		findArduino(comPortString)
			.then(arduino => {
				return connectToArduino(arduino);
			}).then(connection => {
				const stream = new Readable({
					read(){}
				});

				connection.on('data', (data) => {
					stream.push(data.toString());
				});

				resolve(stream);
			});
	});
};

async function findArduino(comPortString) {
	return await SerialPort.list()
		.then(ports => {
			return ports.find(port => {
				return port.comName.toLowerCase().includes(comPortString);
			});
		});
}

function connectToArduino(arduino) {
	return new Promise((resolve, reject) => {
		new SerialPort(arduino.comName, function(err) {
			if (err) {
				console.log(`error connecting to Arduino ${arduino.comName}:`);
				console.log(err);
			} else {
				resolve(this);
				console.log('connected succesfully');
			}
		});
	});
}