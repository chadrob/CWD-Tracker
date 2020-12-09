const downloadNewData = require('./functions/downloadNewData');
const analyzeResults = require('./functions/analyzeResults');
const findMyNumber = require('./functions/findMyNumber');
const sendEmail = require('./functions/sendEmail');

const command = process.argv[2];
let trackingNum = process.argv[3];

const run = async (command) => {
	if (command === 'update') {
		await downloadNewData();
	} else if (command === 'analyze') {
		await analyzeResults();
	} else if (command === 'find') {
		if (!trackingNum) trackingNum = '289320725';
		const result = await findMyNumber(trackingNum);
		if (!result) {
			console.log('Results not found.');
		} else {
			console.log(result);
			let resultStr = `Tracking Number: ${result.trackingNumber} => ${result.cwdResult}`;
			sendEmail(resultStr);
		}
	}
};

run(command);
