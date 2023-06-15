const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  prompt_id: {
    type: String,
    required: true,
  },
  prompt_feature: {
    type: String,
    required: true,
  },
  response_format: {
    type: String,
    required: true,
  }
});

const Prompt = mongoose.model("Prompts", promptSchema);

module.exports = Prompt;
