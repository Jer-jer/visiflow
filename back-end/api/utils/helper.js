require("dotenv").config();

// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

// Models
const RefreshToken = require("../models/refreshToken");
const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");
const Visitor = require("../models/visitor");
const Notification = require("../models/notification");

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

// Constants
const ACCESS_TOKEN_EXPIRATION = "20m";
const REFRESH_TOKEN_EXPIRATION = "7d";
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

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
});

// Environtment Variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Hash password function
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

// Compare password function
function comparePassword(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

// Generate access token function
function generateAccessToken(user) {
  const jwtPayload = {
    sub: user._id,
    role: user.role,
  };
  return jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}

// Generate refresh token function
function generateRefreshToken(user) {
  const jwtPayload = {
    sub: user._id,
  };
  return jwt.sign(jwtPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
}

// Store refresh token function
async function storeRefreshToken(token, userId) {
  const refreshToken = new RefreshToken({ token, userId });
  await refreshToken.save();
}

// Verify refresh token function
async function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded.sub;
  } catch (error) {
    return null;
  }
}

// Generate QR code function, found in badge controller
// use in walk-in visitor
async function generateVisitorQRCode(badgeId) {
  return new Promise((resolve, reject) => {
    const filename = `api/resource/badge/badge${badgeId}.png`;
    const uri = `http://192.168.1.71:5000/badge/checkBadge?qr_id=${badgeId}`;

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
    if (visitor.companion_details.length > 0) {
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

async function generateBadge(visitor) {
  const badge = new Badge({
    visitor_id: visitor._id,
    qr_id: null,
    is_active: false,
    is_valid: true,
  });

  await badge.save();

  const uri = `http://192.168.1.71:5000/badge/checkBadge?visitor_id=${visitor._id}`;
  const filename = `api/resource/badge/badge${badge._id}.png`;
  await generateQRCode(uri, filename, badge._id);

  return badge;
}

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
      QRCode.toFile(filename, uri, { errorCorrectionLevel: "H" }, function (error) {
          if (error) {
              console.error(
                  `Error generating QR code for badge ${badgeId}: ${error.message}`
              );
              reject(error);
          } else {
              console.log(`QR code saved for badge ${badgeId}`);
              resolve();
          }
      });
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

//will need to add qr_id to parameter
async function updateLog(badgeId, _id, type, res) {
  const badge = await Badge.findById(badgeId);

  if (badge.is_active) {
    try {
      await VisitorLogs.updateOne(
        { badge_id: badge._id },
        { $set: { check_out_time: new Date() } }
      );
      await Badge.updateOne(
        { _id: badge._id },
        { $set: { qr_id: null, is_active: false, is_valid: false } }
      );

      return res.status(200).json({ message: "time-out" });
    } catch (error) {
      return res.status(500).json({ Error: "Failed to time-out visitor" });
    }
  } else {
    if (type === "pre-reg") {
      await VisitorLogs.create({
        badge_id: badge._id,
        check_in_time: new Date(),
      });
      await Badge.updateOne({ _id: badge._id }, { $set: { is_active: true } });

      return res.status(200).json({ message: "time-in" });
    } 
  }
}

function uploadFileToGCS(bufferData, fileName) {
  const storage = getStorage();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  file.save(bufferData, {
    contentType: "image/jpeg",
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

  return publicUrl;
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
          const [visitor, companion] = await Promise.all([
            Visitor.findOne({
              _id: badge.visitor_id,
              expected_time_out: { $lte: currentTime - 15 * 60000},
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
        await createNotification(visitor, 'time-out', io);
      }
    }
  } catch (error) {
    console.error("Error in timeOutReminder:", error);
  }
}

async function timeInReminder(io) {
  try {
    const visitors = await Visitor.find({ status: 'Approved' });

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

        await createNotification(visitor, 'time-in', io);
      }
      
    }));
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

  const hostName = visitor.purpose?.who.join(", ") || visitorDB?.purpose?.who.join(", ") || "";
  const date = visitor.purpose?.when || visitorDB?.when || "";
  const time = visitor.expected_time_in || visitorDB?.expected_time_in || "";
  const location = visitor.purpose?.where.join(", ") || visitorDB?.purpose?.where.join(", ") || "";
  const purpose = visitor.purpose?.what?.join(", ") || visitorDB.purpose?.what?.join(", ");
  const visitorType = visitor.visitor_type;

  const notificationContent = {
      visitor_name: visitorName,
      host_name: hostName,
      date: date,
      time: time,
      location: location,
      purpose: purpose,
      visitor_type: visitorType,
  };

  await Notification.create({
      type: type,
      recipient: visitor.visitor_details?._id || visitor[0]._id,
      content: notificationContent,
  });

  io.emit(type, notificationContent);

  console.log(`${type} notification pushed`);
}


module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  generateVisitorQRCode,
  generateVisitorQRAndEmail,
  updateLog,
  uploadFileToGCS,
  timeInReminder,
  timeOutReminder,
  sendEmail
};
