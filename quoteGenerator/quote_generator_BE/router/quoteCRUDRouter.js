const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const {
  getAllQuotes,
  addQuotes,
} = require("../controllers/favoriteQuoteController");

router.post("/add", authenticate, addQuotes);
router.get("/get-all", getAllQuotes);

module.exports = router;
