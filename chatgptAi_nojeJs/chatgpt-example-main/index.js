const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const app = express();
const port = 3500;

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

app.use(express.json());

let conversation = [];

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  conversation.push({
    role: "system",
    content: "You are a helpful assistant.",
  });
  conversation.push({
    role: "user",
    content: message,
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversation,
    }),
  });

  const responseData = await response.json();
  const generatedMessage = responseData.choices[0].message.content;
  conversation.push({
    role: "assistant",
    content: generatedMessage,
  });

  res.json({ message: generatedMessage });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//   const response = await openai.createCompletion({
//     model: "gpt-3.5-turbo",
//     messages: conversation,
//     max_tokens: 144,
//     temperature: 0.7,
//     n: 1,
//     stop: "\n",
//   });
