<<<<<<< HEAD
const Visitor = require('../models/visitor');

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateVisitor = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is required'),
];

//function to not return hashed password in json
function sanitizeData(visitor) {
    return {
        _id: visitor._id,
        first_name: visitor.first_name,
        last_name: visitor.last_name,
        email: visitor.email,
        phone: visitor.phone,
        status: visitor.status,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt
    };
}

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query

//Get list of all visitors
exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find({}, '-password');
        return res.json({ visitors });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error '});
    }
};

//Get visitor by ID
exports.getVisitorById = async (req, res) => {
    try {
        const {_id} = req.body;
        const searchedVisitor = await Visitor.findById(_id);
        
        if(searchedVisitor) {
            return res.status(201).json({ visitor: searchedVisitor });
        } else {
            return res.status(404).json({ error: 'user not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Create a new visitor
exports.createNewVisitor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            first_name,
            last_name,
            email,
            phone,
            status
        } = req.body;

        //check if the visitor already exists
        const existingVisitor = await Visitor.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({ error: 'Visitor already exists' });
        }

        const newVisitor = new Visitor({ 
            first_name, 
            last_name, 
            email, 
            phone: phone || "000-000-0000",
            status
        });

        const createdVisitor = await newVisitor.save();
        if (createdVisitor) {
            return res.status(201).json({ visitor: sanitizeData(createdVisitor) });
        } else {
            return res.status(400).json({ error: 'Failed to Create new Visitor' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

// Update a visitor by ID
exports.updateVisitor = async (req, res) => {
    try {
        const { _id, first_name, last_name, email, phone, status } = req.body;

        const visitor = await Visitor.findById(_id);        

        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }

        const updateFields = {
            first_name: first_name !== undefined ? first_name : visitor.first_name,
            last_name: last_name !== undefined ? last_name : visitor.last_name,
            email: email !== undefined ? email : visitor.email,
            phone: phone !== undefined ? phone : visitor.phone,
            status: status !== undefined ? status : visitor.status,
        };

        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        const updatedVisitor = await Visitor.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });

        return res.status(201).json({ visitor: sanitizeData(updatedVisitor) });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedVisitor = await Visitor.findByIdAndDelete(_id);
        if (deletedVisitor) {
            return res.status(201).json({ message: 'Visitor deleted sucessfully' });
        } else {
            return res.status(404).json({ error: 'Visitor not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
=======
const express = require("express");
const bodyParser = require("body-parser");
const Visitor = require("../models/visitor");

const router = express.Router();

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

//? Get All Visitors
exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find({}, { _id: 0 });
        return res.json({ visitors });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//? Filter Visitor
exports.searchVisitor = async (req, res) => {
    try {
        const visitors = await Visitor.findOne(
        { visitor_id: req.params.id },
        { _id: 0 }
        ).exec();
        return res.json({ visitors });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//? New Visitor
exports.addVisitor = async (req, res) => {
    try {
        const {
        visitorId,
        firstName,
        lastName,
        email,
        phone,
        plateNum,
        visitorType,
        status,
        street,
        city,
        province,
        houseNo,
        country,
        barangay,
        idType,
        } = req.body;

        const newVisitor = new Visitor({
        visitor_id: visitorId,
        name: { first_name: firstName, last_name: lastName },
        email: email,
        phone: phone,
        plate_num: plateNum,
        visitor_type: visitorType,
        status: status,
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
        const createdVisitor = await Visitor.create(newVisitor);

        if (createdVisitor instanceof Visitor) {
        return res
            .status(201)
            .json({ success: "Successfully created a visitor" });
        } else {
        return res.status(400).json({ error: "Failed to Create new visitor" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//? Update Visitor
exports.updateVisitor = async (req, res) => {
    try {
        const {
            visitorId,
            firstName,
            lastName,
            email,
            phone,
            plateNum,
            visitorType,
            status,
            street,
            city,
            province,
            houseNo,
            country,
            barangay,
            idType,
            } = req.body;
        const filter = { visitor_id: req.params.id };
        const update = { 
            visitor_id: visitorId,
            name: { first_name: firstName, last_name: lastName },
            email: email,
            phone: phone,
            plate_num: plateNum,
            visitor_type: visitorType,
            status: status,
            address: {
                house_no: houseNo,
                street : street,
                barangay: barangay,
                city: city,
                province: province,
                country: country
            },
            id_picture: { type: idType }, 
        };
        const visitorUpdated = await Visitor.findOneAndUpdate(filter, update);

        if (!visitorUpdated) {
        return res.status(404).json({ error: "Visitor not found" });
        } else {
        return res.json({ visitorUpdated });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//! Delete Visitor
exports.deleteVisitor = async (req, res) => {
    try {
        const deletedVisitor = await Visitor.findOneAndDelete({
        visitor_id: req.params.id,
        });

        if (deletedVisitor) {
        return res.status(201).json({ success: `Deleted Visitor` });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
>>>>>>> 7c7ddccd3364e885d082ee912c3a34599131daec
    }
};
