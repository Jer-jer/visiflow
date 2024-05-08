const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");
const Visitor = require("../models/visitor");
const mongoose = require("mongoose");
const { createSystemLog, uploadFileToGCS } = require("../utils/helper");
const { generateQRCode } = require("../utils/qrCodeUtils");
const {
  timeIn,
  timeOut
} = require('../utils/timeRecordUtils');

const archiver = require("archiver");
const fs = require("fs");

const ObjectId = mongoose.Types.ObjectId;

const local_ip = "http://localhost:5000";
const system_ip = "http://localhost:3000"

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

  try {
    const badge = await Badge.findOne({ visitor_id });

    res.status(200).json({ badge });
  } catch (error) {
    return res.status(500).json({ error: "No badge assigned to this visitor" });
  }
};

exports.findAllBadges = async (req, res) => {
  const { visitor_id } = req.body;

  try {
    const badges = await Badge.find({ visitor_id });

    res.status(200).json({ badges });
  } catch (error) {
    return res.status(500).json({ error: "No badge assigned to this visitor" });
  }
};

exports.generateBadge = async (req, res) => {
  const { qty } = req.body;
  const user_id = req.user._id;
  const log_type = "generate_badge";

  //check if qty > 0
  if (qty <= 0) {
    return res
      .status(500)
      .json({ error: "Must have at least 1 badge to generate." });
  }

  try {
    // const clientIP = req.ip;
    const archive = archiver("zip", {
      zlib: { level: 9 }, // compression level
    });

    // create a file to stream archive data to.
    const zipFilename = "badges.zip";
    const output = fs.createWriteStream(zipFilename);

    res.attachment(zipFilename);
    archive.pipe(res);

    output.on("close", function () {
      return res
        .status(200)
        .json({ message: `Generated ${qty} badges`, filename: zipFilename });
    });

    output.on("error", function (error) {
      console.error(`Error archiving QR codes: ${error.message}`);
      return res.status(500).json({ error: error.message });
    });

    const objectIds = Array.from({ length: qty }, () => {
      const objectId = new ObjectId();
      const uri = `${local_ip}/badge/checkBadge?qr_id=${objectId}`;
      const filename = `badge${objectId}.png`;
      return { objectId, filename, uri };
    });

    const promises = objectIds.map(({ objectId, filename, uri }) =>
      generateQRCode(uri, filename, objectId)
    );

    const qrCodes = await Promise.all(promises);

    qrCodes.forEach((qrCode, index) => {
      archive.append(fs.createReadStream(qrCode), {
        name: `badge_${index}.png`,
      });
    });

    archive.finalize();
    await createSystemLog(user_id, log_type, "success");
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
      return res.status(400).json({ error: "Visitor not found in database." });
    }

    const badge = await Badge.create({
      visitor_id: visitor_id,
      qr_id: new ObjectId(qr_id),
      purpose: visitorDB.purpose,
      expected_time_in: visitorDB.expected_time_in,
      expected_time_out: visitorDB.expected_time_out,
      status: "active",
      is_valid: true,
    });

    await VisitorLogs.create({
      badge_id: badge._id,
      check_in_time: new Date(),
    });

    // const uri = `${local_ip}/badge/checkBadge?qr_id=${qr_id}`;
    // const filename = `badge${qr_id}.png`;

    // const qr_file = await generateQRCode(uri, filename, qr_id);

    // const buffer = await fs.readFile(qr_file);

    // const qr_image = uploadFileToGCS(buffer, filename);

    // badge.qr_image = qr_image;
    // await badge.save(); 

    await createSystemLog(user_id, log_type, "success");
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

exports.checkBadge = async (req, res) => {
  const { qr_id } = req.query;

  try {
    const badge = await Badge.findOne({ qr_id: qr_id });

    if (!badge) {
      const visitor = await Visitor.findById({ _id: qr_id });
      // Checks if the visitor type
      if (visitor) {
        return res.status(400).json({ error: "Visitor QR is invalid." });
      }

      return res
        .status(200)
        .json({
          type: "new-recurring",
          url: `${system_ip}/visitor-form/?qr_id=${qr_id}`,
        });
    }
    
    //If badge && visitor is true then show visitor info
    const visitor = await Visitor.findById({ _id: badge.visitor_id });
    return res.status(200).json({ visitor: visitor, badge_id: badge._id, status: badge.status });

    // updateLog(badge._id, req.user.sub, res);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve badge" });
  }
};

exports.timeRecord = async (req, res) => {
  const { _id, record } = req.body;
  const userId = req.user.sub;

  try {
    
    const { result, type, error } = (record) ? await timeIn(_id) : await timeOut(_id);

    if (result) {
      await createSystemLog(userId, type, "success");
      return res.status(200).json({ type: type });
    } else {
      return res.status(400).json({ error: error });
    }

  } catch (error) {
    return res.status(500).json({ error: "Failed to track time record." });
  }
} 