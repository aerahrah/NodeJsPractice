const { getPromptFeature } = require("../controllers/promptController");

const generateMediaPostUser = (processMessages) => async (req, res) => {
  const promptFeature = await getPromptFeature("generateMediaPost");
  const { message } = req.body;
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: `${promptFeature} ${message}`,
    },
  ];

  const response = await processMessages(req, messages);
  console.log(response);
  res.json({ message: response });
};

module.exports = {
  generateMediaPostUser,
};
