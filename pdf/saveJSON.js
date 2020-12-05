"use strict";
const fs = require("fs");

module.exports = async function (data) {
  let results = JSON.stringify(data);
  fs.writeFileSync("results.json", results);
};
