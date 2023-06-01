const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const twootSchema = new Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 100 },
  timeStamp: { type: Date },
  title: { type: String, required: true },
  twoot: { type: String, required: true, minLength: 1, maxLength: 300 },
});
