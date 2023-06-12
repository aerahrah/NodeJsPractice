const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const printHello = require("../controllers/movieListController");

router.get("/movieList", authenticate, printHello);

module.exports = router;
