require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const RefreshToken = require("../models/refreshToken");
const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");
const Visitor = require("../models/visitor");
const nodemailer = require("nodemailer");
const { Storage } = require("@google-cloud/storage");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = "20m";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRATION = "7d";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
});

// GET CREDS FROM GOOGLE CLOUD
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const bucketName = "visiflow";

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

function comparePassword(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

function generateAccessToken(user) {
  const jwtPayload = {
    sub: user._id,
    role: user.role,
  };
  return jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}

function generateRefreshToken(user) {
  const jwtPayload = {
    sub: user._id,
  };
  return jwt.sign(jwtPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
}

async function storeRefreshToken(token, userId) {
  const refreshToken = new RefreshToken({ token, userId });
  await refreshToken.save();
}

async function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded.sub;
  } catch (error) {
    return null;
  }
}

async function generateQRCode(badgeId) {
  return new Promise((resolve, reject) => {
    const filename = `api/resource/badge/badge${badgeId}.png`;
    //insert local machine ip here
    const uri = `http://192.168.1.5:5000/badge/checkBadge?qr_id=${badgeId}`;
    QRCode.toFile(filename, uri, { errorCorrectionLevel: "H" }, function (err) {
      if (err) {
        console.error(
          `Error generating QR code for badge ${badgeId}: ${err.message}`
        );
        reject(err);
      } else {
        console.log(`QR code saved for badge ${badgeId}`);
        resolve();
      }
    });
  });
}

async function generateSingleQRCode(visitorId, message) {
  try {
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      throw new Error("Visitor not found");
    }

    const badges = [];

    // Generate QR Code for visitor
    const visitorBadge = await generateQRForVisitor(visitor, message);
    badges.push(visitorBadge);

    //Generate QR Code for companions
    if (visitor.companion_details.length > 0) {
      for (const companion of visitor.companion_details) {
        const companionBadge = await generateQRForVisitor(companion, message);
        badges.push(companionBadge);
      }
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

async function generateQRForVisitor(visitor, message) {
  try {
    const badge = new Badge({
      visitor_id: visitor._id,
      qr_id: null,
      is_active: false,
      is_valid: true,
    });

    const email =
      visitor.visitor_details && visitor.visitor_details.email
        ? visitor.visitor_details.email
        : visitor.email;

    await badge.save();

    const filename = `api/resource/badge/badge${badge._id}.png`;
    const uri = `http://192.168.1.5:5000/badge/checkBadge?visitor_id=${visitor._id}`;
    await generateQRCode(uri, filename, badge._id);

    const mailOptions = {
      from: process.env.MAILER,
      to: email,
      subject: "QR Code for Badge",
      text: message,
      attachments: [
        {
          filename: `badge${badge._id}.png`,
          path: filename,
        },
      ],
    };

    await sendEmail(mailOptions);

    console.log(`QR code and email sent for badge ${badge._id}`);
    return { visitorId: visitor._id, badgeId: badge._id };
  } catch (error) {
    console.error("Error generating QR code and sending email:", error);
    throw error;
  }
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

async function updateLog(badgeId, visitorId, res) {
  const badge = await Badge.findById(badgeId);
  console.log(badge);
  if (badge.is_active) {
    try {
      await VisitorLogs.updateOne(
        {
          badge_id: badge._id,
        },
        {
          $set: {
            check_out_time: new Date(),
          },
        }
      );
      await Badge.updateOne(
        {
          _id: badge._id,
        },
        {
          $set: {
            qr_id: null,
            is_active: false,
            is_valid: false,
          },
        }
      );

      return res.status(200).json({ message: "time-out" });
    } catch (error) {
      return res.status(500).json({ Error: "Failed to time-out visitor" });
    }
  } else {
    if (visitorId !== undefined) {
      await VisitorLogs.create({
        badge_id: badge._id,
        check_in_time: new Date(),
      });

      await Badge.updateOne(
        {
          _id: badge._id,
        },
        {
          $set: {
            is_active: true,
          },
        }
      );

      //notification trigger for time-in

      return res.status(200).json({ message: "time-in" });
    } else {
      //redirect to registration page
      // res.redirect(`http://192.168.1.3:3000/?qr_id=${qr_id}`);
      return res.status(200).json({ message: "ok" }); //temporary just to check
    }
  }
}

function uploadFileToGCS(bufferData, fileName) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  file.save(bufferData, {
    contentType: "image/jpeg",
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

  return publicUrl;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  generateQRCode,
  generateSingleQRCode,
  updateLog,
  uploadFileToGCS,
  sendEmail,
};
