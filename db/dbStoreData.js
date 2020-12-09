const mongoose = require("mongoose");

module.exports = async function (Log, data) {
  console.log("Saving to database . . .");
  const log = new Log(data);
  const result = await log.save();
  console.log("Save complete.");
};
