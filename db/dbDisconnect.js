const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connection.close();
};
