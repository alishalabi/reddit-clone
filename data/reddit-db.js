/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://localhost/reddit-db";
mongoose.Promise = global.Promise;
mongoose.connect(
  // // Pre-Step 2
  // url,
  // { useNewUrlParser: true },
  // function(err, db) {
  //   assert.equal(null, err);
  //   console.log("Connected successfully to database");
  //
  //   // db.close(); turn on for testing
  // }
  // Adding Connection Script and Supporting Connection Error Handling and Promises
  url,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;
