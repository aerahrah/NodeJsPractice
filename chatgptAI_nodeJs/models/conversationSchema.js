const mongoose = require("mongoose");

// Define the Conversation schema
const conversationSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
});

// Create the Conversation model
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
