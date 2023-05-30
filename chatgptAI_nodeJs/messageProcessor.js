let conversation = [];
require("dotenv").config();
const Conversation = require("./models/conversationSchema");

async function processMessages(req, messages) {
  const userId = req.user.id;
  console.log(`userId  ${userId}`);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [...conversation, ...messages],
    }),
  });
  const responseData = await response.json();
  const generatedMessages = responseData.choices.map((choice) => ({
    role: "assistant",
    content: choice.message.content,
  }));

  conversation.push(...messages, ...generatedMessages);
  const conversationData = [...messages, ...generatedMessages].map(
    (message) => ({
      user: userId,
      role: message.role,
      content: message.content,
    })
  );
  await Conversation.insertMany(conversationData);
  const generatedMessagesResponse = responseData.choices[0].message.content;

  return generatedMessagesResponse;
}
function getConversation() {
  return conversation;
}

module.exports = {
  processMessages,
  getConversation,
};
