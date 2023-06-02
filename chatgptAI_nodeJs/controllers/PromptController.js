const mongoose = require("mongoose");
const Prompt = require("../models/precreatePromptSchema");

async function getPromptFeature(promptId) {
  try {
    const prompt = await Prompt.findOne({ prompt_id: promptId });
    if (prompt) {
      const promptFeature = prompt.prompt_feature;
      return promptFeature;
    } else {
      console.log(`Prompt with prompt_id ${promptId} not found.`);
      return "";
    }
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
}

async function createPrompt(promptId, promptString) {
  const prompt = new Prompt({
    prompt_id: promptId,
    prompt_feature: promptString,
  });
  return await prompt.save();
}

module.exports = {
  getPromptFeature,
  createPrompt,
};
