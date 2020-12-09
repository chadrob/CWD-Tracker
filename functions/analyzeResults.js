require('mongoose');
const dbConnect = require('../db/dbConnect');
const dbDisconnect = require('../db/dbDisconnect');

module.exports = async function () {
	// connect to mongodb
	let Log = await dbConnect();
	// collect all data
	const result = await Log.find({});

	const resultsArray = [];
	result.forEach((o) => {
		o.results.forEach((a) => {
			resultsArray.push(a);
		});
	});

	let neg = 0;
	let pos = 0;
	let unTestable = 0;

	resultsArray.forEach((a) => {
		if (a.cwdResult === 'Negative') {
			neg++;
		} else if (a.cwdResult === 'Positive') {
			pos++;
		} else {
			unTestable++;
		}
	});
	const testable = resultsArray.length - unTestable;
	console.log('\nCWD RESULTS\n');
	console.log(
		'Total: ' + resultsArray.length + ' tests => Testable: ' + testable
	);
	console.log(
		'Negative (healthy): ' +
			neg +
			' cases = ' +
			Math.round((100 * neg) / testable) +
			'%'
	);
	console.log(
		'Positive (sick): ' +
			pos +
			' cases = ' +
			Math.round((100 * pos) / testable) +
			'%'
	);
	await dbDisconnect();
};
