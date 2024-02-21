const express = require("express");
const bodyParser = require("body-parser");
const VisitorLogs = require("../models/visitorLogs");
// const { checkout } = require("../routes/visitorCompRouter");

const router = express.Router();

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

//? Get All Visitor Companions
exports.getLogs = async (req, res) => {
  try {
    const visitorLogs = await VisitorLogs.find({}, { _id: 0 });
    return res.json({ visitorLogs });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//? Filter Visitor Companion
exports.searchLog = async (req, res) => {
  try {
    const visitorLog = await VisitorLogs.findOne(
      { log_id: req.params.id },
      { _id: 0 }
    ).exec();
    return res.json({ visitorLog });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//? New Visitor Companion
exports.addLog = async (req, res) => {
  try {
    const { logId, locationId, checkIn, checkOut } = req.body;

    const newVisitorCompanion = new VisitorLogs({
      log_id: logId,
      location_id: locationId,
      check_in_time: checkIn,
      check_out_time: checkOut,
    });
    const createdVisitorLog = await VisitorLogs.create(newVisitorCompanion);

    if (createdVisitorLog instanceof VisitorLogs) {
      return res.status(201).json({ success: "Successfully created a log" });
    } else {
      return res.status(400).json({ error: "Failed to a log" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//? Update Visitor Companion
exports.updateLog = async (req, res) => {
  try {
    const { logId, locationId, checkIn, checkOut } = req.body;
    const filter = { log_id: req.params.id };
    const update = {
      log_id: logId,
      location_id: locationId,
      check_in_time: checkIn,
      check_out_time: checkOut,
    };
    const visitorLogUpdated = await VisitorLogs.findOneAndUpdate(
      filter,
      update
    );

    if (!visitorLogUpdated) {
      return res.status(404).json({ error: "Log not found" });
    } else {
      return res.status(201).json({ success: "Log has been updated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//! Delete Visitor Companion
exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await VisitorLogs.findOneAndDelete({
      log_id: req.params.id,
    });

    if (deletedLog) {
      return res.status(201).json({ success: `Deleted log` });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
