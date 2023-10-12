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
    }
};
