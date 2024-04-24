require("dotenv").config();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Imports
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;

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

// const local_ip = "192.168.1.4";
const local_ip = "localhost";

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

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
});

// Generate QR code function, found in badge controller
// use in walk-in visitor
async function generateVisitorQRCode(badgeId) {
  return new Promise(async (resolve, reject) => {
    const filename = `api/resource/badge/badge${badgeId}.png`;
    const uri = `http://${local_ip}:5000/badge/checkBadge?qr_id=${badgeId}`;

    QRCode.toFile(
      filename,
      uri,
      { errorCorrectionLevel: "H" },
      async function (error) {
        if (error) {
          console.error(
            `Error generating QR code for badge ${badgeId}: ${error.message}`
          );
          reject(error);
        } else {
          console.log(`QR code saved for badge ${badgeId}`);
          try {
            const imageData = await fs.readFile(filename);
            resolve(filename);
          } catch (readError) {
            console.error(
              `Error reading QR code image for badge ${badgeId}: ${readError.message}`
            );
            reject(readError);
          }
        }
      }
    );
  });
}

// used in pre-registered visitor
async function generateVisitorQRAndEmail(visitorId, message) {
  try {
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      throw new Error("Visitor not found");
    }

    const badges = [];

    // Generate QR Code for visitor
    const visitorBadge = await generateQRAndEmail(visitor, message);
    badges.push(visitorBadge);

    // Generate QR Codes for companions
    if (visitor.companions.length > 0) {
      const companionBadges = await Promise.all(
        visitor.companion_details.map((companion) =>
          generateQRAndEmail(companion, message)
        )
      );
      badges.push(...companionBadges);
    }

    return {
      success: true,
      message: "QR code and email sent successfully",
      badges,
    };
  } catch (error) {
    console.error("Error generating QR code and sending email:", error);
    return {
      success: false,
      message: "Failed to generate QR code and send emails",
    };
  }
}

async function generateQRAndEmail(visitor, message) {
  try {
    const badge = await generateBadge(visitor);
    await sendBadgeEmail(badge, visitor, message);
    console.log(`QR code and email sent for badge ${badge._id}`);
    return { visitorId: visitor._id, badgeId: badge._id };
  } catch (error) {
    console.error("Error generating QR code and sending email:", error);
    throw error;
  }
}

// Test badge generation
async function generateBadge(visitor) {
  const badge = new Badge({
    visitor_id: visitor._id,
    qr_id: visitor._id,
    expected_time_in: visitor.expected_time_in,
    expected_time_out: visitor.expected_time_out,
    is_active: false,
    is_valid: true,
  });

  await badge.save();

  const uri = `http://${local_ip}:5000/badge/checkBadge?qr_id=${visitor._id}`;
  const filename = `api/resource/badge/badge${badge._id}.png`;
  await generateQRCode(uri, filename, badge._id);

  return badge;
}

// Old badge generation
// async function generateBadge(visitor) {
//   const badge = new Badge({
//     visitor_id: visitor._id,
//     qr_id: null,
//     expected_time_in: visitor.expected_time_in,
//     expected_time_out: visitor.expected_time_out,
//     is_active: false,
//     is_valid: true,
//   });

//   await badge.save();

//   const uri = `http://${local_ip}:5000/badge/checkBadge?visitor_id=${visitor._id}`;
//   const filename = `api/resource/badge/badge${badge._id}.png`;
//   await generateQRCode(uri, filename, badge._id);

//   return badge;
// }

async function sendBadgeEmail(badge, visitor, message) {
  const email =
    visitor.visitor_details && visitor.visitor_details.email
      ? visitor.visitor_details.email
      : visitor.email;

  const mailOptions = {
    from: process.env.MAILER,
    to: email,
    subject: "QR Code for Badge",
    text: message,
    attachments: [
      {
        filename: `badge${badge._id}.png`,
        path: `api/resource/badge/badge${badge._id}.png`,
      },
    ],
  };

  await sendEmail(mailOptions);
}

