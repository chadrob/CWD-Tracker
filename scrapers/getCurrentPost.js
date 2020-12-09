const puppeteer = require('puppeteer');

module.exports = async function () {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	// set the page size to similar size as my monitor
	await page.setViewport({
		width: 1600,
		height: 900,
		deviceScaleFactor: 1,
	});
	await page.goto('https://publications.saskatchewan.ca/#/products/108155');
	await page.waitForSelector(
		'body > div > div > div > div > div:nth-child(1) > header > div > div:nth-child(2) > div > h1'
	);
	const element = await page.$(
		'body > div > div > div > div > div:nth-child(1) > header > div > div:nth-child(2) > div > h1'
	);
	const text = await page.evaluate((element) => element.textContent, element);
	await browser.close();
	return text;
};
