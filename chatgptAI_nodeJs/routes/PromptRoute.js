const express = require("express");
const router = express.Router();
const { createPrompt } = require("../controllers/promptController");

router.post("/create", async (req, res) => {
  try {
    const promptId = req.body.promptId;
    const promptString = req.body.promptString;
    await createPrompt(promptId, promptString);
    res.json({ message: "Prompt created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
