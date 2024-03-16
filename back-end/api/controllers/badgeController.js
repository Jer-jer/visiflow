const Badge = require('../models/badge');
const { generateQRCode, updateLog } = require('../utils/helper');

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
        visitor_id: '65dc01b46b9160d9bed89e81',
        qr_id: '0',
        is_active: true
    });
    await badge.save();
    res.send(200);
}

exports.checkBadge = async (req, res) => {
    const { qr_id, visitor_id } = req.query;
    let badge;

    if (qr_id !== undefined) {
    badge = await Badge.findOne({qr_id: qr_id});
    } else {
      badge = await Badge.findOne({ visitor_id: visitor_id });
    }

   if(!badge) {
    return res.status(400).json({ message: `No visitor assigned to badge`});
   }

   if(!badge.is_valid) {
    return res.status(400).json({ message: `Invalid visitor badge`});
   }

   updateLog(badge._id, visitor_id, res);
}
