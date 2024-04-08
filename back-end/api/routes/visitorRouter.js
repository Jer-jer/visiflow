const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorController = require("../controllers/visitorController");

// Custom middleware to conditionally apply authentication
const optionalAuth = (req, res, next) => {
  // Check if authentication is required
  if (req.query.auth === 'true') { // Example: Pass ?auth=true in the query for authentication
    // Apply authentication middleware
    passport.authenticate("jwt", { session: false })(req, res, next);
  } else {
    // Authentication not required, proceed to the next middleware
    next();
  }
};

router.get("/", passport.authenticate("jwt", { session: false }), VisitorController.getVisitors);

router.post("/new", optionalAuth, VisitorController.addVisitor);

router.post("/new-recurring", VisitorController.newRecurringVisitor);

router.post("/find-last-name", VisitorController.findVisitorByLastName);

router.post("/find", passport.authenticate("jwt", { session: false }), VisitorController.findVisitor);

router.put("/update", passport.authenticate("jwt", { session: false }),  VisitorController.updateVisitor);

router.put("/update-status", passport.authenticate("jwt", {session: false }), VisitorController.updateStatus);

router.delete("/delete", passport.authenticate("jwt", { session: false }), VisitorController.deleteVisitor);

module.exports = router;
