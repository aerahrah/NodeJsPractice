const express = require("express");
const router = express.Router();
const promptController = require("./promptController");

router.post("/create-prompt", async (req, res) => {
  try {
    const prmptId = req.body.promptId;
    const promptString = req.body.promptString;
    await promptController.createPrompt(prmptId, promptString);
    res.json({ message: "Prompt created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
