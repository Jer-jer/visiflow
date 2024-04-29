const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorController = require("../controllers/visitorController");

// Custom middleware to conditionally apply authentication
const optionalAuth = (req, res, next) => {
  // Check if authentication is required
  if (req.query.auth === "true") {
    passport.authenticate("jwt", { session: false })(req, res, next);
  } else {
    next();
  }
};

router.get("/", passport.authenticate("jwt", { session: false }), VisitorController.getVisitors);
router.get("/get-current-visitors", passport.authenticate("jwt", { session: false }), VisitorController.getCurrentVisitors);
router.post("/get-companions", passport.authenticate("jwt", { session: false }), VisitorController.getCompanions);
router.post("/find", passport.authenticate("jwt", { session: false }), VisitorController.findVisitor);
router.put("/update", passport.authenticate("jwt", { session: false }), VisitorController.updateVisitor);
router.put("/update-status", passport.authenticate("jwt", { session: false }), VisitorController.updateStatus);
router.post("/new-recurring-walk-in", passport.authenticate("jwt", { session: false }), VisitorController.newRecurringWalkInVisitor);
router.delete("/delete", passport.authenticate("jwt", { session: false }), VisitorController.deleteVisitor);

// Doesn't require authentication
router.post("/new-recurring", VisitorController.newRecurringPRVisitor);
router.post("/find-recurring", VisitorController.findRecurring);

// Routes with optional authentication
router.post("/new", optionalAuth, VisitorController.addVisitor);

module.exports = router;