async function generateQRCode(uri, filename, badgeId) {
  return new Promise((resolve, reject) => {
    QRCode.toFile(
      filename,
      uri,
      { errorCorrectionLevel: "H" },
      function (error) {
        if (error) {
          console.error(
            `Error generating QR code for badge ${badgeId}: ${error.message}`
          );
          reject(error);
        } else {
          console.log(`QR code saved for badge ${badgeId}`);
          resolve();
        }
      }
    );
  });
}

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
          { $set: { qr_id: null, is_active: false, is_valid: false } }
        );
        return res.status(400).json({ error: "The QR is invalid." });
      }

      const time_in_day = new Date(badge.expected_time_in);
      time_in_day.setHours(0, 0, 0 ,0);
      console.log(time_in_day);
      // Check if the visitor timed-in too early
      if (time_in_day > Date.now()) {
        return res.status(400).json({ error: `Visitor is expected to time in on ${badge.expected_time_in}` });
      }
      
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

//will need to add qr_id to parameter
// async function updateLog(badgeId, _id, type, user_id, res) {
//   const badge = await Badge.findById(badgeId);

//   if (badge.is_active) {
//     try {
//       await VisitorLogs.updateOne(
//         { badge_id: badge._id },
//         { $set: { check_out_time: new Date() } }
//       );

//       await Badge.updateOne(
//         { _id: badge._id },
//         { $set: { qr_id: null, is_active: false, is_valid: false } }
//       );

//       await createSystemLog(user_id, "time_out", "success");
//       return res.status(200).json({ message: "time-out" });
//     } catch (error) {
//       await createSystemLog(user_id, "time_out", "failed");
//       return res.status(500).json({ Error: "time-outFailed" });
//     }
//   } else {
//     if (type === "pre-reg") {

//       // check if QR has expired
//       if (badge.expected_time_out < Date.now()) {
//         await Badge.updateOne(
//           { _id: badge._id },
//           { $set: { is_active: false, is_valid: false } }
//         );
//         return res.status(400).json({
//           error: `Visitor expected QR is invalid`,
//         });
//       }

//       // Check if QR is still valid
//       if (badge.is_valid == false) {
//         return res.status(400).json({
//           error: `Visitor QR is invalid`,
//         });
//       }

//       if (badge.expected_time_in > Date.now()) {
//         return res.status(400).json({
//           error: `Visitor expected time in is on ${badge.expected_time_in}`,
//         });
//       }

//       await VisitorLogs.create({
//         badge_id: badge._id,
//         check_in_time: new Date(),
//       });

//       try {
//         await Badge.updateOne(
//           { _id: badge._id },
//           { $set: { is_active: true } }
//         );

//         await createSystemLog(user_id, "time_in", "success");
//         return res.status(200).json({ message: "time-in" });
//       } catch (error) {
//         console.error(error);
//         await createSystemLog(user_id, "time_in", "failed");
//         return res.status(500).json({ Error: "time-inFailed" });
//       }
//     }
//   }
// }

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
          const [visitor, companion] = await Promise.all([
            Visitor.findOne({
              _id: badge.visitor_id,
              expected_time_out: { $lte: currentTime - 15 * 60000 },
            }),
            Visitor.findOne({ "companion_details._id": badge.visitor_id }),
          ]);

          if (visitor) {
            return visitor;
          }

          if (companion) {
            console.log(companion);
            return companion.companion_details;
          }
        }
      })
    );

    const validVisitors = visitors.filter((visitor) => visitor !== undefined);

    if (validVisitors.length > 0) {
      for (const visitor of validVisitors) {
        await createNotification(visitor, "time-out", io);
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
        $and: [
          { "visitor_details.email": { $exists: true, $ne: undefined } },
          { "visitor_details.email": visitor.visitor_details.email }
        ]
      });

      // Check if email is used by another visitor
      if (visitorDB) {
        const { first_name, middle_name, last_name } =
          visitorDB.visitor_details.name;
        const { email } = visitor.visitor_details;

        const isDuplicate =
          visitor.visitor_details.name.first_name === first_name &&
          (visitor.visitor_details.name.middle_name || "") ===
          (middle_name || "") &&
          visitor.visitor_details.name.last_name === last_name;

        return isDuplicate
          ? `Visitor using ${email} already has an existing record`
          : `${email} has already been used by another visitor`;
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
  generateVisitorQRCode,
  generateVisitorQRAndEmail,
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
};
