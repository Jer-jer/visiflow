const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Models
const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");

async function timeIn(_id) {
  try {
    const badge = await Badge.findById(_id);
    const currentDate = new Date();

    if (badge) {
      // Check if badge is already timed-in
      if (badge.status === "active") {
        return {
          result: false,
          type: "time_in",
          error: "Visitor is already timed-in.",
        };
      }

      // Check if QR has expired
      if (badge.expected_time_out < currentDate || badge.is_valid === false) {
        await Badge.updateOne(
          { _id: badge._id },
          { $set: { qr_id: null, status: "inactive", is_valid: false } }
        );

        return {
          result: false,
          type: "time_in",
          error: "Invalid QR Code.",
        };
      }

      // Check if the visitor timed-in too early
      const expectedTime = new Date(badge.expected_time_in);
      const currentTime = new Date();
      const allowedWindow = expectedTime.getTime() - 1440 * 60 * 1000;

      if (currentTime.getTime() < allowedWindow) {
        return {
          result: false,
          type: "time_in",
          error: `Too early to time in. Expected time in is ${badge.expected_time_in.toLocaleString()}.`,
        };
      }

      // If QR and time-in is valid
      await VisitorLogs.create({
        badge_id: badge._id,
        check_in_time: new Date(),
      });

      await Badge.updateOne({ _id: badge._id }, { $set: { status: "active" } });

      return {
        result: true,
        type: "time_in",
        error: null,
      };
    }

    return {
      result: false,
      type: "time_in",
      error: "Failed to find badge.",
    };
  } catch (error) {
    console.error(error);
    return {
      result: false,
      type: "time_in",
      error: "Failed to time in visitor.",
    };
  }
}

async function timeOut(_id) {
  try {
    const badge = await Badge.findById(_id);

    if (badge) {
      if (badge.status != "inactive") {
        // Add check out timestamp to visitor logs
        await VisitorLogs.updateOne(
          { badge_id: badge._id },
          { $set: { check_out_time: new Date() } }
        );

        await Badge.updateOne(
          { _id: badge._id },
          { $set: { qr_id: null, status: "inactive", is_valid: false } }
        );

        return {
          result: true,
          type: "time_out",
          error: null,
        };
      }
    }
    return {
      result: false,
      type: "time_out",
      error: "Failed to find badge.",
    };
  } catch (error) {
    console.error(error);
    return {
      result: false,
      error: "Failed to time in visitor.",
    };
  }
}

module.exports = {
  timeIn,
  timeOut,
};
