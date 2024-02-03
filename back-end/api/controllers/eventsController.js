const express = require("express");
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
exports.addCompanion = async (req, res) => {
    try {
        const {
            name,
            date,
            time,
            locationId,
            userId,
        } = req.body;

        const newVisitorCompanion = new VisitorCompanion({
            companion_id: companionId,
            visitor_id: visitorId,
            name: { first_name: firstName, last_name: lastName },
            email: email,
            phone: phone,
            address: {
                house_no: houseNo,
                street : street,
                barangay: barangay,
                city: city,
                province: province,
                country: country
            },
            id_picture: { type: idType },
        });
        const createdVisitorCompanion = await VisitorCompanion.create(newVisitorCompanion);

        if (createdVisitorCompanion instanceof VisitorCompanion) {
        return res
            .status(201)
            .json({ success: "Successfully created a visitor companion" });
        } else {
        return res.status(400).json({ error: "Failed to Create new visitor" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};