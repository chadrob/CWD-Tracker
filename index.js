const cwdScrape = require("./cwdScrape");
const dbConnect = require("./db/dbConnect");
const dbDisconnect = require("./db/dbDisconnect");
const dbRead = require("./db/dbRead");
const dbWrite = require("./db/dbWrite");
require("./db/dbRead");

async function run() {
  // look up current CWD data posting
  const currentPost = await cwdScrape();
  // connect to MongoDB
  const Test = await dbConnect();
  // read last saved post
  let lastPost = await dbRead(Test);
  // if current posting is new, add to MongoDB
  if (lastPost._doc.test != currentPost) {
    await dbWrite(Test, currentPost);
  } else {
    console.log("No new data.");
  }
  // disconnect from MongoDb
  // await dbDisconnect();
}

run();
