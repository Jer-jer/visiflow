const express = require("express");//for import of express package
const bodyParser = require("body-parser");
const EventsModel = require('../models/events');
//const { checkout } = require("../routes/visitorCompRouter");

const router = express.Router();

//
router.use(bodyParser.json());

//For Get All Events
exports.getEvents = async (req, res) => {
    try {
        const events = await EventsModel.find({}, { _id: 0 });
        return res.json({ events });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//Get event by ID
exports.getEventsbyID = async (req, res) => {
    try {
        const {_id} = req.body;
        const searchedEvents = await EventsModel.findById(_id);
        
        if(searchedEvents) {
            return res.status(201).json({ events: searchedEvents });
        } else {
            return res.status(404).json({ error: 'user not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Create
exports.addEvents = async (req, res) => {
    try {

        const {
            name,
            date,
            time,
            locationId,
            userId,
        } = req.body;

            //checks if event already exists        
            // const existingevent = await EventsModel.find({ name,date,time,locationId,userId});
            // if (existingevent) {
            //     return res.status(400).json({ error: 'This event already exists' });
            // }

        const newEvent = new EventsModel({
            name: name,
            date: date,
            time: time,
            locationId: locationId,
            userId: userId
        })

        const createdEvents = await EventsModel.create(newEvent);
    
        // const newVisitorCompanion = new VisitorCompanion({
        //     companion_id: companionId,
        //     visitor_id: visitorId,
        //     name: { first_name: firstName, last_name: lastName },
        //     email: email,
        //     phone: phone,
        //     address: {
        //         house_no: houseNo,
        //         street : street,
        //         barangay: barangay,
        //         city: city,
        //         province: province,
        //         country: country
        //     },
        //     id_picture: { type: idType },
        // });
        // const createdVisitorCompanion = await VisitorCompanion.create(newEvent);

        if (createdEvents instanceof EventsModel) {
        return res
            .status(201)
            .json({ success: "Successfully created a event" });
        } else {
        return res.status(400).json({ error: "Failed to Create new event" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//Delete Events
exports.deleteEvents = async (req, res) => {
    try {
      const {_id} = req.body;

      const deletedData = await EventsModel.findByIdAndDelete(_id);

      if (deletedData) {
          return res.status(201).json({ message: 'Data deleted successfully'});
      } else {
          return res.status(404).json({ error: "Event not found"});
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateEvents = async (req, res) => {
    try {
        

        const { _id, name, date, time, locationId, userId} = req.body;

        const event = await EventsModel.findById(_id);

        if(!event) {
            return res.status(404).json({ error: 'Event not found'});
        }
        
        //prepare to update the data
        const updateFields = {
            name: name !== undefined ? name : event.name,
            date: date !== undefined ? date : event.date,
            time: time !== undefined ? time : event.time,
            locationId: locationId !== undefined ? locationId : event.locationId,
            userId: userId !== undefined ? userId : event.userId
        }
        
        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedEvent = await EventsModel.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });
        
        return res.status(201).json({ event: updatedEvent});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};