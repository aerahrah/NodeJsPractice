const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const printHello = require("../controllers/quoteController");

router.get("/generate", authenticate, printHello);

module.exports = router;
