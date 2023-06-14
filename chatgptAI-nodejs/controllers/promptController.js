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
async function getPromptAllFeatures() {
  try {
    const prompt = await Prompt.find({});
    console.log(prompt);
    if (prompt) {
      const promptIds = prompt.map((prompt) => ({
        prompt_id: prompt.prompt_id,
      }));

      return promptIds;
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
// function for getting all the prompts in the database
async function getAllPrompts() {
  try {
    const prompt = await Prompt.find({});
    if (prompt) {
      const allPrompts = prompt.map((key) => ({
        promptId: key.prompt_id,
        promptFeature: key.prompt_feature,
      }));
      return allPrompts;
    }
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
}

// delete a prompt by Id
async function deleteById(promptId) {
  try {
    const prompt = await Prompt.deleteOne({ prompt_id: promptId });
    if (prompt) return prompt;
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
}

//update prompt by promptid
async function updateById(promptId, newPrompt) {
  try {
    const prompt = await Prompt.updateOne(
      { prompt_id: promptId },
      { prompt_feature: newPrompt }
    );
    if (prompt) return prompt;
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
}

module.exports = {
  getPromptFeature,
  getPromptAllFeatures,
  createPrompt,
  getAllPrompts,
  deleteById,
  updateById,
};
