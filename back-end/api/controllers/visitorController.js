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
  generateFileName,
  createImageBuffer,
  validateDuplicate,
} = require("../utils/helper");
const { Buffer } = require("node:buffer");
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const { findOne } = require("../models/user");
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

//For Current Visitors by Janusz
exports.getCurrentVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ checkoutTime: null });
    const io = req.io;

    return res.status(200).json({ visitors });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database" });
  }
};

exports.getCompanions = async (req, res) => {
  const { visitor_id } = req.body;

  try {
    const visitorDB = await Visitor.findById(new ObjectId(visitor_id));

    if (!visitorDB) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    const companionIds = visitorDB.companions.map((id) => new ObjectId(id));

    const companions = await Visitor.find({
      _id: { $in: companionIds },
    });

    if (!companions) {
      return res.status(404).json({ error: "Companions not found" });
    }

    return res.status(200).json({ companions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve Companions" });
  }
};

exports.addVisitor = async (req, res, next) => {
  const { visitors } = req.body;
  const io = req.io;

  if (!visitors || visitors.length === 0) {
    return res.status(400).json({ error: "No visitors provided" });
  }

  try {
    const mainVisitor = visitors[0];
    let companions = [];
    let mainVisitorId;

    // Bulk data validation
    await Promise.all(validateVisitor.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array().map(error => error.msg);
      return res.status(409).json({ error: err[0] });
    } 
    
    const duplicateErrors = await validateDuplicate(visitors, res); 

    if (duplicateErrors.length > 0) {
      return res.status(409).json({ error: duplicateErrors[0]});
    }

    if (
      id_picture.front &&
      id_picture.back &&
      id_picture.selfie 
    ) {
      
    }

    const [frontId, backId, selfieId] = await Promise.all([
      //Upload images to Google Cloud Storage
      uploadFileToGCS(
        createImageBuffer(mainVisitor.id_picture.front),
        generateFileName(mainVisitor, "front")
      ),
      uploadFileToGCS(
        createImageBuffer(mainVisitor.id_picture.back),
        generateFileName(mainVisitor, "back")
      ),
      uploadFileToGCS(
        createImageBuffer(mainVisitor.id_picture.selfie),
        generateFileName(mainVisitor, "selfie")
      ),
    ]);

    const newVisitorsData = visitors.map((visitor, index) => {
      // Visitor creation
      const {
        visitor_details,
        plate_num,
        purpose,
        visitor_type,
        status,
        expected_time_in,
        expected_time_out,
      } = visitor;
      return {
        _id: new ObjectId(),
        visitor_details: {
          name: {
            ...visitor_details.name,
            middle_name: visitor_details.name.middle_name || "",
          },
          address: { ...visitor_details.address },
          email: visitor_details.email,
          phone: visitor_details.phone,
        },
        companions: [],
        plate_num,
        purpose,
        visitor_type,
        status,
        id_picture: {
          front: index === 0 ? frontId : "",
          back: index === 0 ? backId : "",
          selfie: index === 0 ? selfieId : "",
        },
        expected_time_in,
        expected_time_out,
      };
    });

    try {
      const newVisitors = await Visitor.insertMany(newVisitorsData);
      mainVisitorId = newVisitors[0]._id;
      companions.push(...newVisitors.slice(1).map((visitor) => visitor._id));

      if (companions.length > 0) {
        await Visitor.updateOne(
          { _id: mainVisitorId },
          { $set: { companions: companions } }
        );
      }

      newVisitors.forEach((visitor) => {
        io.emit("newVisitor", visitor);
        if (visitor.visitor_type === "Pre-Registered") {
          createNotification(visitor, "pending", io);
        } else {
          createSystemLog(req.user._id, "add_visitor", "success");
        }
      });

      return res.status(201).json({ visitors: newVisitors });  
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ error: "Duplicate key error" });  
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
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

//? This controller is used by the visitor system and guard system for looking recurring visitors
exports.findRecurring = async (req, res) => {
  const { email, last_name } = req.body;

  try {
    if (email) {
      const visitorDB = await Visitor.findOne({
        "visitor_details.email": email,
      });

      if (visitorDB) {
        return res.status(200).json({
          success: "Visitor found",
          visitor_id: visitorDB._id,
          id_picture: visitorDB.id_picture,
          name: visitorDB.visitor_details.name,
        });
      } else {
        return res.status(404).json({ error: "Visitor not found" });
      }
    } else if (last_name) {
      const visitorDB = await Visitor.find({
        "visitor_details.name.last_name": last_name,
      });

      if (visitorDB) {
        const visitors = visitorDB.map((visitor) => ({
          _id: visitor._id,
          visitor_details: visitor.visitor_details,
          plate_num: visitor.plate_num,
        }));

        return res.status(200).json({
          success: "Visitor found",
          visitors: visitors,
        });
      } else {
        return res.status(404).json({ error: "Visitor not found" });
      }
    } else {
      return res.status(400).json({ error: "No valid fields to search" });
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
    companions,
    // id_picture,
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
      plate_num: plate_num,
      purpose: purpose,
      expected_time_in: expected_time_in,
      expected_time_out: expected_time_out,
      visitor_type: visitor_type,
      companions: companions,
      // id_picture: id_picture,
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

    await createSystemLog(user_id, log_type, "success");
    res.status(201).json({ visitor: updatedVisitor });
  } catch (error) {
    console.error(error);
    await createSystemLog(user_id, log_type, "failed");
    return res.status(500).json({ error: "Failed to update visitor" });
  }
};

//? Used by the visitor system for updating recurring visitors in pre-registration
exports.newRecurringPRVisitor = async (req, res) => {
  const { visitors } = req.body;

  const io = req.io;
  let companions = [];

  try {
    for (let x = 1; x < visitors.length; x++) {
      const visitorDB = await Visitor.findOne({
        "visitor_details.email": visitors[x].visitor_details.email,
      });

      if (visitorDB) {
        //? UPDATE COMPANION

        //? Check if the companion already exists based on the returned findOne()
        const firstName = visitorDB.visitor_details.name.first_name;
        const middleName = visitorDB.visitor_details.name.middle_name
          ? visitorDB.visitor_details.name.middle_name
          : "";
        const lastName = visitorDB.visitor_details.name.last_name;

        const duplicateCompanion =
          visitors[x].visitor_details.name.first_name === firstName &&
          visitors[x].visitor_details.name.middle_name === middleName &&
          visitors[x].visitor_details.name.last_name === lastName;

        if (!duplicateCompanion)
          return res.status(409).json({
            error: `${visitors[x].visitor_details.email} has already been used by another visitor`,
          });

        const updatedVisitor = await Visitor.findByIdAndUpdate(
          visitorDB._id,
          {
            purpose: visitors[x].purpose,
            expected_time_in: visitors[x].expected_time_in,
            expected_time_out: visitors[x].expected_time_out,
          },
          { new: true }
        );

        if (!updatedVisitor) {
          return res.status(500).json({
            error: `Failed to register ${visitors[x].visitor_details.name.last_name}. Please try again.`,
          });
        }

        createNotification(updatedVisitor, "pending", io);
        io.emit("newVisitor", updatedVisitor);
      } else {
        //? NEW COMPANION
        await Promise.all(
          validateVisitor.map((validation) => validation.run(visitors[x]))
        );

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const newVisitor = await Visitor.create({
          _id: new ObjectId(),
          visitor_details: {
            name: {
              first_name: visitors[x].visitor_details.name.first_name,
              middle_name: visitors[x].visitor_details.name.middle_name
                ? visitors[x].visitor_details.name.middle_name
                : "",
              last_name: visitors[x].visitor_details.name.last_name,
            },
            address: {
              street: visitors[x].visitor_details.address.street,
              house: visitors[x].visitor_details.address.house,
              brgy: visitors[x].visitor_details.address.brgy,
              city: visitors[x].visitor_details.address.city,
              province: visitors[x].visitor_details.address.province,
              country: visitors[x].visitor_details.address.country,
            },
            email: visitors[x].visitor_details.email,
            phone: visitors[x].visitor_details.phone,
          },
          companion_details: [],
          plate_num: visitors[x].plate_num,
          purpose: visitors[x].purpose,
          expected_time_in: visitors[x].expected_time_in,
          expected_time_out: visitors[x].expected_time_out,
          id_picture: {
            front: "",
            back: "",
            selfie: "",
          },
          visitor_type: visitors[x].visitor_type,
          status: visitors[x].status,
        });

        io.emit("newVisitor", newVisitor);

        companions.push(newVisitor._id);

        createNotification(newVisitor, "pending", io);
      }
    }

    let [frontId, backId, selfieId] = [
      visitors[0].id_picture.front,
      visitors[0].id_picture.back,
      visitors[0].id_picture.selfie,
    ];

    if (
      (frontId && frontId.startsWith("data:image/")) ||
      (backId && backId.startsWith("data:image/")) ||
      (selfieId && selfieId.startsWith("data:image/"))
    ) {
      [frontId, backId, selfieId] = await Promise.all([
        uploadFileToGCS(
          Buffer.from(
            frontId.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
          `${Date.now()}_${visitors[0].visitor_details.name.last_name.toUpperCase()}_front.jpg`
        ),
        uploadFileToGCS(
          Buffer.from(backId.replace(/^data:image\/\w+;base64,/, ""), "base64"),
          `${Date.now()}_${visitors[0].visitor_details.name.last_name.toUpperCase()}_back.jpg`
        ),
        uploadFileToGCS(
          Buffer.from(
            selfieId.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
          `${Date.now()}_${visitors[0].visitor_details.name.last_name.toUpperCase()}_selfie.jpg`
        ),
      ]);
    }

    const updatedMainVisitor = await Visitor.findByIdAndUpdate(
      new ObjectId(visitors[0].id),
      {
        id_picture: {
          front: frontId,
          back: backId,
          selfie: selfieId,
        },
        plate_num: visitors[0].plate_num,
        purpose: visitors[0].purpose,
        expected_time_in: visitors[0].expected_time_in,
        expected_time_out: visitors[0].expected_time_out,
        companions: companions,
      },
      { new: true }
    );

    if (!updatedMainVisitor) {
      return res.status(500).json({
        error: `Failed to register ${visitors[0].visitor_details.name.last_name}. Please try again.`,
      });
    }

    io.emit("newVisitor", updatedMainVisitor);

    createNotification(updatedMainVisitor, "pending", io);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update visitor" });
  }
};

exports.newRecurringWalkInVisitor = async (req, res) => {
  const {
    _id,
    visitor_details,
    expected_time_in,
    expected_time_out,
    plate_num,
    purpose,
    status,
    visitor_type,
  } = req.body;

  const user_id = req.user._id;

  try {
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      _id,
      {
        visitor_details: visitor_details,
        purpose: purpose,
        expected_time_in: expected_time_in,
        expected_time_out: expected_time_out,
        plate_num: plate_num,
        status: status,
        visitor_type: visitor_type,
      },
      { new: true }
    );

    if (!updatedVisitor) {
      return res.status(500).json({
        error: `Failed to register ${visitors[0].visitor_details.name.last_name}. Please try again.`,
      });
    }

    const log_type = "update_visitor";
    createSystemLog(user_id, log_type, "success");

    res.status(201).json({ message: "Success", visitor: updatedVisitor });
  } catch (error) {
    console.error(error);
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
