const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//Model
const Visitor = require("../models/visitor");

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

// Get All Visitors
router.get("/all", async (req, res) => {
  try {
    const visitors = await Visitor.find({}, { _id: 0 });
    return res.json({ visitors });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
});

// Filter Visitors v1
router.get("/search", async (req, res) => {
  res.send(req.query);
});

// Filter Visitor v2 (Might will be used for opening Visitor Details)
router.get("/:id", async (req, res) => {
  try {
    const visitors = await Visitor.findOne(
      { visitor_id: req.params.id },
      { _id: 0 }
    ).exec();
    return res.json({ visitors });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
});

// New Visitor
router.post("/new", async (req, res) => {
  try {
    const {
      visitorId,
      firstName,
      lastName,
      email,
      phone,
      plateNum,
      visitorType,
      status,
      street,
      city,
      province,
      houseNo,
      country,
      barangay,
      idType,
    } = req.body;

    const newVisitor = new Visitor({
      visitor_id: visitorId,
      name: { first_name: firstName, last_name: lastName },
      email: email,
      phone: phone,
      plate_num: plateNum,
      visitor_type: visitorType,
      status: status,
      street: street,
      city: city,
      province: province,
      house_no: houseNo,
      country: country,
      barangay: barangay,
      id_picture: { type: idType },
    });
    const createdVisitor = await Visitor.create(newVisitor);

    if (createdVisitor instanceof Visitor) {
      return res
        .status(201)
        .json({ success: "Successfully created a visitor" });
    } else {
      return res.status(400).json({ error: "Failed to Create new visitor" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Visitor
router.get("/update/:id", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const filter = { visitor_id: req.params.id };
    const update = { name: { first_name: firstName, last_name: lastName } };
    const visitorUpdated = await Visitor.findOneAndUpdate(filter, update);

    if (!visitorUpdated) {
      return res.status(404).json({ error: "Visitor not found" });
    } else {
      return res.json({ visitorUpdated });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVisitor = await Visitor.findOneAndDelete({
      visitor_id: req.params.id,
    });

    if (deletedVisitor) {
      return res.status(201).json({ success: `Deleted Visitor` });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
