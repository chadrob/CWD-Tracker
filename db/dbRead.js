const mongoose = require("mongoose");

module.exports = function (Test) {
  // read data from database
  async function getTests() {
    const test = await Test.findOne({}, {}, { sort: { created_at: -1 } });
    if (test) {
      return test;
    }
    return null;
  }
  return getTests();
};
