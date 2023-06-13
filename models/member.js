const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  email: { type: String, required: true, minLength: 1, maxLength: 100 },
  password: { type: String, required: true, minLength: 1, maxLength: 100 },
  status: { type: Boolean, required: true },
});

MemberSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//export model
module.exports = mongoose.model("Member", MemberSchema);
