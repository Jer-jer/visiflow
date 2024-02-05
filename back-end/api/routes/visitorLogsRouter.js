const express = require("express");
const router = express.Router();
const VisitorLogsController = require('../controllers/visitorLogsController');

router.get("/all", VisitorLogsController.getLogs);

router.get("/:id", VisitorLogsController.searchLog);

router.post("/new", VisitorLogsController.addLog);

router.put("/update/:id", VisitorLogsController.updateLog);

router.delete("/delete/:id", VisitorLogsController.deleteLog);

module.exports = router;
