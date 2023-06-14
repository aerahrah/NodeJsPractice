const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  password: { type: "string", required: true },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
