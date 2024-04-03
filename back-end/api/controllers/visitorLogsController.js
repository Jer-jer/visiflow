const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const VisitorLogs = require("../models/visitorLogs");

exports.getLogs = async (req, res) => {
  try {
    const visitorLogs = await VisitorLogs.find();
    return res.status(200).json({ visitorLogs });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitor logs from the database" });
  }
};

exports.addLog = async (req, res) => {
  const { badge_id, checkIn, checkOut } = req.body;

  try {
    const newLog = await VisitorLogs.create({
      badge_id: badge_id,
      check_in_time: checkIn,
      check_out_time: checkOut,
    });

    res.status(201).json({ VisitorLog: newLog });
  } catch (err) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add visitor log" });
  }
};

exports.findVisitorLogs = async (req, res) => {
  const { badge_id } = req.body;

  try {
    const logs = await VisitorLogs.findOne({
      badge_id: new ObjectId(badge_id),
    });

    if (!logs) return res.status(500).json({ error: "Visitor has no logs" });

    return res.status(200).json({ visitorLogs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong fetching logs" });
  }
};

exports.findLog = async (req, res) => {
  const { _id } = req.body;

  try {
    const logDB = await VisitorLogs.findOne(_id);

    if (logDB) {
      return res.status(200).json({ Log: logDB });
    } else {
      return res.status(404).json({ error: "Visitor log not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find visitor log by ID" });
  }
};

exports.updateLog = async (req, res) => {
  const { _id, badge_id, checkIn, checkOut } = req.body;

  try {
    const logDB = await VisitorLogs.findById(_id);
    if (!logDB) {
      return res.status(404).json({ error: "Visitor log not found" });
    }

    const updateFields = {
      badge_id: badge_id,
      check_in_time: checkIn,
      check_out_time: checkOut,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedLog = await VisitorLogs.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    res.status(201).json({ Log: updatedLog });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteLog = async (req, res) => {
  const { _id } = req.body;

  try {
    const logDB = await VisitorLogs.findOneAndDelete(_id);

    if (logDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: err });
  }
};
