const express = require("express");
const router = express.Router();

const {
  deleteById,
  getAllKeys,
} = require("../controllers/apiKeyController.js");

router.get("/delete", deleteById);
router.get("/read", getAllKeys);

module.exports = router;
