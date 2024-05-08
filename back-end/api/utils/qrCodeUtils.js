require('dotenv').config();

// Models
const Visitor = require("../models/visitor");
const Badge = require("../models/badge");

// Constants
const local_ip = "http://localhost:5000";

// Imports
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

// Middleware

const {
  uploadFileToGCS,
  createImageBuffer
} = require('../utils/helper')

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
});

/**
 * Generates QR codes and sends emails to the visitor and their companions.
 * @param {string} visitorId - The ID of the visitor.
 * @param {String} message - The message to be included in the email.
 * @returns {void}
 */
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
        visitor.companions.map(async (companion) => {
          const temp = await Visitor.findById(companion);
          await generateQRAndEmail(temp, message);
        })
      );
      if (companionBadges) {
        badges.push(...companionBadges);
      } else {
        throw new Error("Error generating companion badges");
      }
    }
  } catch (error) {
    console.error("Error generating QR code and sending email:", error);
  }
}

/**
 * Generates a QR code and sends an email for a visitor.
 * @param {Object} visitor - The visitor object.
 * @param {string} message - The message to be included in the email.
 * @returns {Promise<Object>} - A promise that resolves with an object containing the visitor ID and badge ID.
 * @throws {Error} - If an error occurs during QR code generation or email sending.
 */
async function generateQRAndEmail(visitor, message) {
  try {
    const badge = await generateBadge(visitor);
    await sendBadgeEmail(badge, visitor, message);
    return { visitorId: visitor._id, badgeId: badge._id };
  } catch (error) {
    console.error("Error generating QR code and sending email:", error);
    throw error;
  }
}

/**
 * Generates a pre-registered badge for a visitor.
 * @param {Object} visitor - The visitor object.
 * @returns {Promise<Object>} - A promise that resolves with the generated badge object.
 * @throws {Error} - If an error occurs during badge creation, QR code generation, or saving.
 */
async function generateBadge(visitor) {
  try {
    const badge = new Badge({
      visitor_id: visitor._id,
      qr_id: visitor._id,
      purpose: visitor.purpose,
      expected_time_in: visitor.expected_time_in,
      expected_time_out: visitor.expected_time_out,
      status: "inactive",
      is_valid: true,
    });

    await badge.save();

    const filename = `badge${badge._id}.png`;
    const uri = `${local_ip}/badge/checkBadge?qr_id=${visitor._id}`;
    const qr_file = await generateQRCode(uri, filename, badge._id)

    const buffer = await fs.readFile(qr_file);

    const qr_image = uploadFileToGCS(
      buffer,
      filename
    );

    badge.qr_image = qr_image;
    await badge.save();

    return badge;
  } catch (error) {
    console.error("Error generating pre-registered badge:", error);
    throw error;
  }
}

/**
 * Generates a QR code image and saves it to a file
 * @param {string} uri - The URI for the QR code.
 * @param {string} filename - The filename for saving the QR code.
 * @param {string} badgeId - The ID of the badge associated with the QR code.
 * @returns {Promise<void>} - A promise that resolves when the QR code is generated and saved successfully.
 * @throws {Error} - If an error occurs during QR code generation or saving.
 */
async function generateQRCode(uri, filename, badgeId) {
  return new Promise(async (resolve, reject) => {
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
            // const buffer = await fs.readFile(filename);
            // resolve(buffer);
            await fs.readFile(filename);
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

/**
 * Sends an email containing the QR code for the badge to the visitor.
 * @param {Object} badge - The badge object.
 * @param {Object} visitor - The visitor object.
 * @param {string} message - The message to be included in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - If an error occurs during email sending.
 */
async function sendBadgeEmail(badge, visitor, message) {
  try {
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
          path: `badge${badge._id}.png`,
        },
      ],
    };

    await sendEmail(mailOptions);
    console.log(`Email sent for badge ${badge._id}`);
  } catch (error) {
    console.error("Error sending badge email:", error);
    throw error;
  }
}

/**
 * Sends an email with the provided mail options.
 * @param {Object} mailOptions - The options for sending the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - If an error occurs during email sending.
 */
async function sendEmail(mailOptions) {
  try {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = {
  generateQRCode,
  generateVisitorQRAndEmail,
  sendEmail,
};
