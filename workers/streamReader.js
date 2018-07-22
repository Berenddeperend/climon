const chalk = require('chalk');
const SerialPort = require('serialport');
const async = require('async');

const { Writable } = require('stream');
const { Readable } = require('stream');
const { Transform } = require('stream');

const newlineParser = new SerialPort.parsers.Readline();

module.exports = () => {
	return readStreams();
};


function listPorts() {
	SerialPort.list()
		.then((data) => {
			console.log(chalk.white('Available ports:'));
			data.map((port) => {
				console.log(chalk.yellow.underline(port.comName));
			});
		});
}

function tryConnection(port) {
	console.log(`Trying to connect to ${port.comName}...`);

	return new Promise(
			function(resolve, reject) {
				new SerialPort(port.comName, {
						baudRate: 9600,
					}, function(err) {
						//callback always gets called, with argument if error.
						if(err) {
							console.log(chalk.red(err));
							reject(err);
							// throw 'neen.'
						} else {
							console.log('connected!');
							resolve(this);
						}
					});
			}
	)
}


function readStreams() {
	const arduinoPorts = {
		genuino: "/dev/cu.usbmodem1421",
		nano: "/dev/tty.wchusbserial1420",
		duemilanove: "/dev/tty.usbserial-A9007O98"
	};

	listPorts();

	const arduino = SerialPort.list()
		.then((ports) => {
			//meh, I'd like this to be purer.
			// let i = 1;
			let i = 0;
			let isConnnected = false;

			const usbPorts = ports.reduce((acc, curr) => {
				if (curr.comName.toLowerCase().includes('usb')) {
					acc.push(curr);
				}
				return acc;
			}, []);


			async.until(test, iteration, cb);

			function test() {
				return isConnnected === true;
			}

			function iteration(callback) {
				// console.log('Attempt no. ' + i);

				if(i === usbPorts.length) {
					// console.log('tried them all, handing to final error handler')
					callback('failsors');
				} else {
					tryConnection(usbPorts[i]).then((response) => {
						isConnnected = true;
						callback(null, response);
					}).catch((err) => {
						i++;
						callback(null, err);
					});
				}
			}

			function cb(err, result) {
				if(err) {
					console.log('none of the ports could connect:');
					console.log(err);
					return err;
				}	else {
					console.log('I think i connected to a port:');
					// console.log(result.isOpen)
					return result;
				}
			}

			/*
				Todo:
				sequentually try to connect to every port with the string 'USB'
				Do this with promises.
			 */
		});

	// const arduino = new SerialPort(arduinoPorts.genuino, {
	// 	baudRate: 9600
	// }, (err) => {
	// 	console.log(chalk.gray(`Connecting to Arduino on port ${arduinoPorts.genuino} failed:`));
	// 	console.log(chalk.gray((err)));
	// });
	//
	// return arduino.pipe(newlineParser);
}