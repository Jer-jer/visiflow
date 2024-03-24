const Visitor = require("../models/visitor");
const {
  validateVisitor,
  validationResult,
} = require("../middleware/dataValidation");
const {
  generateVisitorQRAndEmail,
  uploadFileToGCS,
  sendEmail,
} = require("../utils/helper");
const { Buffer } = require("node:buffer");
const Notification = require("../models/notification");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    return res.status(200).json({ visitors });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database" });
  }
};

exports.addVisitor = async (req, res) => {
  const {
    visitor_data: {
      visitor_details: {
        name: { first_name, middle_name, last_name },
        address: { street, house, brgy, city, province, country },
        email,
        phone,
      },
      expected_time_in,
      expected_time_out,
      companion_details,
      plate_num,
      purpose,
      id_picture,
      visitor_type,
      status,
    },
  } = req.body;

  const io = req.io;

  try {
    await Promise.all(
      validateVisitor.map((validation) => validation.run(req.body.visitor_data))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const visitorDB = await Visitor.findOne({
      "visitor_details.name.first_name": first_name,
      "visitor_details.name.middle_name": middle_name,
      "visitor_details.name.last_name": last_name,
    });

    if (visitorDB) {
      return res.status(409).json({ error: "Visitor already exists" });
    }

    const [frontId, backId, selfieId] = await Promise.all([
      uploadFileToGCS(
        Buffer.from(
          id_picture.front.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        `${Date.now()}_${last_name.toUpperCase()}_front.jpg`
      ),
      uploadFileToGCS(
        Buffer.from(
          id_picture.back.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        `${Date.now()}_${last_name.toUpperCase()}_back.jpg`
      ),
      uploadFileToGCS(
        Buffer.from(
          id_picture.selfie.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        `${Date.now()}_${last_name.toUpperCase()}_selfie.jpg`
      ),
    ]);

    const newVisitor = await Visitor.create({
      _id: new ObjectId(),
      visitor_details: {
        name: { first_name, middle_name, last_name },
        address: { street, house, brgy, city, province, country },
        email,
        phone,
      },
      companion_details: companion_details || [],
      plate_num: plate_num,
      purpose: purpose,
      expected_time_in: expected_time_in,
      expected_time_out: expected_time_out,
      id_picture: {
        front: frontId,
        back: backId,
        selfie: selfieId,
      },
      visitor_type: visitor_type,
      status: status,
    });

    io.emit("newVisitor", newVisitor);

    if (visitor_type === "Pre-Registered") {
      const pendingVisitor = await Notification.create({
        type: "pending",
        recipient: newVisitor.visitor_details._id,
        content: {
          visitor_name: `${newVisitor.visitor_details.name.last_name}, ${newVisitor.visitor_details.name.first_name} ${newVisitor.visitor_details.name.middle_name}`,
          host_name: newVisitor.purpose.who.join(", "),
          date: newVisitor.purpose.when,
          time: newVisitor.expected_time_in,
          location: newVisitor.purpose.where.join(", "),
          purpose: newVisitor.purpose.what.join(", "),
          visitor_type: newVisitor.visitor_type,
        },
      });

      io.emit("newNotification", pendingVisitor);
    }

    return res.status(201).json({ visitor: newVisitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new visitor" });
  }
};

exports.findVisitor = async (req, res) => {
  const { _id } = req.body;

  try {
    const visitorDB = await Visitor.findById(_id);

    if (visitorDB) {
      return res.status(200).json({ Visitor: visitorDB });
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find visitor by ID" });
  }
};

exports.updateVisitor = async (req, res) => {
  const {
    _id,
    first_name,
    middle_name,
    last_name,
    companion_details,
    street,
    house,
    brgy,
    city,
    province,
    country,
    email,
    phone,
    plate_num,
    purpose,
    expected_time_in,
    expected_time_out,
    visitor_type,
    status,
    id_picture,
  } = req.body;

  try {
    const visitorDB = await Visitor.findById(_id);
    if (!visitorDB) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    const updateFields = {
      "visitor_details.name.first_name": first_name,
      "visitor_details.name.middle_name": middle_name,
      "visitor_details.name.last_name": last_name,
      "visitor_details.address.street": street,
      "visitor_details.address.house": house,
      "visitor_details.address.brgy": brgy,
      "visitor_details.address.city": city,
      "visitor_details.address.province": province,
      "visitor_details.address.country": country,
      "visitor_details.email": email,
      "visitor_details.phone": phone,
      companion_details: companion_details,
      plate_num: plate_num,
      purpose: purpose,
      expected_time_in: expected_time_in,
      expected_time_out: expected_time_out,
      visitor_type: visitor_type,
      status: status,
      id_picture: id_picture,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedVisitor = await Visitor.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    res.status(201).json({ visitor: updatedVisitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteVisitor = async (req, res) => {
  const { _id } = req.body;

  try {
    const visitorDB = await Visitor.findByIdAndDelete(_id);

    if (visitorDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  const { _id, status, message, email, companions } = req.body;

  try {
    const visitorDB = await Visitor.findById(_id);

    if (!visitorDB) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    visitorDB.status = status;

    await visitorDB.save();

    if (status === "Approved") {
      try {
        let result = generateVisitorQRAndEmail(visitorDB._id, message);

        //TODO Causes to throw error to the FE
        // if (!(await result).success) {
        //   return res.status(500).json({ Error: (await result).message });
        // }

        // Appointment Confirmation
        await Notification.create({
          type: "confirmation",
          recipient: visitorDB.visitor_details._id,
          content: {
            visitor_name: `${visitorDB.visitor_details.name.last_name}, ${visitorDB.visitor_details.name.first_name} ${visitorDB.visitor_details.name.middle_name}`,
            host_name: visitorDB.purpose.who.join(", "),
            date: visitorDB.purpose.when,
            time: visitorDB.expected_time_in,
            location: visitorDB.purpose.where.join(", "),
            purpose: visitorDB.purpose.what.join(", "),
            visitor_type: visitorDB.visitor_type,
          },
        });

        res.status(200).json({ message: `Visitor is now ${status}` });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Failed to send email" });
      }
    } else if (status === "Declined") {
      try {
        sendEmail({
          from: process.env.MAILER,
          to: email,
          subject: "Pre-Registration Declined",
          text: message,
        });

        if (companions && companions.length > 0) {
          for (const companion of companions) {
            sendEmail({
              from: process.env.MAILER,
              to: companion.email,
              subject: "Pre-Registration Declined",
              text: message,
            });
          }
        }

        await Notification.create({
          type: "declined",
          recipient: visitorDB.visitor_details._id,
          content: {
            visitor_name: `${visitorDB.visitor_details.name.last_name}, ${visitorDB.visitor_details.name.first_name} ${visitorDB.visitor_details.name.middle_name}`,
            host_name: visitorDB.purpose.who.join(", "),
            date: visitorDB.purpose.when,
            time: visitorDB.expected_time_in,
            location: visitorDB.purpose.where.join(", "),
            purpose: visitorDB.purpose.what.join(", "),
            visitor_type: visitorDB.visitor_type,
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Failed to send email" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update visitor status" });
  }
};
