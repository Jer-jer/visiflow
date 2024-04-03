const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const SystemLog = require("../models/systemLogs");

exports.addLog = async (req, res) => {
  const { user_id, first_name, last_name, role, type, status } = req.body;

  try {
    const log = await SystemLog.create({
      user_id: user_id,
      name: {
        first_name: first_name,
        last_name: last_name,
      },
      role: role,
      type: type,
      status: status,
    });

    return res.status(201).json({ SystemLog: log });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.findUserLogs = async (req, res) => {
  const { user_id } = req.body;

  try {
    const logs = await SystemLog.find({ user_id: new ObjectId(user_id) });

    if (!logs) {
      return res.status(404).json({ error: "User has no logs" });
    }

    return res.status(200).json({ systemLogs: logs });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong fetching user logs" });
  }
};
