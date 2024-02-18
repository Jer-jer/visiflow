//DONE CHECKING
const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.post('/login', passport.authenticate('local', {session: false}), authController.login);

router.get("/logout", authController.logout);

router.get('/test', passport.authenticate('jwt', { session: false }), authController.test);

module.exports = router;
