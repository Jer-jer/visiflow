const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorController = require("../controllers/visitorController");

router.get("/", passport.authenticate("jwt", { session: false }), VisitorController.getVisitors);

router.post("/new", VisitorController.addVisitor);

router.post("/find", passport.authenticate("jwt", { session: false }), VisitorController.findVisitor);

router.post("/retrieve-image",passport.authenticate("jwt", { session: false }),  VisitorController.getVisitorImageById);

router.put("/update", passport.authenticate("jwt", { session: false }),  VisitorController.updateVisitor);

router.delete("/delete", passport.authenticate("jwt", { session: false }), VisitorController.deleteVisitor);

module.exports = router;
