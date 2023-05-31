const express = require("express");
const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const authenticate = require("../middleware/auth");

const router = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;

let conversation = [];
require("dotenv").config();
const Conversation = require("../models/conversationSchema");

router.post("/upload-csv-categorize-review", authenticate, async (req, res) => {
  if (!req.files || !req.files.csvFile) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  const file = req.files.csvFile;

  if (file.mimetype !== "text/csv") {
    return res
      .status(400)
      .json({ error: "Invalid file format. Only CSV files are allowed." });
  }

  const tempFilePath = `uploads/${file.name}`;

  file.mv(tempFilePath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let hasReviewColumn = false;
    const reviews = [];

    fs.createReadStream(tempFilePath)
      .pipe(csv())
      .on("headers", (headers) => {
        hasReviewColumn = headers.includes("review");
      })
      .on("data", (data) => {
        if (hasReviewColumn) {
          reviews.push(data["review"]);
        }
      })
      .on("end", async () => {
        if (!hasReviewColumn) {
          fs.unlinkSync(tempFilePath); // Remove the uploaded file
          return res.status(400).json({
            error:
              'Invalid CSV file. The CSV file must have a "review" column.',
          });
        }

        const groupSize = 10;
        const totalGroups = Math.ceil(reviews.length / groupSize);

        const reply = [];

        for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
          const startIndex = groupIndex * groupSize;
          const endIndex = startIndex + groupSize;
          const group = reviews.slice(startIndex, endIndex);

          const reviewsString = JSON.stringify(group);

          const messages = [
            {
              role: "user",
              content: `Given the Data below, categorize the review into positive, negative, mixed, or neutral. The answer should only be "Positive", "Negative", "Mixed", or "Neutral".
                Output in JSON data in this format:
                {
                  answer: []
                }`,
            },
            { role: "user", content: reviewsString },
          ];

          const payload = {
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 50,
            temperature: 0,
          };

          try {
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
              const perReply = responseData.choices[0].message.content;

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

              reply.push(perReply);
            } else {
              console.error("No reply from the chat bot");
            }
          } catch (error) {
            console.error("Error making OpenAI API request:", error.message);
          }
        }

        fs.unlinkSync(tempFilePath); // Remove the uploaded file

        return res.json({ reply });
      });
  });
});

module.exports = router;
