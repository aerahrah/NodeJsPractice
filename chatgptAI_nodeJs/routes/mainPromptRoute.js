const express = require("express");
const authenticate = require("../middleware/auth");
const apiKeyOnlyUsage = require("../middleware/apiKeyOnly.js");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function
const { promptFeature } = require("../controllers/mainPromptController");
const { apiCompletion } = require("../controllers/apiCompletionController.js");
const router = express.Router();

router.post("/", authenticate, promptFeature(processMessages));
router.post("/completion", apiKeyOnlyUsage, apiCompletion);
module.exports = router;
