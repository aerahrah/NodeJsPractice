const express = require("express");
const authenticate = require("../middleware/auth");
const { processMessages } = require("../messageProcessor"); // Import the processMessages function

const {
  generateProductRecommendation,
  generateProductRecommendationCSV,
} = require("../controllers/productCopyRecommendationController");

const router = express.Router();
router.post(
  "/csv",
  authenticate,
  generateProductRecommendationCSV(processMessages)
);
router.post("/", authenticate, generateProductRecommendation(processMessages));
module.exports = router;
