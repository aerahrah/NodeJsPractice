const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const {
    generateRevenueActivityInsight
} = require("../controllers/GenerateRevenueInsightController");

const router = express.Router();

router.post("/", authenticate, generateRevenueActivityInsight(processMessages));
module.exports = router;
