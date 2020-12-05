const mongoose = require("mongoose");
const dbConnect = require("../db/dbConnect");
const dbDisconnect = require("../db/dbDisconnect");

module.exports = async function () {
  const Log = await dbConnect();
  // await dbConnect();

  const result = await Log.find({});

  const resultsArray = [];
  result.forEach((o) => {
    o.results.forEach((a) => {
      resultsArray.push(a);
      console.log(a);
    });
  });

  let neg = 0;
  let pos = 0;
  let unTestable = 0;

  resultsArray.forEach((a) => {
    if (a.cwdResult === "Negative") {
      neg++;
    } else if (a.cwdResult === "Positive") {
      pos++;
    } else {
      unTestable++;
    }
  });
  console.log("\nCWD RESULTS\n");
  console.log("Total: " + resultsArray.length + " tests");
  console.log(
    "Negative: " +
      neg +
      " cases = " +
      Math.round((100 * neg) / resultsArray.length) +
      "%"
  );
  console.log(
    "Positive: " +
      pos +
      " cases = " +
      Math.round((100 * pos) / resultsArray.length) +
      "%"
  );
  console.log(
    "Un-Testable: " +
      unTestable +
      " cases = " +
      Math.round((100 * unTestable) / resultsArray.length) +
      "%"
  );
  await dbDisconnect();
};
