const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor");
const {
  generateCustomerReviewInsight,
} = require("../controllers/CustomerReviewInsightController");

router.post("/", authenticate, generateCustomerReviewInsight(processMessages));

module.exports = router;
