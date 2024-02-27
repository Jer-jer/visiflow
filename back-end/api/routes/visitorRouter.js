const express = require("express");
const router = express.Router();
const passport = require('passport');
const VisitorController = require("../controllers/visitorController");

router.use(
    passport.authenticate('jwt', { session: false })
);

router.get("/", VisitorController.getVisitors);

router.post("/new", VisitorController.addVisitor);

router.post("/find", VisitorController.findVisitor);

router.post("/retrieve-image", VisitorController.getVisitorImageById);

router.put("/update", VisitorController.updateVisitor);

router.delete("/delete", VisitorController.deleteVisitor);

module.exports = router;
