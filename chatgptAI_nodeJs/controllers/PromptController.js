const mongoose = require("mongoose");
const Prompt = mongoose.model("prompts");

async function queryOne(promptId) {
  const queryOne = Prompt.where({ prompt_id: promptId });
  return await queryOne.findOne();
}

async function createPrompt(prmptId, promptString) {
  const prompt = new Prompt({
    prompt_id: prmptId,
    prompt_feature: promptString,
  });
  return await prompt.save();
}

module.exports = {
  queryOne,
  createPrompt,
};
