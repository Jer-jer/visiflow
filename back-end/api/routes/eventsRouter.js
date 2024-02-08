const express = require("express");
const router = express.Router();
const EventsController = require('../controllers/eventsController');

router.get("/all", EventsController.getEvents);

router.get("/:id", EventsController.getEventsbyID);

router.post("/new", EventsController.addEvents);

router.post('/update', EventsController.updateEvents);

router.post("/delete/", EventsController.deleteEvents);

module.exports = router;