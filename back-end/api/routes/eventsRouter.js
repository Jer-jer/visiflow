const express = require("express");
const router = express.Router();
const EventsController = require('../controllers/eventsController');

router.get("/all", EventsController.getEvents);

router.get("/:id", EventsController.getEventsbyID);

// router.post("/new", VisitorCompanionController.addCompanion);

// router.put("/update/:id", VisitorCompanionController.updateCompanion);

// router.delete("/delete/:id", VisitorCompanionController.deleteCompanion);

module.exports = router;