const until = require('async/until');

const numbers = [1,2,3,4,5,6,7,8,9,10];

let i = 0;

//test, iteratee, ?callback
until(test, iteratee, atLast);

function test() {
	return i === 2;
}

function iteratee(callback) {
	i++;

	console.log('checking.. ' + i)

	setTimeout(() => {
		if (i === 3) {
			callback('error', i);
		} else {
			callback(null, i)
		}
	}, 1000);
}

function atLast(err, string) {
	if(err) {
		return console.log('error!: ' + err)
	}
	console.log('at last... ' + string);
}


// var count = 0;
// until(
// 		function() { return count > 5; },
// 		function(callback) {
// 			count++;
// 			setTimeout(function() {
// 				callback(null, count);
// 			}, 1000);
// 		},
// 		function (err, n) {
// 			console.log('yep ' + n)
// 			// 5 seconds have passed, n = 5
// 		}
// );