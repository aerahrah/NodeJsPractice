const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const {
  generateUserAcquisitionUser,
} = require("../controllers/UserAcquisitionController");

const router = express.Router();

router.post("/", authenticate, generateUserAcquisitionUser(processMessages));
module.exports = router;
