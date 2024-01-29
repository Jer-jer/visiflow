const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Visitor = require("../models/visitor");

const { body, validationResult } = require("express-validator");

// Middleware to validate the request body
const validateVisitor = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Email is required"),
];

//function to not return hashed password in json
function sanitizeData(visitor) {
  return {
    _id: visitor._id,
    first_name: visitor.first_name,
    last_name: visitor.last_name,
    email: visitor.email,
    phone: visitor.phone,
    status: visitor.status,
    createdAt: visitor.createdAt,
    updatedAt: visitor.updatedAt,
  };
}

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query

//Get list of all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({}, "-password");
    return res.json({ visitors });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Get visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const { _id } = req.body;
    const searchedVisitor = await Visitor.findById(_id);

    if (searchedVisitor) {
      return res.status(201).json({ visitor: searchedVisitor });
    } else {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create a new visitor
exports.createNewVisitor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { first_name, last_name, email, phone, status } = req.body;

    //check if the visitor already exists
    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ error: "Visitor already exists" });
    }

    const newVisitor = new Visitor({
      first_name,
      last_name,
      email,
      phone: phone || "000-000-0000",
      status,
    });

    const createdVisitor = await newVisitor.save();
    if (createdVisitor) {
      return res.status(201).json({ visitor: sanitizeData(createdVisitor) });
    } else {
      return res.status(400).json({ error: "Failed to Create new Visitor" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a visitor by ID
exports.updateVisitor = async (req, res) => {
  try {
    const {
      _id,
      visitor_id,
      first_name,
      middle_name,
      last_name,
      phone,
      email,
      house_no,
      street,
      brgy,
      city,
      province,
      country,
      time_in,
      time_out,
      plate_num,
      status,
      visitor_type,
    } = req.body;

    const updateFields = {
      visitor_details: {
        visitor_id: visitor_id,
        name: {
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
        },
        phone: phone,
        email: email,
        house_no: house_no,
        street: street,
        brgy: brgy,
        city: city,
        province: province,
        country: country,
        time_in: time_in,
        time_out: time_out,
      },
      plate_num: plate_num,
      status: status,
      visitor_type: visitor_type,
    };

    const visitorUpdated = await Visitor.findByIdAndUpdate(_id, updateFields);

    if (visitorUpdated) {
      return res.status(201).json({
        success: "Visitor has been updated",
        user: sanitizeData(updateFields),
      });
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedVisitor = await Visitor.findByIdAndDelete(_id);
    if (deletedVisitor) {
      return res.status(201).json({ message: "Visitor deleted sucessfully" });
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
