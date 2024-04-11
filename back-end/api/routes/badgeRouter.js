const express = require("express");
const passport = require("passport");
const router = express.Router();
const badgeController = require("../controllers/badgeController");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", badgeController.getBadges);

router.post("/findBadge", badgeController.findBadge);

router.post("/generateBadge", badgeController.generateBadge);

router.get("/checkBadge", badgeController.checkBadge);

router.post("/newBadge", badgeController.newBadge);

module.exports = router;
