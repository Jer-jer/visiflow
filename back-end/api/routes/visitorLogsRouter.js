const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const VisitorLogsController = require('../controllers/visitorLogsController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/all", VisitorLogsController.getLogs);

router.get("/:id", VisitorLogsController.searchLog);

router.post("/new", VisitorLogsController.addLog);

router.put("/update/:id", VisitorLogsController.updateLog);

router.delete("/delete/:id", VisitorLogsController.deleteLog);

module.exports = router;
