const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const {
  createFeatureSuggestion,
} = require("../controllers/ProductFeatureSuggestionFilesController.js");
const {
  createFeaturePrompt,
} = require("../controllers/productFeatureSuggestionController.js");
const authenticate = require("../middleware/auth.js");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", authenticate, createFeaturePrompt);

// file_upload is the input fieldname in the body
router.post("/files", authenticate, createFeatureSuggestion);

module.exports = router;
