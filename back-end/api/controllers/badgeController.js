const User = require("../models/user");
const Badge = require("../models/badge");
const VisitorLogs = require("../models/visitorLogs");
const { generateQRCode } = require("../utils/helper");

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
    return res
      .status(400)
      .json({ message: `No badge assigned to visitor ${visitor_id}` });
  res.status(200).json({ badge });
};

exports.generateBadge = async (req, res) => {
  const clientIP = req.ip;

  console.log(clientIP);

  for (let counter = 0; counter < badgeQty; counter++) {
    await generateQRCode(counter);
  }
  res.status(200).json({ message: `Generated ${badgeQty} of badges` });
};

exports.newBadge = async (req, res) => {
  const badge = new Badge({
    visitor_id: "65dc01b46b9160d9bed89e81",
    qr_id: "0",
    is_active: false,
  });
  await badge.save();
  res.send(200);
};

exports.checkBadge = async (req, res) => {
  const qr_id = req.query.qr_id;
  //get badge
  const badge = await Badge.findOne({ qr_id: qr_id });
  if (!badge)
    return res
      .status(400)
      .json({ message: `No visitor assigned to badge ${qr_id}` });

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
          },
        }
      );

      return res.status(200).json({ message: "time-out" });
    } catch (error) {
      console.log("failed");
    }
  } else {
    console.log("redirecting to register");
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
    return res.status(200).json({ message: "time-in" });
    // res.redirect(`http://192.168.1.3:3000/?qr_id=${qr_id}`);
  }
};
