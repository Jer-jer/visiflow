const express = require("express");
const passport = require("passport");
const router = express.Router();
const { verifyAccessToken } = require("../utils/authUtils");
const badgeController = require("../controllers/badgeController");

router.use("/checkBadge", (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ Error: "Unauthorized user" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ Error: "Unauthorized user" });
  }
});

router.get("/checkBadge", badgeController.checkBadge);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", badgeController.getBadges);
router.post("/findBadge", badgeController.findBadge);
router.post("/findAllBadges", badgeController.findAllBadges);
router.post("/generateBadge", badgeController.generateBadge);
router.post("/newBadge", badgeController.newBadge);

module.exports = router;
