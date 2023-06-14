// this route will be authenticated using the signin method.
// auth middleware will be moved in this route
// this route is not accessible unless signed in

const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();
const {createApiKey} = require('../controllers/genKeyController.js')

router.post("/api-keys", authenticate, createApiKey);

module.exports = router;
