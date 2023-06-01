const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  email: { type: String, required: true, minLength: 1, maxLength: 100 },
  password: { type: String, required: true, minLength: 1, maxLength: 100 },
  member: { type: Boolean, required: true },
});
