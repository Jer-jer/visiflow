require("dotenv").config();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Imports
const nodemailer = require("nodemailer");

// Models
const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");
const Visitor = require("../models/visitor");
const Notification = require("../models/notification");
const User = require("../models/user");
const SystemLog = require("../models/systemLogs");

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

const bucketName = "visiflow";

// Lazy-loaded storage
let storage;

// Initialize Google Cloud Storage
function getStorage() {
  if (!storage) {
    storage = new Storage({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
  }
  return storage;
}

//Image Upload Section

//Function to upload image to Google Cloud Storage
function uploadFileToGCS(bufferData, fileName) {
  const storage = getStorage();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  try {
    file.save(bufferData, {
      contentType: "image/jpeg",
    });

    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
  } catch (error) {
    return error;
  }
}

//Generates the image file name
function generateFileName(visitor, type) {
  return `${Date.now()}_${visitor.visitor_details.name.last_name.toUpperCase()}_${type}.jpg`;
}

//Generate image Buffer
function createImageBuffer(imageData) {
  return Buffer.from(
    imageData.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
}
//End of Image Upload Section

// Email functions

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
});

async function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve();
      }
    });
  });
}
// End of Email Functions

async function updateLog(_id, qr_id, user_id, res) {
  try {
    const badge = await Badge.findById({ _id: _id });
    if (badge) {
      if (badge.is_active) {
        try {
          // Add check out timestamp to visitor logs
          await VisitorLogs.updateOne(
            { badge_id: badge._id },
            { $set: { check_out_time: new Date() } }
          );

          await Badge.updateOne(
            { _id: badge._id },
            { $set: { qr_id: null, is_active: false, is_valid: false } }
          );
          await createSystemLog(user_id, "time_out", "success");
          return res.status(200).json("successfully timed-out");
        } catch (error) {
          await createSystemLog(user_id, "time_out", "failed");
          return res.status(500).json({ error: "Failed to time out the visitor." });
        }
      }
      // Time-in section

      // Check if QR has expired
      if (badge.expected_time_out < Date.now() || badge.is_valid === false) {
        await Badge.updateOne(
          { _id: badge._id },
          { $set: { is_valid: false } }
        );
        return res.status(400).json({ error: "The QR is invalid." });
      }

      // Check if the visitor timed-in too early
      const expectedTime = new Date(badge.expected_time_in);
      const currentTime = new Date();

      // Calculate the allowed time window for check-in (e.g., 15 minutes)
      const allowedWindow = expectedTime.getTime() - 1440 * 60 * 1000; // 24 hours or 1 day in milliseconds

      // Check if current time is within the allowed window
      if (currentTime.getTime() < allowedWindow) {
        // Time is too early (more than allowed window before expected time)
        return res.status(400).json({
          error: `It is still too early to time in! Expected time in: ${expectedTime.toLocaleString(
            "en-US",
            { timeZone: "Asia/Manila" }
          )}`,
        });
      }

      // const time_in_day = new Date(badge.expected_time_in);
      // time_in_day.setHours(0, 0, 0 ,0);

      // if (time_in_day > Date.now()) {
      //   const time_in_date = new Date(badge.expected_time_in);
      //   return res.status(400).json({ error: `Visitor is expected to time in on ${time_in_date}` });
      // }

      // If QR and time-in is valid
      await VisitorLogs.create({
        badge_id: badge._id,
        check_in_time: new Date(),
      });

      try {
        await Badge.updateOne(
          { _id: badge._id },
          { $set: { is_active: true } }
        );

        await createSystemLog(user_id, "time_in", "success");
        return res.status(200).json("successfully timed-in");
      } catch (error) {
        await createSystemLog(user_id, "time_in", "failed");
        return res.status(500).json({ error: "Failed to time in the visitor." });
      }
    }
    return res.status(500).json({ error: "No badge found." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update visitor badge" });
  }
}

async function updateVisitor(_id, companions, status) {
  const visitor = await Visitor.findById(_id);

  if (!visitor) {
    return res.status(404).json({ error: "Visitor not found" });
  }

  // Update status of main visitor
  visitor.status = status;
  await visitor.save();

  // Update status of companions
  if (Array.isArray(companions) && companions.length > 0) {
    companions.forEach(async (companion) => {
      const companionDB = await Visitor.findById(companion);
      if (!companionDB) {
        return res.status(404).json({ error: "Companion not found" });
      }

      companionDB.status = status;

      await companionDB.save();
    });
  }
}

function isThirtyMinutesBefore(time_in) {
  const currentDate = new Date();
  const appointment = new Date(time_in);

  const thirtyMinutesBefore = new Date(appointment.getTime() - 30 * 60 * 1000);

  return currentDate >= thirtyMinutesBefore && currentDate < appointment;
}

async function timeOutReminder(io) {
  try {
    const currentTime = new Date();
    const logs = await VisitorLogs.find({ check_out_time: null });

    const visitors = await Promise.all(
      logs.map(async (log) => {
        const badge = await Badge.findOne({
          _id: log.badge_id,
          is_active: true,
          is_valid: true,
        });

        if (badge) {
          const visitor = await Visitor.findOne({
            _id: badge.visitor_id,
            expected_time_out: { $lte: currentTime - 15 * 60000 },
          });

          return visitor;
        }
      })
    );

    const validVisitors = visitors.filter(
      (visitor) => visitor !== null && undefined
    );

    if (validVisitors.length > 0) {
      for (const visitor of validVisitors) {
        await createNotification(visitor, "time-out", io);
        await Badge.updateOne(
          { qr_id: visitor._id },
          { $set: { qr_id: null, is_active: false, is_valid: false } }
        );
      }
    }
  } catch (error) {
    console.error("Error in timeOutReminder:", error);
  }
}

async function timeInReminder(io) {
  try {
    const visitors = await Visitor.find({ status: "Approved" });

    await Promise.all(
      visitors.map(async (visitor) => {
        if (isThirtyMinutesBefore(visitor.expected_time_in)) {
          const mailOptions = {
            from: process.env.MAILER,
            to: visitor.visitor_details.email,
            subject: "Appointment Reminder",
            text: "Appointment reminder message.",
          };

          await sendEmail(mailOptions);

          await createNotification(visitor, "time-in", io);
        }
      })
    );
  } catch (error) {
    console.error("Error in check-in reminder", error);
  }
}

async function createNotification(visitor, type, io) {
  let visitorDB;
  if (Array.isArray(visitor)) {
    visitorDB = await Visitor.findOne({
      "companion_details._id": visitor[0]._id,
    });
  }

  const visitorName = visitor.visitor_details
    ? `${visitor.visitor_details.name.last_name}, ${visitor.visitor_details.name.first_name} ${visitor.visitor_details.name.middle_name}`
    : `${visitor[0].name.last_name}, ${visitor[0].name.first_name} ${visitor[0].name.middle_name}`;

  const hostName =
    visitor.purpose.who.join(", ") || visitorDB.purpose.who.join(", ") || "";
  const date = visitor.purpose?.when || visitorDB.when || "";
  const time_in = visitor.expected_time_in || visitorDB.expected_time_in || "";
  const time_out =
    visitor.expected_time_out || visitorDB?.expected_time_out || "";
  const location =
    visitor.purpose.where.join(", ") ||
    visitorDB?.purpose.where.join(", ") ||
    "";
  const purpose =
    visitor.purpose.what.join(", ") || visitorDB.purpose.what.join(", ");
  const visitorType = visitor.visitor_type;

  const notificationContent = {
    visitor_name: visitorName,
    host_name: hostName,
    date: date,
    time_in: time_in,
    time_out: time_out,
    location: location,
    purpose: purpose,
    visitor_type: visitorType,
  };

  const newNotif = await Notification.create({
    _id: new ObjectId(),
    type: type,
    recipient: visitor.visitor_details?._id || visitor[0]._id,
    content: notificationContent,
  });

  io.emit("newNotification", newNotif);

  console.log(`${type} notification pushed`);
}

async function createSystemLog(id, type, status) {
  try {
    const userDB = await User.findById(id);

    if (!userDB) {
      return false;
    }

    await SystemLog.create({
      user_id: userDB._id,
      name: {
        first_name: userDB.name.first_name,
        last_name: userDB.name.last_name,
      },
      role: userDB.role,
      type: type,
      status: status,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Visitor Duplicate Validation
async function validateDuplicate(visitors, res) {
  const validateDuplicate = visitors.map(async (visitor) => {
    try {
      // Check if visitor has an existing record

      const visitorDB = await Visitor.findOne({
        $or: [
          {
            $and: [
              { "visitor_details.email": { $exists: true, $ne: undefined } },
              { "visitor_details.email": visitor.visitor_details.email },
            ],
          },
          {
            $and: [
              { "visitor_details.phone": { $exists: true, $ne: undefined } },
              { "visitor_details.phone": visitor.visitor_details.phone },
            ],
          },
        ],
      });



      // Check if email is used by another visitor
      if (visitorDB) {
        const { first_name, middle_name, last_name } =
          visitorDB.visitor_details.name;
        const { email, phone } = visitor.visitor_details;

        const isDuplicate =
          visitor.visitor_details.name.first_name === first_name &&
          (visitor.visitor_details.name.middle_name || "") ===
            (middle_name || "") &&
          visitor.visitor_details.name.last_name === last_name;

        return isDuplicate
          ? `Visitor using ${email} and/or ${phone} already has an existing record`
          : `${email} and/or ${phone} has already been used by another visitor`;
      }
    } catch (error) {
      console.error("Error while validating duplicate:", error);
      return error;
    }
  });

  try {
    const validationResults = await Promise.all(validateDuplicate);
    return validationResults.filter((result) => result !== undefined);
  } catch (error) {
    return res.json({ error: "Error while validating duplicates:", error });
  }
}

module.exports = {
  updateLog,
  uploadFileToGCS,
  timeInReminder,
  timeOutReminder,
  sendEmail,
  createSystemLog,
  createNotification,
  generateFileName,
  createImageBuffer,
  validateDuplicate,
  updateVisitor,
};
