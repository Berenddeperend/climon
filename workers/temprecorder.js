const temperatureModel = require('../models/temperature'); //this was here i think..

module.exports.recordTemperatures = () => {
	const arduinoPorts = {
		genuino: "/dev/cu.usbmodem1421",
		nano: "/dev/tty.wchusbserial1420",
		demilanove: "/dev/tty.usbserial-A9007O98"
	};

	const SerialPort = require('serialport');
	const parser = new SerialPort.parsers.Readline();

	const arduino = new SerialPort(arduinoPorts.demilanove, {
		baudRate: 9600
	});

	let parsedStream = arduino.pipe(parser);

	parsedStream.on('data', parseTemperature);

	let counter = 0;

	function parseTemperature(value){
		let voltage = (value / 1024) * 5;
		let degs = (voltage - 0.5) * 100;

		// console.log(` Value: ${value}\n voltage: ${voltage}\n degs: ${degs.toFixed(1)}\n ------`);

		let newTemperature = new temperatureModel({
			location: "thuis",
			temperature: degs,
			timestamp: Date.now()
		});

		counter++;

		temperatureModel.addTemperature(newTemperature, function(){
			console.log(`Temperature number ${counter} added.`);
		});
	}
};