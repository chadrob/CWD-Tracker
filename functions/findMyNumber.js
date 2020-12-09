require('mongoose');
const dbConnect = require('../db/dbConnect');
const dbDisconnect = require('../db/dbDisconnect');

module.exports = async function (trackingNum) {
	// connect to mongodb
	let Log = await dbConnect();
	// collect all data
	console.log('Searching for ' + trackingNum);
	const result = await Log.find({});
	// close mongodb
	dbDisconnect();
	// get results from all collections and store in resultsArray
	const resultsArray = [];
	result.forEach((o) => {
		o.results.forEach((a) => {
			resultsArray.push(a);
		});
	});

	// search for tracking number
	const foundResult = resultsArray.find(
		(element) => element.trackingNumber === trackingNum
	);

	// return tracking number results if found
	if (foundResult) {
		return foundResult;
	} else {
		return null;
	}
};
