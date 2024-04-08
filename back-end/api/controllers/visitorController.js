const Visitor = require("../models/visitor");
const {
  validateVisitor,
  validationResult,
} = require("../middleware/dataValidation");
const {
  generateVisitorQRAndEmail,
  uploadFileToGCS,
  sendEmail,
  createSystemLog,
  createNotification,
} = require("../utils/helper");
const { Buffer } = require("node:buffer");
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const { findOne } = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    const io = req.io;

    return res.status(200).json({ visitors });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database" });
  }
};

exports.addVisitor = async (req, res) => {
  //? Expects an array of visitors
  const { visitors } = req.body;

  const io = req.io;

  let companions = []; 
  let mainVisitorId;
  let index = 0;

  try {
    for (const visitor of visitors) {
      
      await Promise.all(
        validateVisitor.map((validation) => validation.run(visitors))
      );

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const visitorDB = await Visitor.findOne({ 'visitor_details.email': visitor.visitor_details.email });

      if (visitorDB) {
        return res.status(400).json({ error: 'Visitor already exists' });
      } 

      const newVisitor = await Visitor.create({
        _id: new ObjectId(),
        visitor_details: visitor.visitor_details,
        companions: [],
        plate_num: visitor.plate_num,
        purpose: visitor.purpose,
        visitor_type: visitor.visitor_type,
        status: visitor.status,
        id_picture: {
          front: "",
          back: "",
          selfie: "",
        },
        expected_time_in: visitor.expected_time_in,
        expected_time_out: visitor.expected_time_out
      });
      if (index === 0) {
        mainVisitorId = newVisitor._id;
      } else {
        companions.push(newVisitor._id);
      }

      io.emit("newVisitor", newVisitor);

      if (newVisitor.visitor_type === "Pre-Registered") {
        createNotification(newVisitor, 'pending', io);
          
      } else {
        //For walk in
        const user_id = req.user._id;
        const log_type = "add_visitor";
        createSystemLog(user_id, log_type, "success");
      }

      index++;
    } 

    if (companions.length > 0) {
      await Visitor.updateOne(
        { _id: mainVisitorId },
        { $set: { companions: companions }}
      );
    }

    return res.status(201).json({ visitors: visitors });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
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

exports.findVisitorByLastName = async (req, res) => {
  const { last_name } = req.body;

  try {
    const visitorDB = await Visitor.findOne({
      "visitor_details.name.last_name": last_name,
    });

    if (visitorDB) {
      return res.status(200).json({
        success: "Visitor found",
        visitor_id: visitorDB._id,
        id_picture: visitorDB.id_picture,
      });
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong with your request" });
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
    id_picture,
  } = req.body;

  const user_id = req.user._id;
  const log_type = "update_visitor";

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
    
    await createSystemLog(user_id, log_type, 'success');
    res.status(201).json({ visitor: updatedVisitor });
  } catch (error) {
    console.error(error);
    await createSystemLog(user_id, log_type, "failed");
    return res.status(500).json({ error: "Failed to update visitor" });
  }
};

exports.newRecurringVisitor = async (req, res) => {
  const {
    _id,
    companion_details,
    plate_num,
    purpose,
    expected_time_in,
    expected_time_out,
    visitor_type,
  } = req.body;

  // const user_id = req.user._id;
  // const log_type = "update_visitor";

  try {
    const visitorDB = await Visitor.findById(_id);
    if (!visitorDB) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    const updateFields = {
      companion_details: companion_details,
      plate_num: plate_num,
      purpose: purpose,
      expected_time_in: expected_time_in,
      expected_time_out: expected_time_out,
      visitor_type: visitor_type,
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

    //? TBD If Guard System will utilize it
    // await createSystemLog(user_id, log_type, "success");
    res.status(201).json({ visitor: updatedVisitor });
  } catch (error) {
    console.error(error);
    // await createSystemLog(user_id, log_type, "failed");
    return res.status(500).json({ error: "Failed to update visitor" });
  }
};

exports.deleteVisitor = async (req, res) => {
  const { _id } = req.body;
  const user_id = req.user._id;
  const log_type = "delete_visitor";

  try {
    const visitorDB = await Visitor.findByIdAndDelete(_id);

    if (visitorDB) {
      await createSystemLog(user_id, log_type, "success");
      return res.status(204).send();
    } else {
      await createSystemLog(user_id, log_type, "failed");
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    console.error(error);
    await createSystemLog(user_id, log_type, "failed");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  const { _id, status, message, email, companions } = req.body;
  const io = req.io;

  const user_id = req.user._id;

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
        const approvalNotif = await Notification.create({
          _id: new ObjectId(),
          type: "confirmation",
          recipient: visitorDB.visitor_details._id,
          content: {
            visitor_name: `${visitorDB.visitor_details.name.last_name}, ${visitorDB.visitor_details.name.first_name} ${visitorDB.visitor_details.name.middle_name}`,
            host_name: visitorDB.purpose.who.join(", "),
            date: visitorDB.purpose.when,
            time_in: visitorDB.expected_time_in,
            time_out: visitorDB.expected_time_out,
            location: visitorDB.purpose.where.join(", "),
            purpose: visitorDB.purpose.what.join(", "),
            visitor_type: visitorDB.visitor_type,
          },
        });

        await createSystemLog(user_id, "approve_status", "success");

        io.emit("newNotification", approvalNotif);

        res.status(200).json({ message: `Visitor is now ${status}` });
      } catch (error) {
        console.error(error);
        await createSystemLog(user_id, "approve_status", "failed");
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

        const declinedNotif = await Notification.create({
          _id: new ObjectId(),
          type: "declined",
          recipient: visitorDB.visitor_details._id,
          content: {
            visitor_name: `${visitorDB.visitor_details.name.last_name}, ${visitorDB.visitor_details.name.first_name} ${visitorDB.visitor_details.name.middle_name}`,
            host_name: visitorDB.purpose.who.join(", "),
            date: visitorDB.purpose.when,
            time_in: visitorDB.expected_time_in,
            time_out: visitorDB.expected_time_out,
            location: visitorDB.purpose.where.join(", "),
            purpose: visitorDB.purpose.what.join(", "),
            visitor_type: visitorDB.visitor_type,
          },
        });

        await createSystemLog(user_id, "decline_status", "success");

        io.emit("newNotification", declinedNotif);

        res.status(200).json({ message: `Visitor is now ${status}` });
      } catch (error) {
        console.error(error);
        await createSystemLog(user_id, "decline_status", "failed");
        return res.status(500).json({ Error: "Failed to send email" });
      }
    } else if (status === "In Progress") {
      res.status(200).json({ message: `Visitor status has been changed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update visitor status" });
  }
};
