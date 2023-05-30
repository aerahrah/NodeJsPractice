const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthenticationController");

// Sign-up endpoint
router.post("/signup", authController.signup);

// Sign-in endpoint
router.post("/signin", authController.signin);

module.exports = router;
