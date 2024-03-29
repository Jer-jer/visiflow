const express = require("express");
const router = express.Router();
const passport = require('passport');
const EventsController = require('../controllers/eventsController');

// router.use(
//     passport.authenticate('jwt', {session: false} )
// );

router.get("/", EventsController.getEvents);

router.post("/new", EventsController.addEvent);

router.post("/find", EventsController.findEvent);

router.post("/search", EventsController.getEventsByName);

router.put('/update', EventsController.updateEvent);

router.delete("/delete", EventsController.deleteEvent);

module.exports = router;