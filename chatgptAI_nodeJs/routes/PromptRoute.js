const express = require("express");
const router = express.Router();
const {
  createPrompt,
  getAllPrompts,
  getPromptAllFeatures,
  deleteById,
  updateById,
} = require("../controllers/promptController");

router.get("/list", async (req, res) => {
  try {
    const allPrompts = await getPromptAllFeatures();
    res.status(201).json(allPrompts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
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
//router for fetching all of the prompts
router.get("/read", async (req, res) => {
  try {
    const response = await getAllPrompts();
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//router for updating a prompt
router.put("/update", async (req, res) => {
  try {
    const promptId = req.body.promptId;
    const promptString = req.body.promptString;
    const response = await updateById(promptId, promptString);
    console.log(response);
    res.status(201).json({ message: "Prompt Update successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//router for deleting a prompt
router.delete("/delete", async (req, res) => {
  try {
    const promptId = req.body.promptId;
    const response = await deleteById(promptId);
    console.log(response);
    res.status(201).json({ message: "Prompt Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
