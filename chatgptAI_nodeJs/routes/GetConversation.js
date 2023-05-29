const express = require("express");
const router = express.Router();

const { getConversation } = require("../messageProcessor");

router.get("/", async (req, res) => {
  const conversation = await getConversation();
  res.json(conversation);
});

module.exports = router;
