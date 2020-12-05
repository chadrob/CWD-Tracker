const getCurrentPost = require("../scrapers/getCurrentPost");
const getDownloadURL = require("../scrapers/getDownloadURL");
const downloadData = require("../pdf/downloadData");
const pdfParser = require("../pdf/pdfParser");
const dbConnect = require("../db/dbConnect");
const dbDisconnect = require("../db/dbDisconnect");
const dbRead = require("../db/dbRead");
const dbWrite = require("../db/dbWrite");

module.exports = async function () {
  // connect to MongoDB
  const Log = await dbConnect();
  // look up current CWD data posting
  const currentPost = await getCurrentPost();
  console.log("current post: " + currentPost);
  // read last saved post
  let postExists = await dbRead(Log, currentPost);
  // if current posting is new
  if (!postExists) {
    console.log("There is new data to be collected!");
    // download pdf
    const downloadURL = await getDownloadURL();
    const downloaded = await downloadData(downloadURL);
    if (downloaded) {
      // convert pdf to json object
      const parsedData = await pdfParser(downloaded);
      // // store new data to mongodb
      await dbWrite(Log, parsedData);
    } else {
      console.log("Failed to download.");
    }
  } else {
    console.log("no new data.");
  }
  // disconnect from MongoDb
  await dbDisconnect();
};
