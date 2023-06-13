const mongoose = require("mongoose");
require("dotenv").config();

const conn = process.env.DB_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(conn);
}
const connection = mongoose.connection;
module.exports = connection;
