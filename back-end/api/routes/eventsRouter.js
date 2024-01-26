const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const EventsController = require('../controllers/eventsController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/all", EventsController.getEvents);

router.get("/:id", EventsController.getEventsbyID);

// router.post("/new", VisitorCompanionController.addCompanion);

// router.put("/update/:id", VisitorCompanionController.updateCompanion);

// router.delete("/delete/:id", VisitorCompanionController.deleteCompanion);

module.exports = router;