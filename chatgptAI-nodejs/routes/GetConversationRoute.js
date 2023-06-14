const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const Conversation = require("../models/conversationSchema");

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const conversation = await Conversation.find({ user: userId });
    res.json(conversation);
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
