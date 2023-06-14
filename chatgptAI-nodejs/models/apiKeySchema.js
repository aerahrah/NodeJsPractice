const mongoose = require("mongoose");

// Define the User schema
const apiKeySchema = new mongoose.Schema({
  userAcc: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  apiKey: { type: String, required: true },
});

// Create the User model
const ApiKey = mongoose.model("ApiKeys", apiKeySchema);

module.exports = ApiKey;
