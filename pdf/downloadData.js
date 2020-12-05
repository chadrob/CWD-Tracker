const fs = require("fs");
const download = require("download");

module.exports = async function (url) {
  console.log("Downloading data . . .");
  await download(url, "cwdData");
  console.log("Download complete. ");
  return true;
};
