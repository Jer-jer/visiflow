const Reasons = require("../models/reasons");
const {
  validateReasons,
  validationResult,
} = require("../middleware/dataValidation");

// function sanitizeData(announcements) {
//     return {
//         _id: announcements._id,
//         title: announcements.title,
//         message: announcements.message
//     };
// }

//Get list of announcements
exports.getAllReasons = async (req, res) => {
  try {
    const reasons = await Reasons.find();
    return res.json({ reasons });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Create new announcements
exports.createNewReasons = async (req, res) => {
  const { reason } = req.body;

  await Promise.all(validateReasons.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const existingReason = await Reasons.findOne({ reason });
  if (existingReason) {
    return res.status(400).json({ error: "Reason already exists" });
  }

  try {
    const newReason = await Reasons.create({
      reason,
    });

    res.status(201).json({ reason: newReason });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create new Reason" });
  }
};
//Find Announcements by Title
exports.getReasonsByTitle = async (req, res) => {
  try {
    const { reason } = req.body;
    const regex = new RegExp(reason, "i");
    const searchReasons = await Reasons.find({ reason: regex });
    if (searchReasons) {
      return res.status(201).json({ reasons: searchReasons });
    } else {
      return res.status(404).json({ error: "Reason not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.updateReasons = async (req, res) => {
  try {
    const { _id, reason } = req.body;

    const existingReason = await Reasons.findOne({ reason });
    if (existingReason) {
      return res.status(400).json({ error: "Reason already exists" });
    }

    const reasons = await Reasons.findById(_id);

    if (!reasons) {
      return res.status(404).json({ error: "Reason not found" });
    }

    const updateFields = {
      reason: reason !== undefined ? title : reason.title,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedReasons = await Reasons.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    return res.status(201).json({ reasons: updatedReasons });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReasons = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedData = await Reasons.findByIdAndDelete(_id);

    if (deletedData) {
      return res.status(201).json({ message: "Data deleted successfully" });
    } else {
      return res.status(404).json({ error: "Reason not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
