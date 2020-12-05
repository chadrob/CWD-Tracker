const puppeteer = require("puppeteer");

module.exports = async function () {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // set the page size to similar size as my monitor
  await page.setViewport({
    width: 1600,
    height: 900,
    deviceScaleFactor: 1,
  });
  await page.goto("https://publications.saskatchewan.ca/#/products/108155");
  await page.waitForSelector(
    "body > div > div > div > div > div:nth-child(3) > div.col-xs-12.col-md-9 > div:nth-child(4) > ul > li > a"
  );
  const element = await page.$(
    "body > div > div > div > div > div:nth-child(3) > div.col-xs-12.col-md-9 > div:nth-child(4) > ul > li > a"
  );
  const href = await page.evaluate(
    (element) => element.getAttribute("href"),
    element
  );
  const downloadURL = "http://publications.saskatchewan.ca" + href.substring(1);
  await browser.close();
  return downloadURL;
};
