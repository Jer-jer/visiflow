const Badge = require("../models/badge");
const VisitorLogs = require('../models/visitorLogs');
const Visitor = require('../models/visitor');
const mongoose = require('mongoose');
const {
  generateVisitorQRCode,
  verifyAccessToken,
  updateLog,
  createSystemLog,
} = require("../utils/helper");
const archiver = require('archiver');
const fs = require('fs');
const tar = require('tar');

const ObjectId = mongoose.Types.ObjectId;
const badgeQty = 5;

exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.status(200).json({ badges });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve badges from the database" });
  }
};

exports.findBadge = async (req, res) => {
  const { visitor_id } = req.body;
  const badge = await Badge.findOne({ visitor_id });
  if (!badge)
    return res.status(400).json({ error: "No badge assigned to this visitor" });
  res.status(200).json({ badge });
};

exports.generateBadge = async (req, res) => {
  const { qty } = req.body;

  //check if qty > 0
  if(qty <= 0) {
    return res.status(400).json({ error: 'Must have at least 1 badge to generate.' });
  }

  try {
    // const clientIP = req.ip;
    const user_id = req.user._id;
    const log_type = "generate_badge";
    const archive = archiver('zip', {
      zlib: { level: 9 } // compression level
    });

    // create a file to stream archive data to.
    const zipFilename = "badges.zip";
    const output = fs.createWriteStream(zipFilename);
    
    res.attachment(zipFilename);
    archive.pipe(res);
    
    output.on('close', function() {
      return res.status(200).json({ message: `Generated ${qty} badges`, filename: zipFilename });
    });
    
    output.on('error', function(error) {
      console.error(`Error archiving QR codes: ${error.message}`);
      return res.status(500).json({ error: error.message });
    });
  
    const promises = Array.from({ length: qty }, () => generateVisitorQRCode(new ObjectId()));

    const qrCodes = await Promise.all(promises);

    qrCodes.forEach((qrCode, index) => {
      archive.append(fs.createReadStream(qrCode), { name: `badge_${index}.png` });
    });

    archive.finalize();
  } catch (error) {
    console.error(error);
    await createSystemLog(user_id, log_type, "failed");
    return res.status(500).json({ error: error });
  }
};

exports.newBadge = async (req, res) => {
  const { visitor_id, qr_id } = req.body;
  const user_id = req.user._id;
  const log_type = "time_in";

  try {
    const visitorDB = await Visitor.findById(visitor_id);

    if (!visitorDB) {
      return res.status(400).json({ error: 'Visitor not found in database.' });
    }

    const badge = await Badge.create({
      visitor_id: visitor_id,
      qr_id: new ObjectId(qr_id),
      expected_time_in: visitorDB.expected_time_in,
      expected_time_out: visitorDB.expected_time_out,
      is_active: true,
      is_valid: true,
    });

    await VisitorLogs.create({
      badge_id: badge._id,
      check_in_time: new Date(),
    });

    await createSystemLog(user_id, log_type, "success");
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);    
    return res.sendStatus(500);
  }
};

exports.checkBadge = async (req, res) => {
  const { qr_id, visitor_id } = req.query;

  let badge;
  let type;

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  if (qr_id !== undefined) {
    badge = await Badge.findOne({ qr_id: qr_id });
    if (!badge) {
      return res.redirect(`http://localhost:3000/visitor-form/?qr_id=${qr_id}`);
    }
  } else {
    badge = await Badge.findOne({ visitor_id: visitor_id });
    type = "pre-reg";
  }

  if (!badge) {
    return res.status(400).json({ message: `No visitor assigned to badge` });
  }

  if (!badge.is_valid) {
    return res.status(400).json({ message: `Invalid visitor badge` });
  }

  const _id = visitor_id !== undefined ? visitor_id : qr_id;
  updateLog(badge._id, _id, type, req.user.sub, res);
};
