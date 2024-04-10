const express = require("express");
const passport = require("passport");
const router = express.Router();
const badgeController = require("../controllers/badgeController");

router.get("/", badgeController.getBadges);

router.post("/findBadge", badgeController.findBadge);

router.post(
  "/generateBadge",
  passport.authenticate("jwt", { session: false }),
  badgeController.generateBadge
);

router.get("/checkBadge", badgeController.checkBadge);

router.post(
  "/newBadge",
  passport.authenticate("jwt", { session: false }),
  badgeController.newBadge
);

module.exports = router;
