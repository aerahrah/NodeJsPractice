const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const app = express();
const port = 3500;

require("dotenv").config();

const upload = multer({ dest: "uploads/" });

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

app.use(express.json());

let conversation = [];
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  let csvDataString = "";
  const messages = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      // console.log(data);
      // console.log(data[0]);
      const message = data.Name;
      console.log(message);
      if (message) {
        csvDataString += message + "\n";
      }
    })
    .on("end", async () => {
      fs.unlinkSync(filePath);
      messages.push({
        role: "user",
        content: csvDataString,
      });
      // const messagesJson = JSON.stringify(messages);

      const response = await processMessages(messages);

      res.json({ message: response });
    });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: message,
    },
  ];

  const response = await processMessages(messages);

  res.json({ message: response });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

  // console.log(responseData);
  // console.log(generatedMessages);
  conversation.push(...messages, ...generatedMessages);

  return responseData;
}
