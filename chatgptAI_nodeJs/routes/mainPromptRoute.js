const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const { promptFeature } = require("../controllers/mainPromptController");

const router = express.Router();

router.post("/", authenticate, promptFeature(processMessages));
module.exports = router;
