const express = require("express");
const bodyParser = require("body-parser");
const VisitorCompanion = require('../models/visitorCompanion')

const router = express.Router();

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

//? Get All Visitor Companions
exports.getCompanions = async (req, res) => {
    try {
        const visitorCompanions= await VisitorCompanion.find({}, { _id: 0 });
        return res.json({ visitorCompanions });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//? Filter Visitor Companion
exports.searchCompanion = async (req, res) => {
    try {
        const visitorCompanions = await VisitorCompanion.findOne(
        { companion_id: req.params.id },
        { _id: 0 }
        ).exec();
        return res.json({ visitorCompanions });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//? New Visitor Companion
exports.addCompanion = async (req, res) => {
    try {
        const {
            companionId,
            visitorId,
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            province,
            houseNo,
            country,
            barangay,
            idType,
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

//? Update Visitor Companion
exports.updateCompanion = async (req, res) => {
    try {
        const { 
            companionId,
            visitorId,
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            province,
            houseNo,
            country,
            barangay,
            idType 
        } = req.body;
        const filter = { companion_id: req.params.id };
        const update = { 
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
            id_picture: { type: idType }
        };
        const visitorCompanionUpdated = await VisitorCompanion.findOneAndUpdate(filter, update);

        if (!visitorCompanionUpdated) {
        return res.status(404).json({ error: "Visitor not found" });
        } else {
        return res
        .status(201)
        .json({ success: "Visitor has been updated" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//! Delete Visitor Companion
exports.deleteCompanion = async (req, res) => {
    try {
        const deletedCompanion = await VisitorCompanion.findOneAndDelete({
        companion_id: req.params.id,
        });

        if (deletedCompanion) {
        return res.status(201).json({ success: `Deleted Companion` });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};
