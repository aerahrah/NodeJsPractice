const express = require("express");
const authenticate = require("../middleware/auth");
const authenticateKey = require("../middleware/apiKeyAuth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const { promptFeature } = require("../controllers/mainPromptController");

const router = express.Router();

router.post("/", authenticate, authenticateKey, promptFeature(processMessages));
module.exports = router;
