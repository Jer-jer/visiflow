const Notification = require("../models/notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});

    return res.status(200).json({ notifications: notifications });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve notifications from the database" });
  }
};

exports.updateNotification = async (req, res) => {
  const { _id, is_read } = req.body;

  try {
    const notificationDB = await Notification.findById(_id);
    if (!notificationDB) {
      return res.status(404).json({ error: "Notification not found" });
    }

    const updateFields = {
      is_read: is_read || notificationDB.is_read,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    res.status(201).json({ Notification: updatedNotification });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update notification" });
  }
};
