const fs = require("fs");
const pdf = require("pdf-parse");

module.exports = async function () {
  let dataBuffer = fs.readFileSync("cwdData/download.pdf");
  // initialize data object
  let data = {};
  // parse pdf into JSON object
  const pdfData = await pdf(dataBuffer);
  // add title and date to data object
  data.title = pdfData.info.Title;
  data.date = new Date();
  // parse pdfData into form: { trackingNumber: String, cwdResult: String}
  const regexp = /[\d]+[a-zA-Z]+/g;
  const array = [...pdfData.text.match(regexp)];
  let results = [];
  array.forEach((a) => {
    element = {};
    element.trackingNumber = a.match(/\d+/g).toString();
    element.cwdResult = a.match(/[a-zA-Z]+/g).toString();
    results.push(element);
  });
  data.results = results;

  return data;
};
