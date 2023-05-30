const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const {
  generateSeoKeywordsCSV,
  generateSeoKeywordsUser,
} = require("../controllers/GenerateSeoKeywordsController");

const router = express.Router();

router.post("/csv", authenticate, generateSeoKeywordsCSV(processMessages));
router.post("/", authenticate, generateSeoKeywordsUser(processMessages));
module.exports = router;
