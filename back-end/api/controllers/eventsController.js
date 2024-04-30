const Event = require("../models/events");
const { createSystemLog } = require("../utils/helper");
const {
  validateEvents,
  validationResult,
} = require("../middleware/dataValidation");
const { uploadFileToGCS } = require("../utils/helper");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json({ event: events });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve events from the database" });
  }
};

exports.addEvent = async (req, res) => {
  const {
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    locationID,
    description,
    eventImg,
    userID
  } = req.body;

  await Promise.all(validateEvents.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const existingEvents = await Event.findOne({ name, locationID});
  if (existingEvents) {
    return res.status(400).json({ error: "Event already exists" });
  }

  if(startDate > endDate) {
    return res.status(400).json({ error: 'Start Date should be greater than End Date' });
  }

  try {
    const [eventpic] = await Promise.all([
      uploadFileToGCS(
        Buffer.from(eventImg.replace(/^data:image\/\w+;base64,/, ""), "base64"),
        `${Date.now()}_${name.toUpperCase()}_event.jpg`
      ),
    ]);

    await createSystemLog(userID, "add_event", "success");

    const newEvent = await Event.create({
      name,
      startDate,
      endDate,
      startTime,
      endTime,
      locationID,
      description,
      eventImg: eventpic,
    });

    res.status(201).json({ event: newEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create new event" });
  }
};

exports.findEvent = async (req, res) => {
  const { _id } = req.body;

  try {
    const eventDB = await Event.findById(_id);

    if (eventDB) {
      return res.status(200).json({ event: eventDB });
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateEvent = async (req, res) => {
  const {
    _id,
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    locationID,
    description,
    eventImg,
    userID
  } = req.body;

  try {
    const eventDB = await Event.findById(_id);
    if (!eventDB) {
      return res.status(404).json({ error: "Event not found" });
    }

    if(startDate > endDate) {
      return res.status(400).json({ error: 'Start Date should be greater than End Date' });
    }

    let img = eventImg;
    if (img == null) {
      const [eventpic] = await Promise.all([
        uploadFileToGCS(
          Buffer.from(
            eventImg.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
          `${Date.now()}_${name.toUpperCase()}_event.jpg`
        ),
      ]);
      img = eventpic;
    }

    const updateFields = {
      name: name || eventDB.name,
      startDate: startDate || eventDB.startDate,
      endDate: endDate || eventDB.endDate,
      startTime: startTime || eventDB.startTime,
      endTime: endTime || eventDB.endTime,
      locationID: locationID || eventDB.locationID,
      description: description || eventDB.description,
      eventImg: img,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    await createSystemLog(userID, "update_event", "success");

    return res.status(201).json({ event: updatedEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update event" });
  }
};

//for search bar
exports.getEventsByName = async (req, res) => {
  try {
    const { name } = req.body;
    const regex = new RegExp(name, "i");
    const searchEvents = await Event.find({ name: regex });
    if (searchEvents) {
      return res.status(201).json({ event: searchEvents });
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};
//Delete Events
exports.deleteEvent = async (req, res) => {
  const { _id, userID } = req.body;

  try {
    const eventDB = await Event.findByIdAndDelete(_id);

    await createSystemLog(userID, "delete_event", "success");

    if (eventDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
