const Visitor = require("../models/visitor");
const { Storage } = require("@google-cloud/storage");
const {
  validateVisitor,
  validationResult,
} = require("../middleware/dataValidation");
const { generateSingleQRCode, uploadFileToGCS } = require("../utils/helper");
const { Buffer } = require("node:buffer");
const Notification = require('../models/notification');

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
  
    const [frontId, backId, selfieId] = [
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
    ];
  
    const newVisitor = await Visitor.create({
      visitor_details: {
        name: { first_name, middle_name, last_name },
        address: { street, house, brgy, city, province, country },
        email,
        phone,
      },
      companion_details: companion_details || [],
      plate_num: plate_num,
      purpose: purpose,
      expected_time_in,
      expected_time_out,
      id_picture: {
        front: frontId,
        back: backId,
        selfie: selfieId,
      },
      visitor_type: visitor_type,
      status: status,
    });
  
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
  const { _id, status } = req.body;

  try {
    const visitorDB = await Visitor.findById(_id);

    if (!visitorDB) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    visitorDB.status = status;
    await visitorDB.save();

    if (status === "Approved") {
      try {

        let result = generateSingleQRCode(visitorDB._id);

        if (!(await result).success) {
          return res.status(500).json({ Error: (await result).message});
        }

        await Notification.create({
          type: 'Appointment Confirmation',
          recipient: visitorDB.visitor_details._id,
          content: {
            visitor_name: visitorDB.visitor_details.name.first_name,
            host_name: visitorDB.purpose.who[0],
            date: visitorDB.purpose.when,
            time: visitorDB.expected_time_in,
            location: visitorDB.purpose.where[0],
            purpose: visitorDB.purpose.what.join(', ')
          }
        });

        res.status(200).json({ message: `Visitor is now ${status}` });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Failed to send email' });
      }
    }  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update visitor status" });
  }
};