const getCurrentPost = require('../scrapers/getCurrentPost');
const getDownloadURL = require('../scrapers/getDownloadURL');
const downloadData = require('../pdf/downloadData');
const pdfParser = require('../pdf/pdfParser');
const dbConnect = require('../db/dbConnect');
const dbDisconnect = require('../db/dbDisconnect');
const dbSearch = require('../db/dbSearch');
const dbStoreData = require('../db/dbStoreData');

module.exports = async function () {
	// look up current CWD data posting
	console.log('Checking cwdsk.ca for new CWD data...');
	const currentPost = await getCurrentPost();
	console.log('Current Post: ' + currentPost);
	// connect to MongoDB
	let Log = await dbConnect();
	// read last saved post
	let search = { title: currentPost };
	let postExists = await dbSearch(Log, search);
	// if current posting is new
	if (postExists) {
		console.log('NO NEW DATA. This data has previously been collected.');
	} else {
		console.log('There is new data to be collected!');
		console.log('Downloading data...');
		// download pdf
		const downloadURL = await getDownloadURL();
		const downloaded = await downloadData(downloadURL);
		if (downloaded) {
			// convert pdf to json object
			const parsedData = await pdfParser(downloaded);
			// // store new data to mongodb
			await dbStoreData(Log, parsedData);
		} else {
			console.log('Failed to download.');
		}
	}
	// disconnect from MongoDb
	await dbDisconnect();
};
