//DONE CHECKING
const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", passport.authenticate("local"), authController.login);

router.get("/logout", authController.logout);

module.exports = router;
