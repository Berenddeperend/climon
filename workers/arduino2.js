const { Readable } = require('stream');
const SerialPort = require('serialport');


module.exports = (comPortString) => {
	return new Promise((resolve, reject) => {
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
			})
			.catch(err => {
				reject(err)
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
		if(!arduino) {
			reject('did not recieve thing')
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