const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  email: { type: String, required: true, minLength: 1, maxLength: 100 },
  password: { type: String, required: true, minLength: 1, maxLength: 100 },
  status: { type: Boolean, required: true },
});

//export model
module.exports = mongoose.model("Member", MemberSchema);
