const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const {
  generateMediaPostUser,
} = require("../controllers/GenerateMediaPostController");

const router = express.Router();

router.post("/", authenticate, generateMediaPostUser(processMessages));
module.exports = router;
