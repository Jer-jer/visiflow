const express = require("express");
const passport = require("passport");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  visitorController.getAllVisitors
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  visitorController.createNewVisitor
);

router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  visitorController.getVisitorById
);

router.post(
  "/retrieve-image",
  passport.authenticate("jwt", { session: false }),
  visitorController.getVisitorImageById
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  visitorController.updateVisitor
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  visitorController.deleteVisitor
);

module.exports = router;
