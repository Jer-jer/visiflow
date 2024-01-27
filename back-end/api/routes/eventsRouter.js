const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const EventsController = require('../controllers/eventsController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/all", EventsController.getEvents);

router.get("/:id", EventsController.getEventsbyID);

router.post("/new", EventsController.addEvents);

router.post('/update', EventsController.updateEvents);

router.post("/delete/", EventsController.deleteEvents);

module.exports = router;