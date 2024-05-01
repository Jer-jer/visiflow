const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorLogsController = require("../controllers/visitorLogsController");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", VisitorLogsController.getLogs);

router.post("/find-visitor-logs", VisitorLogsController.findVisitorLogs);

router.post("/find-all-visitor-logs", VisitorLogsController.findAllVisitorLogs);

router.post("/find", VisitorLogsController.findLog);

module.exports = router;
