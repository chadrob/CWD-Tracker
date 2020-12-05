const mongoose = require("mongoose");

module.exports = async function (Log, currentPost) {
  const log = await Log.findOne({ title: currentPost });
  if (log) {
    return true;
  }
  return false;
};
