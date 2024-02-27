const express = require("express");
const router = express.Router();
const passport = require('passport');
const VisitorLogsController = require('../controllers/visitorLogsController');

router.use(
    passport.authenticate('jwt', { session: false })
);

router.get("/", VisitorLogsController.getLogs);

router.post("/new", VisitorLogsController.addLog);

router.get("/find", VisitorLogsController.findLog);

router.put("/update", VisitorLogsController.updateLog);

router.delete("/delete", VisitorLogsController.deleteLog);

module.exports = router;
