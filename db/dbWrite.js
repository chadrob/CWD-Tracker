const mongoose = require("mongoose");

module.exports = function (Test, currentPost) {
  // add data to database
  async function createTest(currentPost) {
    const course = new Test({
      test: currentPost,
    });
    const result = await course.save();
    console.log(result);
  }
  createTest(currentPost);
};
