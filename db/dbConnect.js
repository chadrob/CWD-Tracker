// connect to MongoDB using Mongoose
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/CWD-Tracker", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

  // create Schema for data
  const testSchema = mongoose.Schema({
    test: String,
  });

  // create class object based on courseSchema
  const Test = mongoose.model("Test", testSchema);

  return Test;
};
