const axios = require("axios");
const { processMessages } = require("../messageProcessor.js");
const apiKey = process.env.OPENAI_API_KEY;
// openAi configuration
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

// empty array where the schemas will be pushed, so if the history want's to be visible this array can be called
const upcomingMessage = [];

const createFeaturePrompt = async (req, res) => {
  // for the user_prompt parameter
  const { userPrompt } = req.query;
  console.log(userPrompt);

  //  concatenating the fetched data to prompt for the whole prompt to be sent to gpt
  let contentString = ` I want you to act as product feature generator with a Marketing Expert or Senior Business Analayst skills that will thinks step by step or debates pros and cons before suggesting an answer. Your suggestion will be based on the product that user will give you, you will give me a new feature that best fit to it and your task is to use artificial intelligence tools to give the best feature possible for it. You should also use your rhetorical knowledge and experience in giving the effective product features that is feasible and unique.The prompt should be self-explenatory and appropriate to the product. ${userPrompt}  is the Product Title,You will focus on generating the feature and only the feature nothing more nothing less. Make only 3 features and always include a very short explanation along with the feature generated like this:
    {
    "FeatureOne": " feature and the very short explanation",
    "FeatureTwo": " feature and the very short explanation ",
    "FeatureThree": " feature and the very short explanation ",
    }, 
    Strictly, don't generate or include messages that is not part of the given format, also limit the tokens for exactly 20 tokens per features object value, Strictly follow the given format don't change anything on it including the characters. Just stick to the format that is provided and just generate only the answer do not include any unnecessary words like the number of tokens and any other words. Just strictly follow the format.
    `;

  // object schema for the upcomingMessage array
  let messages = {
    role: "user",
    content: contentString,
  };

  // before pushing the schema, Check first if the user has an input title
  if (userPrompt !== "" || userPrompt === undefined || userPrompt === null) {
    upcomingMessage.push(messages); // push to the array every objects that is made by the user
  }

  // console.log(upcomingMessage);
  // const data = {
  //   model: "gpt-3.5-turbo",
  //   messages: [...upcomingMessage],
  // };

  // sending the request to the openai api endpoint
  const completion = await processMessages(req, upcomingMessage); //algorithm made to fetch the data
  // const jsonString = completion.data.choices[0].message.content;
  console.log(completion);
  res.status(201).json({
    answer: completion,
  });
};

module.exports = {
  createFeaturePrompt,
};
