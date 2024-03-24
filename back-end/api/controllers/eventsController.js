const Event = require('../models/events');
const { 
    validateEvents, 
    validationResult 
} = require('../middleware/dataValidation');


exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({ event: events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve events from the database" });
    }
};

exports.addEvent = async (req, res) => {
    const { name, startDate, endDate,startTime, endTime, locationID, description } = req.body;

    await Promise.all(validateEvents.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const newEvent = await Event.create({
            name,
            startDate,
            endDate,
            startTime,
            endTime,
            locationID,
            description
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
            return res.status(404).json({ error: 'Event not found'});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateEvent = async (req, res) => {
    const { _id, name, startDate, endDate, startTime, endTime, locationID, description} = req.body;

    try {
        const eventDB = await Event.findById(_id);
        if (!eventDB) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const updateFields = {
            name: name || event.name,
            startDate: startDate || event.startDate,
            endDate: endDate || event.endDate,
            startTime: startTime || event.startTime,
            endTime: endTime || event.endTime,
            locationID: locationID || event.locationID,
            description: description || event.description

        }
        
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

        return res.status(201).json({ event: updatedEvent});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update event' });
    }
};

//Delete Events
exports.deleteEvent = async (req, res) => {
    const {_id} = req.body;

    try {
        const eventDB = await Event.findByIdAndDelete(_id);

        if (eventDB) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: "Event not found"});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

