// connect to MongoDB using Mongoose
const mongoose = require('mongoose');

module.exports = function () {
	mongoose
		.connect('mongodb://localhost/CWD-Tracker', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to MongoDB.'))
		.catch((err) => console.error('Could not connect to MongoDB', err));

	// create Schema for data
	const cwdDataSchema = mongoose.Schema({
		title: String,
		date: Date,
		results: Array,
	});

	// create class object based on courseSchema
	let Log = mongoose.model('Log', cwdDataSchema);

	return Log;
};
