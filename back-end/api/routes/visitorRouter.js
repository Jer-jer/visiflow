const express = require("express");
const passport = require("passport");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

// router.use((req, res, next) => {
//     if (req.user && req.user.role.includes("admin")) next();
//     else res.sendStatus(401);
//  });

 router.use(passport.authenticate("jwt", { session: false }));

router.get("/", visitorController.getAllVisitors);

router.post("/new", visitorController.createNewVisitor);

router.get("/search", visitorController.getVisitorById);

router.post("/retrieve-image", visitorController.getVisitorImageById);

router.put("/update", visitorController.updateVisitor);

router.delete("/delete", visitorController.deleteVisitor);

module.exports = router;
