const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TwootSchema = new Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 100 },
  timeStamp: { type: Date },
  title: { type: String, required: true },
  body: { type: String, required: true, minLength: 1, maxLength: 300 },
});

module.exports = mongoose.model("twoot", TwootSchema);
