const Badge = require("../models/badge");
const { 
  generateVisitorQRCode, 
  updateLog,
  createSystemLog
} = require("../utils/helper");

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
  try {
    // const clientIP = req.ip;
    const user_id = req.user._id;
    const log_type = 'generate_badge';

    for (let counter = 0; counter < badgeQty; counter++) {
      await generateVisitorQRCode(counter);
    }

    await createSystemLog(user_id, log_type, 'success');
    return res.status(200).json({ message: `Generated ${badgeQty} of badges` });
  } catch (error) {
    console.error(error);
    await createSystemLog(user_id, log_type, 'failed');
    return res.status(500).json({ Error: error });
  }
};

//still hard coded for testing purpose only
exports.newBadge = async (req, res) => {
    const { visitor_id, qr_id } = req.body;
    const user_id = req.user._id;
    const log_type = 'time_in';

    try {
      const badge = await Badge.create({
        visitor_id: visitor_id,
        qr_id: qr_id,
        is_active: true
      });
      
      createSystemLog(user_id, log_type, 'success');
      return res.send(200).json({ Badge: badge});
    } catch (error) {
      console.error(error);
      createSystemLog(user_id, log_type, 'success');
      return res.send(500).json({ Error: error });
    }
}

exports.checkBadge = async (req, res) => {
  const { qr_id, visitor_id } = req.query;
  let badge;
  let type;

  if (qr_id !== undefined) {
    badge = await Badge.findOne({ qr_id: qr_id });
    // type = "walk-in";
    if (!badge) {
      res.redirect(`http://192.168.1.71:3000/visitor-form?qr_id=${qr_id}`);
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

   const _id = (visitor_id !== undefined) ? visitor_id : qr_id;
   updateLog(badge._id, _id, type, req.user._id, res); 
}
