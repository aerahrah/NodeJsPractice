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
async function getResponseFormat(promptId) {
  try {
    const prompt = await Prompt.findOne({ prompt_id: promptId });
    if (prompt) {
      const responseFormat = prompt.response_format;
      return responseFormat;
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

async function createPrompt(promptId, promptString, newFormat) {
  try {
    const checkOne = await Prompt.find({prompt_id:promptId})
    let error = {};
    if(checkOne !== undefined) {
      error = {errorDisplay:"Prompt ID already Exist!"};
      console.log(error);
      return error;
    } else {
      const prompt = new Prompt({
      prompt_id: promptId,
      prompt_feature: promptString,
      response_format: newFormat,
      });
      return await prompt.save();
    }
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
  
}
// function for getting all the prompts in the database
async function getAllPrompts() {
  try {
    const prompt = await Prompt.find({});
    if (prompt) {
      const allPrompts = prompt.map((key) => ({
        promptId: key.prompt_id,
        promptFeature: key.prompt_feature,
        responseFormat: key.response_format,
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
async function updateById(promptId, newPrompt, newFormat) {
  try {
    const query = { prompt_id:promptId };
    let prompt;
    if(newPrompt !== undefined && newFormat === undefined) {
      prompt = await Prompt.findOneAndUpdate(query,{
        prompt_feature : newPrompt });
    return prompt
    } else if (newPrompt === undefined && newFormat !== undefined) {
      prompt = await Prompt.findOneAndUpdate(query,{
        response_format : newFormat });
    return prompt
    } else {
      prompt = await Prompt.findOneAndUpdate(query,{prompt_feature : newPrompt , response_format : newFormat });
      if (prompt) 
      return prompt;
    }
  } catch (error) {
    console.error("Error retrieving prompt feature:", error);
    throw error;
  }
}

module.exports = {
  getPromptFeature,
  getResponseFormat,
  getPromptAllFeatures,
  createPrompt,
  getAllPrompts,
  deleteById,
  updateById,
};
