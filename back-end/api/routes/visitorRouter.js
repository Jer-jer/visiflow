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

//Routes with authentication
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", VisitorController.getVisitors);
router.post("/get-companions", VisitorController.getCompanions);
router.post("/find", VisitorController.findVisitor);
router.put("/update", VisitorController.updateVisitor);
router.put("/update-status", VisitorController.updateStatus);
router.post("/new-recurring", VisitorController.newRecurringVisitor);
router.post("/find-email", VisitorController.findVisitorByEmail);
router.delete("/delete", VisitorController.deleteVisitor);

// Routes with optional authentication
router.post("/new", optionalAuth, VisitorController.addVisitor);

module.exports = router;
