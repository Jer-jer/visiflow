const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/emailValidationController");

router.post("/", EmailController.validateEmails);

module.exports = router;
