const express = require("express"); //for import of express package
const bodyParser = require("body-parser");
const Announcements = require("../models/announcements");
const { createSystemLog } = require("../utils/helper");
const {
  validateAnnouncements,
  handleValidationErrors,
  validationResult,
} = require("../middleware/dataValidation");

// function sanitizeData(announcements) {
//     return {
//         _id: announcements._id,
//         title: announcements.title,
//         message: announcements.message
//     };
// }

//Get list of announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announce = await Announcements.find();
    return res.json({ announce });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Create new announcements
exports.createNewAnnouncements = async (req, res) => {
    const { title, message, prio, } = req.body;
    // const user_id = req.user._id;
    // const log_type = "add_announce";
    res.status(201).json(req.user);
    await Promise.all(validateAnnouncements.map(validation => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const existingAnnouncement = await Announcements.findOne({ title, message });
  if (existingAnnouncement) {
    return res.status(400).json({ error: "Announcement already exists" });
  }

  try {
    const newAnnounce = await Announcements.create({
      title,
      message,
      prio,
    });

        // createSystemLog(req.user._id, "add_announce", "success");
        res.status(201).json({ Announcements: newAnnounce });
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create new Announcement" });
    }

};
//Find Announcements by Title
exports.getAnnouncementsByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const regex = new RegExp(title, "i");
    const searchAnnouncements = await Announcements.find({ title: regex });
    if (searchAnnouncements) {
      return res.status(201).json({ announce: searchAnnouncements });
    } else {
      return res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.updateAnnouncements = async (req, res) => {
  try {
    const { _id, title, message, prio } = req.body;

    // const existingAnnouncement = await Announcements.findOne({ title, message });
    // if (existingAnnouncement) {
    //     return res.status(400).json({ error: 'Announcement already exists' });
    // }

    const announce = await Announcements.findById(_id);

    if (!announce) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    const updateFields = {
      title: title !== undefined ? title : announce.title,
      message: message !== undefined ? message : announce.message,
      prio: prio !== undefined ? prio : announce.prio,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedAnnouncements = await Announcements.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    return res.status(201).json({ announce: updatedAnnouncements });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAnnouncements = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedData = await Announcements.findByIdAndDelete(_id);

    if (deletedData) {
      return res.status(201).json({ message: "Data deleted successfully" });
    } else {
      return res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
