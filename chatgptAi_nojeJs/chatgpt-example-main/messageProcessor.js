let conversation = [];
require("dotenv").config();

async function processMessages(messages) {
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
  console.log(responseData);
  const generatedMessages = responseData.choices.map((choice) => ({
    role: "assistant",
    content: choice.message.content,
  }));

  conversation.push(...messages, ...generatedMessages);

  const generatedMessagesResponse = responseData.choices[0].message.content;

  return generatedMessagesResponse;
}

module.exports = {
  processMessages,
};
