module.exports.recordClimates = () => {
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


	//Stream is expected to be a string with this format: 'temp803light168'
	parsedStream.on('data', parseTemperature);

	let counter = 0;


	let string = "temp803light1268berend1223";
	let sensors = ["temp", "light"];

	function parseValues(string, sensors) {
		let output = {};

		for(let sensor of sensors) {
			if (parseValue(string, sensor)) {
				output[sensor] = parseValue(string, sensor);
			}
		}

		return output;

		function parseValue(string, sensor){
			// https://stackoverflow.com/questions/3569104/positive-look-behind-in-javascript-regular-expression
			let regex = new RegExp(`${sensor}(\\d{1,})`);
			if(string.match(regex)) {
				return Number(string.match(regex)[1]);
			} else {
				return null;
			}
		}
	}


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



	console.log(parseValues(string, sensors));





};