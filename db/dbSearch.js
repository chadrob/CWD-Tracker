const mongoose = require('mongoose');

module.exports = async function (Log, search) {
	const log = await Log.findOne(search);
	if (log) {
		return true;
	}
	return false;
};
