const express = require("express");
const axios = require("axios");
const authenticate = require("../middleware/auth");

const router = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;

let conversation = [];
require("dotenv").config();
const Conversation = require("../models/conversationSchema");

router.post("/chat-categorize-review", authenticate, async (req, res) => {
  const { message } = req.body;

  // Validate request body
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const messages = [
    {
      role: "user",
      content: `Given the Data below, categorize the review into positive, negative, mixed, or neutral. The answer should only be "Positive", "Negative", "Mixed", or "Neutral".
        Output in JSON data in this format:
        {
          answer: []
        }`,
    },
    { role: "user", content: message },
  ];

  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 100,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const responseData = response.data;
    if (responseData.choices && responseData.choices.length > 0) {
      const reply = responseData.choices[0].message.content;

      const userId = req.user.id;
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

      return res.json({ reply });
    } else {
      return res.status(500).json({ error: "No reply from the chat bot" });
    }
  } catch (error) {
    console.error("Error making OpenAI API request:", error.message);
    return res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
