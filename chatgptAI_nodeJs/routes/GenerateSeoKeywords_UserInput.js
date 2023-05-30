const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");

module.exports = (processMessages) => {
  router.post("/", authenticate, async (req, res) => {
    const { message } = req.body;
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: `Generate related SEO Keywords for this data: ${message} and output it in this format:
        {
          keywords: []
        }
        `,
      },
    ];

    const response = await processMessages(req, messages);
    console.log(response);
    res.json({ message: response });
  });
  return router;
};
