const nodemailer = require('nodemailer');

module.exports = (results) => {
	let transport = new nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'kaiserking117@gmail.com',
			pass: 'guitar1!',
		},
	});

	let mailOptions = {
		from: 'kaiserking117@gmail.com',
		to: 'robertsonchad1@gmail.com',
		subject: 'CWD Test Results',
		text: results,
	};

	transport.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log('sent');
		}
	});
};
