const express = require("express");//for import of express package
const bodyParser = require("body-parser");
const Announcements = require('../models/announcements');
const { validateAnnouncements, handleValidationErrors, validationResult } = require('../middleware/dataValidation');

function sanitizeData(announcements) {
    return {
        _id: announcements._id,
        title: announcements.title,
        message: announcements.message
    };
}

//Get list of announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announce = await Announcements.find();
        return res.json({ announce });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error "});
    }
};

//Create new announcements
exports.createNewAnnouncements = async (req, res) => {
    // Run validation middleware
    await Promise.all(validateAnnouncements.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    
    
    try {
        const { 
            title, 
            message
        } = req.body;
        
        // //check if the bldgLoc already exists
        // const existingbldgLoc = await BuildingLoc.findOne({ name, roomNo });
        // if (existingbldgLoc) {
        //     return res.status(400).json({ error: 'Bldg Loc already exists' });
        // }

        const newAnnounce = new Announcements({ 
            title, 
            message
        });


        const createdAnnouncements = await newAnnounce.save();

        if (createdAnnouncements) {
            return res.status(201).json({ announcement: sanitizeData(createdAnnouncements) });
        } else {
            return res.status(400).json({ error: 'Failed to Create new User' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

// exports.getBldgLocByID = async (req, res) => {
//     try {
//         const {_id} = req.body;
//         const searchedBldgLoc = await BuildingLoc.findById(_id);

//         if(searchedBldgLoc) {
//             return res.status(201).json({ bldgLoc: searchedBldgLoc });
//         } else {
//             return res.status(404).json({ error: 'Building Location not found'});
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal Server Error '});
//     }
// };

exports.updateAnnouncements = async (req, res) => {
    try {
        const { _id, title, message} = req.body;

        const announce = await Announcements.findById(_id);

        if(!announce) {
            return res.status(404).json({ error: 'Announcement not found'});
        }

        const updateFields = {
            title: title !== undefined ? title : announce.title,
            message: message !== undefined ? message : announce.message
        }
        
        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedAnnouncements = await Announcements.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });

        return res.status(201).json({ announce: sanitizeData(updatedAnnouncements)});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.deleteBldgLoc = async (req, res) => {
//       try {
//         const {_id} = req.body;

//         const deletedData = await BuildingLoc.findByIdAndDelete(_id);

//         if (deletedData) {
//             return res.status(201).json({ message: 'Data deleted successfully'});
//         } else {
//             return res.status(404).json({ error: "Building locations not found"});
//         }
//       } catch (error) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
// }