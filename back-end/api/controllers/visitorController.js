const Visitor = require("../models/visitor");
const { createNewCompanion } = require("./visitorCompController");
const {
  validateData,
  handleValidationErrors,
  validationResult,
} = require("../middleware/visitorValidation");
const { filterData } = require("../middleware/filterVisitorData");
const mongoose = require("mongoose");

//Get list of all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    return res.json({ visitors });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Create a new visitor
exports.createNewVisitor = async (req, res) => {
  //TODO Needs to be updated
  // await Promise.all(validateData.map((validation) => validation.run(req)));
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array()[0].msg });
  // }

  try {
    const visitorDB = await Visitor.findOne({
      "visitor_details.name.first_name":
        req.body.visitor_data.visitor_details.name.first_name,
      "visitor_details.name.middle_name":
        req.body.visitor_data.visitor_details.name.middle_name,
      "visitor_details.name.last_name":
        req.body.visitor_data.visitor_details.name.last_name,
    });
    if (visitorDB) {
      res.status(401).json({ error: "Visitor already exists" });
    } else {
      const newVisitor = await Visitor.create({
        visitor_details: req.body.visitor_data.visitor_details,
        companion_details: req.body.visitor_data.companion_details,
        plate_num: req.body.visitor_data.plate_num,
        purpose: req.body.visitor_data.purpose,
        visitor_type: req.body.visitor_data.visitor_type,
        status: req.body.visitor_data.status,
      });
      res.status(201).json({
        message: "Successfully Pre-registered.",
        newVisitor: filterData(newVisitor),
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "visitor not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a visitor by ID
exports.updateVisitor = async (req, res) => {
  const { _id } = req.body;
  try {
    const visitor = await Visitor.findById(_id);
    if (visitor) {
      //need to add validation for data here
      visitor.visitor_details.name.first_name =
        req.body.first_name || visitor.visitor_details.name.first_name;
      visitor.visitor_details.name.middle_name =
        req.body.middle_name || visitor.visitor_details.name.middle_name;
      visitor.visitor_details.name.last_name =
        req.body.last_name || visitor.visitor_details.name.last_name;
      visitor.visitor_details.address.street =
        req.body.street || visitor.visitor_details.address.street;
      visitor.visitor_details.address.house =
        req.body.house || visitor.visitor_details.address.house;
      visitor.visitor_details.address.barangay =
        req.body.barangay || visitor.visitor_details.address.barangay;
      visitor.visitor_details.address.city =
        req.body.city || visitor.visitor_details.address.city;
      visitor.visitor_details.address.province =
        req.body.province || visitor.visitor_details.address.province;
      visitor.visitor_details.address.country =
        req.body.country || visitor.visitor_details.address.country;
      visitor.visitor_details.email =
        req.body.email || visitor.visitor_details.email;
      visitor.visitor_details.phone =
        req.body.phone || visitor.visitor_details.phone;
      visitor.visitor_details.time_in =
        req.body.time_in || visitor.visitor_details.time_in;
      visitor.visitor_details.time_out =
        req.body.time_out || visitor.visitor_details.time_out;
      visitor.plate_num = req.body.plate_num || visitor.plate_num;
      visitor.visitor_type = req.body.visitor_type || visitor.visitor_type;
      visitor.status = req.body.status || visitor.status;
      //   visitor.updatedAt = Date.now(); //? Will uncomment soon

      await visitor.save();

      res.json({
        message: "Visitor updated successfully",
        updatedVisitor: visitor,
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

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query
