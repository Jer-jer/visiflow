const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorController = require("../controllers/visitorController");

router.get("/", passport.authenticate("jwt", { session: false }), VisitorController.getVisitors);

router.post("/new", VisitorController.addVisitor);

router.post("/find", passport.authenticate("jwt", { session: false }), VisitorController.findVisitor);

router.put("/update", passport.authenticate("jwt", { session: false }),  VisitorController.updateVisitor);

router.put("/update-status", passport.authenticate("jwt", {session: false }), VisitorController.updateStatus);

router.delete("/delete", passport.authenticate("jwt", { session: false }), VisitorController.deleteVisitor);

module.exports = router;
