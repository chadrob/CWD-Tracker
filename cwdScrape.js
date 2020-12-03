const puppeteer = require("puppeteer");

module.exports = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // set the page size to similar size as my monitor
  await page.setViewport({
    width: 1600,
    height: 900,
    deviceScaleFactor: 1,
  });
  await page.goto(
    "https://www.saskatchewan.ca/residents/environment-public-health-and-safety/wildlife-issues/fish-and-wildlife-diseases/chronic-wasting-disease/cwd-testing-results"
  );
  await page.click(
    "#body-form_mainForm-div8-div3-div1_a-main-content-section-p6-a"
  );
  await page.waitForSelector(
    "body > div > div > div > div > div:nth-child(4) > div > div.col-xs-12.col-md-9 > div:nth-child(3) > product-list-item:nth-child(3) > div > div > div > div > div > a > span:nth-child(1)"
  );
  const element = await page.$(
    "body > div > div > div > div > div:nth-child(4) > div > div.col-xs-12.col-md-9 > div:nth-child(3) > product-list-item:nth-child(3) > div > div > div > div > div > a > span:nth-child(1)"
  );
  const text = await page.evaluate((element) => element.textContent, element);
  await browser.close();
  return text;
};
